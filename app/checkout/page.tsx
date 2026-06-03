"use client";

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { startRouteLoader } from "@/components/route-loader";
import { stripePublishableKey } from "@/lib/env";
import { cartSubtotal, useCartStore } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/format";
import { gsap, SplitText } from "@/lib/gsap";

const checkoutSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  address: z.string().min(5, "Enter your street address"),
  city: z.string().min(2, "Enter your city"),
  postcode: z.string().min(3, "Enter your postcode"),
  country: z.string().min(2, "Enter your country"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

type IntentResponse = {
  clientSecret: string;
  paymentIntentId: string;
  total: number;
  subtotal: number;
  shipping: number;
  error?: string;
};

const shipping = 6;

export default function CheckoutPage() {
  const pageRef = useRef<HTMLElement>(null);
  const items = useCartStore((state) => state.items);
  const subtotal = cartSubtotal(items);
  const total = items.length ? subtotal + shipping : 0;
  const [intent, setIntent] = useState<IntentResponse | null>(null);
  const [intentError, setIntentError] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(false);
  const stripePromise = useMemo(
    () => (stripePublishableKey ? loadStripe(stripePublishableKey) : null),
    [],
  );

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const heading = page.querySelector(".checkout-heading");
      if (heading) {
        const split = new SplitText(heading, { type: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power4.out",
        });
      }
      gsap.from(".checkout-reveal", {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
      });
    }, page);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const createIntent = async () => {
      if (!items.length) {
        setIntent(null);
        return;
      }

      setLoadingIntent(true);
      setIntentError("");

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: items.map((item) => ({
              slug: item.slug,
              quantity: item.quantity,
            })),
          }),
        });
        const data = (await response.json()) as IntentResponse;

        if (!response.ok) {
          throw new Error(data.error || "Unable to prepare payment.");
        }

        if (!cancelled) {
          setIntent(data);
        }
      } catch (error) {
        if (!cancelled) {
          setIntent(null);
          setIntentError(error instanceof Error ? error.message : "Unable to prepare payment.");
        }
      } finally {
        if (!cancelled) {
          setLoadingIntent(false);
        }
      }
    };

    createIntent();

    return () => {
      cancelled = true;
    };
  }, [items]);

  return (
    <PageReveal>
      <main ref={pageRef} className="section-pad min-h-screen bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <div className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Secure checkout
          </p>
          <h1 className="checkout-heading font-display text-[clamp(4rem,10vw,9rem)] leading-[0.85]">
            Finish your order.
          </h1>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_24rem]">
            {stripePromise && intent?.clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: intent.clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#c17f3a",
                      colorBackground: "#24140d",
                      colorText: "#f5e6d0",
                      colorDanger: "#ffb18f",
                      borderRadius: "0px",
                      fontFamily: "DM Sans, sans-serif",
                    },
                  },
                }}
              >
                <CheckoutFormPanel paymentIntentId={intent.paymentIntentId} />
              </Elements>
            ) : (
              <div className="checkout-reveal lb-card grid min-h-[28rem] place-items-center p-6 text-center">
                <div>
                  <RefreshCw className="mx-auto mb-5 text-[#c17f3a]" size={28} />
                  <h2 className="font-display text-4xl">
                    {items.length ? "Preparing payment." : "Your cart is empty."}
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#f5e6d0]/68">
                    {intentError ||
                      (loadingIntent
                        ? "A secure Stripe payment is being brewed for this order."
                        : "Add coffee to your cart before checkout.")}
                  </p>
                  {!items.length ? (
                    <LoadingLink href="/shop" className="btn-primary mt-8">
                      Back to Shop
                    </LoadingLink>
                  ) : null}
                </div>
              </div>
            )}

            <aside className="checkout-reveal lb-card h-fit p-6 lg:sticky lg:top-32">
              <h2 className="font-display text-4xl">Order summary</h2>
              <div className="mt-6 grid gap-4">
                {items.length ? (
                  items.map((item) => (
                    <div key={item.slug} className="flex justify-between gap-4 text-sm text-[#f5e6d0]/72">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-[#f5e6d0]/68">
                    Your cart is empty.
                  </p>
                )}
                <div className="h-px bg-[#f5e6d0]/14" />
                <div className="flex justify-between text-sm text-[#f5e6d0]/72">
                  <span>Subtotal</span>
                  <span>{formatCurrency(intent?.subtotal ?? subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#f5e6d0]/72">
                  <span>Shipping</span>
                  <span>{formatCurrency(intent?.shipping ?? (items.length ? shipping : 0))}</span>
                </div>
                <div className="flex justify-between text-xl font-black">
                  <span>Total</span>
                  <span>{formatCurrency(intent?.total ?? total)}</span>
                </div>
              </div>
              <LoadingLink href="/shop" className="btn-secondary mt-8 w-full">
                Back to Shop
              </LoadingLink>
            </aside>
          </div>
        </div>
      </main>
    </PageReveal>
  );
}

function CheckoutFormPanel({ paymentIntentId }: { paymentIntentId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (customer: CheckoutForm) => {
    if (!stripe || !elements) return;

    setSubmitting(true);
    setPaymentError("");
    gsap.to(submitRef.current, {
      scale: 0.98,
      duration: 0.14,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });

    try {
      const submitResult = await elements.submit();
      if (submitResult.error) {
        throw new Error(submitResult.error.message || "Payment details are incomplete.");
      }

      const paymentResult = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: customer.name,
              email: customer.email,
              address: {
                line1: customer.address,
                city: customer.city,
                postal_code: customer.postcode,
                country: customer.country,
              },
            },
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message || "Payment failed.");
      }

      if (paymentResult.paymentIntent?.status !== "succeeded") {
        throw new Error("Payment has not completed yet.");
      }

      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            slug: item.slug,
            quantity: item.quantity,
          })),
          customer,
          stripePaymentId: paymentResult.paymentIntent.id || paymentIntentId,
        }),
      });
      const orderData = (await orderResponse.json()) as { orderId?: string; error?: string };

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Payment succeeded, but the order could not be saved.");
      }

      clearCart();
      startRouteLoader();
      router.push(`/order-success?order=${orderData.orderId}`);
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Unable to place order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="checkout-reveal lb-card grid gap-5 p-5 sm:grid-cols-2">
      {[
        ["name", "Name"],
        ["email", "Email"],
        ["address", "Address"],
        ["city", "City"],
        ["postcode", "Postcode"],
        ["country", "Country"],
      ].map(([name, label]) => (
        <label key={name} className={name === "address" ? "sm:col-span-2" : ""}>
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#c17f3a]">
            {label}
          </span>
          <input className="field" {...register(name as keyof CheckoutForm)} />
          {errors[name as keyof CheckoutForm] ? (
            <span className="mt-2 block text-sm text-[#ffb18f]">
              {errors[name as keyof CheckoutForm]?.message}
            </span>
          ) : null}
        </label>
      ))}

      <div className="sm:col-span-2 border border-[#f5e6d0]/16 p-5">
        <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#c17f3a]">
          <CreditCard size={16} />
          Stripe card
        </div>
        <PaymentElement />
      </div>

      {paymentError ? (
        <p className="sm:col-span-2 border border-[#ffb18f]/35 bg-[#ffb18f]/10 p-4 text-sm leading-6 text-[#ffd8c8]">
          {paymentError}
        </p>
      ) : null}

      <button ref={submitRef} className="btn-primary sm:col-span-2 gap-2" disabled={submitting || !stripe || !elements || items.length === 0} type="submit">
        {submitting ? <span className="button-spinner" /> : <Lock size={16} />}
        {submitting ? "Placing Order" : "Place Order"}
      </button>
    </form>
  );
}

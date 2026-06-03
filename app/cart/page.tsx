"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { cartSubtotal, useCartStore } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/format";
import { gsap, SplitText } from "@/lib/gsap";

const shipping = 6;

export default function CartPage() {
  const pageRef = useRef<HTMLElement>(null);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = cartSubtotal(items);
  const total = items.length ? subtotal + shipping : 0;

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const heading = page.querySelector(".cart-heading");
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
      gsap.from(".cart-row", {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
      });
      gsap.from(".empty-cup", {
        rotate: -8,
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.8)",
      });
    }, page);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <PageReveal>
      <main ref={pageRef} className="section-pad min-h-screen bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <div className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Your coffee bag
          </p>
          <h1 className="cart-heading font-display text-[clamp(4rem,10vw,9rem)] leading-[0.85]">
            Cart
          </h1>

          {items.length === 0 ? (
            <div className="mt-14 grid min-h-[45vh] place-items-center border border-[#f5e6d0]/12 text-center">
              <div>
                <div className="empty-cup mx-auto mb-8 grid h-24 w-24 place-items-center rounded-full border border-[#f5e6d0]/18 text-5xl">
                  LB
                </div>
                <h2 className="font-display text-4xl">Your cart is waiting for coffee.</h2>
                <LoadingLink href="/shop" className="btn-primary mt-8">
                  Start Shopping
                </LoadingLink>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_24rem]">
              <div className="grid gap-4">
                {items.map((item) => (
                  <article key={item.slug} className="cart-row lb-card grid gap-5 p-4 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
                    <div className="relative aspect-square overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="8rem" />
                    </div>
                    <div>
                      <h2 className="font-display text-3xl">{item.name}</h2>
                      <p className="mt-2 text-[#f5e6d0]/68">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex min-h-11 items-center border border-[#f5e6d0]/18">
                        <button className="grid h-11 w-11 place-items-center" onClick={() => updateQuantity(item.slug, item.quantity - 1)} type="button">
                          <Minus size={15} />
                        </button>
                        <span className="grid h-11 min-w-11 place-items-center font-black">{item.quantity}</span>
                        <button className="grid h-11 w-11 place-items-center" onClick={() => updateQuantity(item.slug, item.quantity + 1)} type="button">
                          <Plus size={15} />
                        </button>
                      </div>
                      <button className="icon-button" onClick={() => removeItem(item.slug)} type="button" aria-label={`Remove ${item.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="lb-card h-fit p-6 lg:sticky lg:top-32">
                <h2 className="font-display text-4xl">Order summary</h2>
                <div className="mt-8 grid gap-4 text-sm text-[#f5e6d0]/72">
                  <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(shipping)}</span></div>
                  <div className="h-px bg-[#f5e6d0]/14" />
                  <div className="flex justify-between text-xl font-black text-[#f5e6d0]"><span>Total</span><span>{formatCurrency(total)}</span></div>
                </div>
                <LoadingLink href="/checkout" className="btn-primary mt-8 w-full">
                  Proceed to Checkout
                </LoadingLink>
              </aside>
            </div>
          )}
        </div>
      </main>
    </PageReveal>
  );
}

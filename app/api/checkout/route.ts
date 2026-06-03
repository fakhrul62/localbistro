import { NextResponse } from "next/server";
import { calculateOrderTotal, type CheckoutCartItem } from "@/lib/checkout";
import { getStripe } from "@/lib/stripe-server";

type CheckoutRequest = {
  items?: CheckoutCartItem[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;
    const items = body.items || [];

    if (!items.length) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const { orderItems, amountInCents, total, subtotal, shipping } = calculateOrderTotal(items);
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        source: "local-bistro",
        item_count: String(orderItems.length),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      orderItems,
      subtotal,
      shipping,
      total,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

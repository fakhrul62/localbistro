import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateOrderTotal } from "@/lib/checkout";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const orderSchema = z.object({
  items: z.array(
    z.object({
      slug: z.string(),
      quantity: z.number(),
    }),
  ),
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    address: z.string().min(5),
    city: z.string().min(2),
    postcode: z.string().min(3),
    country: z.string().min(2),
  }),
  stripePaymentId: z.string().min(3),
});

export async function POST(request: Request) {
  try {
    const body = orderSchema.parse(await request.json());
    const { orderItems, total } = calculateOrderTotal(body.items);
    const shippingAddress = {
      address: body.customer.address,
      city: body.customer.city,
      postcode: body.customer.postcode,
      country: body.customer.country,
    };

    const { data, error } = await getSupabaseAdmin()
      .from("orders")
      .insert({
        items: orderItems,
        total,
        customer_name: body.customer.name,
        customer_email: body.customer.email,
        shipping_address: shippingAddress,
        stripe_payment_id: body.stripePaymentId,
        status: "paid",
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      orderId: data.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save order.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

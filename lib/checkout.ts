import { products } from "@/data/products";

export type CheckoutCartItem = {
  slug: string;
  quantity: number;
};

export type CheckoutCustomer = {
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
};

export const shippingDollars = 6;

export function normalizeCheckoutItems(items: CheckoutCartItem[]) {
  return items
    .map((item) => ({
      slug: item.slug,
      quantity: Math.max(1, Math.min(99, Math.floor(Number(item.quantity) || 1))),
    }))
    .filter((item) => item.slug);
}

export function buildOrderItems(items: CheckoutCartItem[]) {
  return normalizeCheckoutItems(items).map((item) => {
    const product = products.find((candidate) => candidate.slug === item.slug);

    if (!product) {
      throw new Error(`Unknown product: ${item.slug}`);
    }

    return {
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    };
  });
}

export function calculateOrderTotal(items: CheckoutCartItem[]) {
  const orderItems = buildOrderItems(items);
  const subtotal = orderItems.reduce((total, item) => total + item.lineTotal, 0);
  const shipping = orderItems.length ? shippingDollars : 0;
  const total = subtotal + shipping;

  return {
    orderItems,
    subtotal,
    shipping,
    total,
    amountInCents: Math.round(total * 100),
  };
}

import Stripe from "stripe";
import { requiredServerEnv } from "@/lib/env";

export function getStripe() {
  if (!requiredServerEnv.stripeSecretKey) {
    throw new Error("Stripe secret key is not configured.");
  }

  return new Stripe(requiredServerEnv.stripeSecretKey, {
    apiVersion: "2026-05-27.dahlia",
  });
}

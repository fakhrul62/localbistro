"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { gsap } from "@/lib/gsap";

export default function OrderSuccessPage() {
  const pageRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || `LB-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`;

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".check-path", { strokeDasharray: 220, strokeDashoffset: 220 }, { strokeDashoffset: 0, duration: 1.1, ease: "power3.out" });
      gsap.from(".success-copy", { y: 26, opacity: 0, stagger: 0.1, duration: 0.75, delay: 0.35, ease: "power3.out" });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <PageReveal>
      <main ref={pageRef} className="section-pad grid min-h-screen place-items-center bg-[#1a0f0a] py-36 text-center">
        <div className="max-w-3xl">
          <svg className="mx-auto mb-8 h-28 w-28" viewBox="0 0 120 120" fill="none" aria-hidden>
            <circle cx="60" cy="60" r="54" stroke="#c17f3a" strokeWidth="3" />
            <path className="check-path" d="M34 62L52 80L88 40" stroke="#f5e6d0" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="success-copy mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Order confirmed
          </p>
          <h1 className="success-copy font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.88]">
            Your coffee is on its way.
          </h1>
          <p className="success-copy mx-auto mt-6 max-w-xl text-lg leading-8 text-[#f5e6d0]/72">
            Order {orderNumber} has been received.
          </p>
          <LoadingLink href="/shop" className="success-copy btn-primary mt-8">
            Continue Shopping
          </LoadingLink>
        </div>
      </main>
    </PageReveal>
  );
}

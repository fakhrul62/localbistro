"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useRef } from "react";
import { LoadingLink } from "@/components/loading-link";
import { Logo } from "@/components/logo";
import { useCartStore } from "@/lib/cart-store";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const count = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      gsap.to(nav, {
        backgroundColor: "rgba(26, 15, 10, 0.88)",
        backdropFilter: "blur(18px)",
        borderColor: "rgba(245, 230, 208, 0.14)",
        paddingTop: "0.7rem",
        paddingBottom: "0.7rem",
        scrollTrigger: {
          trigger: document.body,
          start: "top -60",
          end: "top -280",
          scrub: true,
        },
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!badgeRef.current) return;
    gsap.fromTo(
      badgeRef.current,
      { scale: 0.55 },
      { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.45)" },
    );
  }, [count]);

  useEffect(() => {
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.refresh());
  }, []);

  return (
    <nav
      ref={navRef}
      className="section-pad fixed left-0 right-0 top-0 z-50 border-b border-transparent py-5"
    >
      <div className="mx-auto flex max-w-[94vw] items-center justify-between gap-4">
        <LoadingLink href="/" className="text-[#f5e6d0]">
          <Logo />
        </LoadingLink>
        <div className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.16em] text-[#f5e6d0]/78 md:flex">
          <LoadingLink href="/">Home</LoadingLink>
          <LoadingLink href="/visit">Visit</LoadingLink>
          <LoadingLink href="/menu">Menu</LoadingLink>
          <LoadingLink href="/order-ahead">Order</LoadingLink>
          <LoadingLink href="/shop">Shop</LoadingLink>
          <LoadingLink href="/events">Events</LoadingLink>
        </div>
        <LoadingLink href="/cart" className="icon-button relative" aria-label="Open cart" data-cart-target>
          <ShoppingBag size={18} />
          <span
            ref={badgeRef}
            className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center bg-[#c17f3a] px-1 text-[0.65rem] font-black text-[#1a0f0a]"
          >
            {count}
          </span>
        </LoadingLink>
      </div>
    </nav>
  );
}

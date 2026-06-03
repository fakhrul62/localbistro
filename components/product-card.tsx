"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { LoadingLink } from "@/components/loading-link";
import { animateCoffeeToCart } from "@/lib/cart-animation";
import { useCartStore } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/format";
import { gsap } from "@/lib/gsap";

export function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const lift = () =>
      gsap.to(card, {
        y: -10,
        scale: 1.015,
        boxShadow: "0 28px 70px rgba(0,0,0,0.34)",
        duration: 0.45,
        ease: "power3.out",
      });
    const settle = () =>
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        duration: 0.45,
        ease: "power3.out",
      });

    card.addEventListener("mouseenter", lift);
    card.addEventListener("mouseleave", settle);

    return () => {
      card.removeEventListener("mouseenter", lift);
      card.removeEventListener("mouseleave", settle);
    };
  }, []);

  const handleAdd = () => {
    if (adding) return;
    setAdding(true);
    addItem(product);
    animateCoffeeToCart(buttonRef.current);
    gsap.to(buttonRef.current, {
      scale: 0.98,
      duration: 0.12,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });
    window.setTimeout(() => setAdding(false), 850);
  };

  return (
    <article ref={cardRef} className="product-card lb-card overflow-hidden">
      <LoadingLink href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[1.08] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-image object-cover"
            sizes="(max-width: 768px) 94vw, 30vw"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 bg-[#f5e6d0] px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#1a0f0a]">
              {product.badge}
            </span>
          ) : null}
        </div>
      </LoadingLink>
      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c17f3a]">
              {product.category}
            </p>
            <LoadingLink href={`/shop/${product.slug}`}>
              <h3 className="font-display mt-2 text-2xl leading-none">{product.name}</h3>
            </LoadingLink>
          </div>
          <p className="text-lg font-black">{formatCurrency(product.price)}</p>
        </div>
        <p className="min-h-[3rem] text-sm leading-6 text-[#f5e6d0]/72">{product.description}</p>
        <button
          ref={buttonRef}
          className="btn-primary w-full gap-2"
          onClick={handleAdd}
          disabled={adding}
          type="button"
        >
          {adding ? <span className="button-spinner" /> : <ShoppingBag size={16} />}
          {adding ? "Adding" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

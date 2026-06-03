"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { animateCoffeeToCart } from "@/lib/cart-animation";
import { useCartStore } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/format";
import { gsap, SplitText } from "@/lib/gsap";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = products.find((item) => item.slug === params.slug);
  const pageRef = useRef<HTMLElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const related = useMemo(
    () =>
      product
        ? products
            .filter((item) => item.category === product.category && item.slug !== product.slug)
            .slice(0, 3)
        : [],
    [product],
  );

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".detail-image", { scale: 1.08 }, { scale: 1, duration: 1.1, ease: "power3.out" });
      const heading = page.querySelector(".detail-heading");
      if (heading) {
        const split = new SplitText(heading, { type: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.85,
          ease: "power4.out",
        });
      }
      gsap.from(".detail-reveal", {
        y: 22,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });
    }, page);

    return () => ctx.revert();
  }, [product?.slug]);

  if (!product) {
    notFound();
  }

  const handleAdd = () => {
    if (adding) return;
    setAdding(true);
    addItem(product, quantity);
    animateCoffeeToCart(addButtonRef.current);
    gsap.to(addButtonRef.current, {
      scale: 0.98,
      duration: 0.12,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });
    window.setTimeout(() => setAdding(false), 850);
  };

  return (
    <PageReveal>
      <main ref={pageRef} className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <div className="container-fluid grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div className="relative aspect-[0.95] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="detail-image object-cover"
              sizes="(max-width: 1024px) 92vw, 50vw"
            />
          </div>
          <div className="lg:sticky lg:top-32">
            <p className="detail-reveal mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
              {product.category}
            </p>
            <h1 className="detail-heading font-display text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.86]">
              {product.name}
            </h1>
            <p className="detail-reveal mt-6 text-3xl font-black">{formatCurrency(product.price)}</p>
            <p className="detail-reveal mt-6 max-w-xl text-lg leading-8 text-[#f5e6d0]/72">
              {product.fullDescription}
            </p>
            {product.notes ? (
              <div className="detail-reveal mt-6 flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="border border-[#f5e6d0]/18 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f5e6d0]/72">
                    {note}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="detail-reveal mt-8 flex flex-wrap gap-3">
              <div className="flex min-h-12 items-center border border-[#f5e6d0]/18">
                <button className="grid h-12 w-12 place-items-center" onClick={() => setQuantity(Math.max(1, quantity - 1))} type="button">
                  <Minus size={16} />
                </button>
                <span className="grid h-12 min-w-12 place-items-center font-black">{quantity}</span>
                <button className="grid h-12 w-12 place-items-center" onClick={() => setQuantity(quantity + 1)} type="button">
                  <Plus size={16} />
                </button>
              </div>
              <button
                ref={addButtonRef}
                className="btn-primary gap-2"
                onClick={handleAdd}
                disabled={adding}
                type="button"
              >
                {adding ? <span className="button-spinner" /> : <ShoppingBag size={16} />}
                {adding ? "Adding" : "Add to Cart"}
              </button>
            </div>
            <LoadingLink href="/shop" className="detail-reveal mt-8 inline-block text-sm font-black uppercase tracking-[0.18em] text-[#c17f3a]">
              Back to shop
            </LoadingLink>
          </div>
        </div>

        {related.length ? (
          <section className="container-fluid mt-[clamp(5rem,9vw,8rem)]">
            <h2 className="font-display mb-8 text-[clamp(2.5rem,5vw,5rem)] leading-none">
              Related picks
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </PageReveal>
  );
}

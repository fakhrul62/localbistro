"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products, type ProductCategory } from "@/data/products";
import { PageReveal } from "@/components/page-reveal";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

const filters: Array<ProductCategory | "All"> = [
  "All",
  "Coffee Beans",
  "Ground Coffee",
  "Equipment",
  "Merchandise",
];

export default function ShopPage() {
  const [filter, setFilter] = useState<ProductCategory | "All">("All");
  const pageRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const visibleProducts = useMemo(
    () => (filter === "All" ? products : products.filter((product) => product.category === filter)),
    [filter],
  );

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const heading = page.querySelector(".shop-heading");
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

      gsap.to(".filter-bar", {
        backgroundColor: "rgba(26, 15, 10, 0.92)",
        scrollTrigger: {
          trigger: ".filter-bar",
          start: "top 90",
          end: "top 10",
          scrub: true,
        },
      });
    }, page);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.65, ease: "power3.out" },
      );
      ScrollTrigger.refresh();
    }, gridRef);
    return () => ctx.revert();
  }, [filter]);

  const switchFilter = (nextFilter: ProductCategory | "All") => {
    if (!gridRef.current || nextFilter === filter) return;
    gsap.to(gridRef.current.querySelectorAll(".product-card"), {
      y: 18,
      opacity: 0,
      stagger: 0.04,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setFilter(nextFilter),
    });
  };

  return (
    <PageReveal>
      <main ref={pageRef} className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <div className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Online coffee shelf
          </p>
          <h1 className="shop-heading font-display max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[0.85]">
            Bring the bistro home.
          </h1>

          <div className="filter-bar sticky top-24 z-20 my-10 flex gap-2 overflow-x-auto border border-[#f5e6d0]/12 bg-[#1a0f0a]/70 p-2">
            {filters.map((item) => (
              <button
                key={item}
                className={`min-h-11 shrink-0 px-4 text-xs font-black uppercase tracking-[0.18em] ${
                  filter === item
                    ? "bg-[#c17f3a] text-[#1a0f0a]"
                    : "text-[#f5e6d0]/70"
                }`}
                onClick={() => switchFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </main>
    </PageReveal>
  );
}

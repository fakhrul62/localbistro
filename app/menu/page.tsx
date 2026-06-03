"use client";

import { Coffee, CupSoda, Leaf, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { PageReveal } from "@/components/page-reveal";
import { cafeMenuSections } from "@/data/cafe-menu";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

const menuHighlights = [
  { icon: Coffee, label: "Pulled fresh", value: "espresso" },
  { icon: CupSoda, label: "Served chilled", value: "cold cups" },
  { icon: Leaf, label: "Rotating beans", value: "single origin" },
  { icon: Sparkles, label: "Made seasonal", value: "comfort lattes" },
];

export default function MenuPage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const hero = page.querySelector(".menu-hero-title");
      if (hero) {
        const split = new SplitText(hero, {
          type: "lines",
          linesClass: "split-line",
        });
        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.85,
          ease: "power4.out",
        });
      }

      gsap.from(".menu-intro-item", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });

      ScrollTrigger.batch(".menu-section-card", {
        start: "top 84%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.09, duration: 0.75, ease: "power3.out" },
          ),
      });

      ScrollTrigger.batch(".menu-row", {
        start: "top 92%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, duration: 0.45, ease: "power2.out" },
          ),
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <PageReveal>
      <main ref={pageRef} className="section-pad bg-[#1a0f0a] pb-[clamp(4.5rem,8vw,7rem)] pt-32">
        <section className="container-fluid">
          <div className="cream-panel grid gap-8 overflow-hidden lg:grid-cols-[1fr_0.72fr]">
            <div className="p-[clamp(1.5rem,4vw,4rem)]">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
                Local Bistro cafe menu
              </p>
              <h1 className="menu-hero-title font-display max-w-4xl text-[clamp(3.7rem,9vw,9rem)] leading-[0.84]">
                Coffee for the table, not the cart.
              </h1>
              <p className="menu-intro-item mt-6 max-w-2xl text-[clamp(1rem,1.35vw,1.2rem)] leading-8 text-[#1a0f0a]/70">
                This is the in-cafe menu for the physical Local Bistro counter. Prices are for dine-in and takeaway drinks, with regular and large sizes where available.
              </p>
            </div>
            <div className="grid border-t border-[#1a0f0a]/10 lg:border-l lg:border-t-0">
              {menuHighlights.map((item) => (
                <div key={item.label} className="menu-intro-item flex items-center justify-between gap-5 border-b border-[#1a0f0a]/10 px-6 py-5 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center border border-[#1a0f0a]/14 text-[#c17f3a]">
                      <item.icon size={19} />
                    </span>
                    <span className="text-sm font-black uppercase tracking-[0.18em] text-[#1a0f0a]/54">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-display text-2xl text-[#1a0f0a]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border border-[#f5e6d0]/12 bg-[#24140d] px-5 py-4 text-[#f5e6d0]/72 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6">
              Menu items are prepared at the cafe counter and are not sold online.
            </p>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c17f3a]">
              Open daily 7am-8pm
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {cafeMenuSections.map((section) => (
              <section key={section.title} className="menu-section-card lb-card overflow-hidden">
                <div className="flex flex-col gap-4 border-b border-[#f5e6d0]/12 bg-[#120b08] p-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#c17f3a]">
                      {section.note}
                    </p>
                    <h2 className="font-display text-[clamp(2.35rem,4vw,4.25rem)] leading-[0.9]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="grid min-w-[8.5rem] grid-cols-2 gap-2 text-center text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#f5e6d0]/54">
                    <span>Regular</span>
                    <span>Large</span>
                  </div>
                </div>

                <div className="grid">
                  {section.items.map((item) => (
                    <article key={item.name} className="menu-row grid gap-4 border-b border-[#f5e6d0]/10 p-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-[clamp(1.45rem,2.3vw,2rem)] leading-none">
                            {item.name}
                          </h3>
                          {item.badge ? (
                            <span className="bg-[#89916e]/20 px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-[0.14em] text-[#c9d5a8]">
                              {item.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-[#f5e6d0]/62">
                          {item.description}
                        </p>
                      </div>
                      <div className="grid min-w-[8.5rem] grid-cols-2 gap-2 text-center">
                        <span className="bg-[#f5e6d0] px-3 py-2 text-sm font-black text-[#1a0f0a]">
                          {item.regular}
                        </span>
                        <span className="bg-[#c17f3a] px-3 py-2 text-sm font-black text-[#1a0f0a]">
                          {item.large || "-"}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <p className="font-display max-w-3xl text-[clamp(2.3rem,5vw,5rem)] leading-[0.92]">
              Ask your barista about today&apos;s rotating bean.
            </p>
            <div className="border border-[#f5e6d0]/14 px-5 py-4 text-sm leading-6 text-[#f5e6d0]/68">
              Freshly pulled, quietly served, made for a real table.
            </div>
          </div>
        </section>
      </main>
    </PageReveal>
  );
}

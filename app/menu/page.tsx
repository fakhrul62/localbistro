"use client";

import { Coffee, CupSoda, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { PageReveal } from "@/components/page-reveal";
import { cafeMenuSections } from "@/data/cafe-menu";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export default function MenuPage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const hero = page.querySelector(".chalk-hero-title");
      if (hero) {
        const split = new SplitText(hero, {
          type: "words,chars",
          wordsClass: "split-word",
          charsClass: "split-char",
        });
        gsap.from(split.chars, {
          y: 22,
          opacity: 0,
          rotate: "random(-8, 8)",
          stagger: 0.012,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      gsap.from(".chalk-mark", {
        scaleX: 0,
        transformOrigin: "left center",
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
      });

      ScrollTrigger.batch(".menu-board-section", {
        start: "top 82%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 38, opacity: 0, rotate: -0.5 },
            { y: 0, opacity: 1, rotate: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" },
          ),
      });

      ScrollTrigger.batch(".chalk-row", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { x: -16, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.035, duration: 0.45, ease: "power2.out" },
          ),
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <PageReveal>
      <main ref={pageRef} className="section-pad bg-[#100906] pb-[clamp(5rem,9vw,8rem)] pt-32">
        <section className="container-fluid">
          <div className="chalkboard relative overflow-hidden border-[clamp(0.75rem,2vw,1.25rem)] border-[#5a321d] p-[clamp(1rem,4vw,3rem)]">
            <div className="relative">
              <div className="mb-10 flex flex-col gap-5 border-b border-dashed border-[#f5e6d0]/26 pb-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="chalk-caramel mb-3 text-xs font-black uppercase tracking-[0.24em]">
                    Local Bistro cafe board
                  </p>
                  <h1 className="chalk-hero-title font-chalk chalk-text text-[clamp(4.2rem,12vw,11rem)] leading-[0.78]">
                    Today&apos;s Menu
                  </h1>
                </div>
                <div className="grid gap-2 text-left md:text-right">
                  <p className="font-chalk chalk-sage text-[clamp(1.8rem,3vw,2.8rem)] leading-none">
                    Regular / Large
                  </p>
                  <p className="chalk-text text-sm uppercase tracking-[0.18em] opacity-70">
                    dine in only menu
                  </p>
                </div>
              </div>

              <div className="mb-10 grid gap-4 md:grid-cols-3">
                {[
                  { icon: Coffee, label: "small batch espresso" },
                  { icon: CupSoda, label: "slow cold brews" },
                  { icon: Sparkles, label: "seasonal cups" },
                ].map((item) => (
                  <div key={item.label} className="chalk-mark flex items-center gap-3 border-y border-[#f5e6d0]/18 py-3">
                    <item.icon className="text-[#c17f3a]" size={22} />
                    <span className="font-chalk chalk-text text-3xl leading-none">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {cafeMenuSections.map((section) => (
                  <section key={section.title} className="menu-board-section border border-dashed border-[#f5e6d0]/22 p-[clamp(1rem,2.4vw,1.5rem)]">
                    <div className="mb-5 flex flex-col gap-1 border-b border-[#f5e6d0]/18 pb-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h2 className="font-chalk chalk-caramel text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.8]">
                          {section.title}
                        </h2>
                        <p className="chalk-text mt-2 text-xs uppercase tracking-[0.16em] opacity-58">
                          {section.note}
                        </p>
                      </div>
                      <p className="chalk-sage text-xs font-black uppercase tracking-[0.18em]">
                        reg / lg
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {section.items.map((item) => (
                        <article key={item.name} className="chalk-row grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
                          <div>
                            <div className="flex flex-wrap items-baseline gap-3">
                              <h3 className="font-chalk chalk-text text-[clamp(2rem,4vw,3rem)] leading-[0.82]">
                                {item.name}
                              </h3>
                              {item.badge ? (
                                <span className="chalk-sage text-xs font-black uppercase tracking-[0.18em]">
                                  {item.badge}
                                </span>
                              ) : null}
                            </div>
                            <p className="chalk-text mt-1 text-sm leading-6 opacity-65">
                              {item.description}
                            </p>
                          </div>
                          <div className="font-chalk chalk-text flex min-w-[7rem] items-baseline justify-between gap-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-none sm:justify-end">
                            <span>{item.regular}</span>
                            {item.large ? <span className="chalk-caramel">{item.large}</span> : <span className="opacity-35">--</span>}
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-dashed border-[#f5e6d0]/24 pt-7 md:flex-row md:items-center md:justify-between">
                <p className="font-chalk chalk-text text-[clamp(2rem,4vw,3.5rem)] leading-none">
                  Ask your barista about today&apos;s rotating bean.
                </p>
                <p className="chalk-caramel text-xs font-black uppercase tracking-[0.2em]">
                  Open daily 7am-8pm
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageReveal>
  );
}

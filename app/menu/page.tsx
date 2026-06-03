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
      <main ref={pageRef} className="section-pad bg-[#100906] pb-[clamp(4rem,7vw,6rem)] pt-28">
        <section className="container-fluid">
          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="chalk-caramel mb-3 text-xs font-black uppercase tracking-[0.24em]">
                Local Bistro cafe board
              </p>
              <h1 className="chalk-hero-title font-chalk chalk-text text-[clamp(3.4rem,9vw,7.4rem)] leading-[0.8]">
                Today&apos;s Menu
              </h1>
            </div>
            <div className="chalkboard relative overflow-hidden border-[0.65rem] border-[#5a321d] px-5 py-4 lg:min-w-[22rem]">
              <div className="relative grid gap-1">
                <p className="font-chalk chalk-sage text-[clamp(1.6rem,2.6vw,2.25rem)] leading-none">
                  Regular / Large
                </p>
                <p className="chalk-text text-xs uppercase tracking-[0.18em] opacity-70">
                  dine in only menu
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-3">
            {[
              { icon: Coffee, label: "small batch espresso" },
              { icon: CupSoda, label: "slow cold brews" },
              { icon: Sparkles, label: "seasonal cups" },
            ].map((item) => (
              <div key={item.label} className="chalk-mark chalkboard relative overflow-hidden border-[0.5rem] border-[#5a321d] px-4 py-3">
                <div className="relative flex items-center gap-3">
                  <item.icon className="text-[#c17f3a]" size={20} />
                  <span className="font-chalk chalk-text text-[clamp(1.65rem,3vw,2.25rem)] leading-none">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {cafeMenuSections.map((section) => (
              <section key={section.title} className="menu-board-section chalkboard relative overflow-hidden border-[0.65rem] border-[#5a321d] p-[clamp(0.9rem,1.8vw,1.25rem)]">
                <div className="relative">
                  <div className="mb-4 flex flex-col gap-1 border-b border-[#f5e6d0]/18 pb-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h2 className="font-chalk chalk-caramel text-[clamp(2.2rem,4vw,3.15rem)] leading-[0.8]">
                          {section.title}
                        </h2>
                        <p className="chalk-text mt-1 text-[0.65rem] uppercase tracking-[0.14em] opacity-58">
                          {section.note}
                        </p>
                      </div>
                      <p className="chalk-sage text-[0.65rem] font-black uppercase tracking-[0.16em]">
                        reg / lg
                      </p>
                  </div>

                  <div className="grid gap-3">
                    {section.items.map((item) => (
                      <article key={item.name} className="chalk-row grid gap-2 sm:grid-cols-[1fr_auto] sm:items-start">
                        <div>
                          <div className="flex flex-wrap items-baseline gap-2">
                            <h3 className="font-chalk chalk-text text-[clamp(1.65rem,3vw,2.2rem)] leading-[0.84]">
                              {item.name}
                            </h3>
                            {item.badge ? (
                              <span className="chalk-sage text-[0.6rem] font-black uppercase tracking-[0.16em]">
                                {item.badge}
                              </span>
                            ) : null}
                          </div>
                          <p className="chalk-text mt-0.5 text-[0.82rem] leading-5 opacity-65">
                            {item.description}
                          </p>
                        </div>
                        <div className="font-chalk chalk-text flex min-w-[5.8rem] items-baseline justify-between gap-3 text-[clamp(1.45rem,2.6vw,2rem)] leading-none sm:justify-end">
                          <span>{item.regular}</span>
                          {item.large ? <span className="chalk-caramel">{item.large}</span> : <span className="opacity-35">--</span>}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="chalkboard relative mt-5 overflow-hidden border-[0.55rem] border-[#5a321d] px-5 py-4">
            <div className="relative flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="font-chalk chalk-text text-[clamp(1.8rem,3.4vw,2.7rem)] leading-none">
                Ask your barista about today&apos;s rotating bean.
              </p>
              <p className="chalk-caramel text-xs font-black uppercase tracking-[0.2em]">
                Open daily 7am-8pm
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageReveal>
  );
}

"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, Coffee, Leaf, PackageCheck, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { featuredProducts, menuItems } from "@/data/products";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { ProductCard } from "@/components/product-card";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

const vibeImages = [
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=900&q=85",
];

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const heroTitle = page.querySelector(".hero-title");
      if (heroTitle) {
        const split = new SplitText(heroTitle, {
          type: "words,chars",
          wordsClass: "split-word",
          charsClass: "split-char",
        });
        gsap.from(split.chars, {
          yPercent: 105,
          opacity: 0,
          rotateX: -80,
          transformOrigin: "50% 100%",
          stagger: 0.018,
          duration: 1,
          ease: "power4.out",
        });
      }

      gsap.from(".hero-later", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        delay: 0.65,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.to(".hero-bg", {
        yPercent: 14,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      page.querySelectorAll(".split-heading").forEach((heading) => {
        const split = new SplitText(heading, { type: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 105,
          opacity: 0,
          stagger: 0.09,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 82%",
          },
        });
      });

      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 18,
        ease: "none",
      });

      ScrollTrigger.batch(".product-card", {
        start: "top 86%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 54, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.13, duration: 0.9, ease: "power3.out" },
          ),
      });

      gsap.fromTo(
        ".scroll-image",
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-section",
            start: "top 78%",
          },
        },
      );

      gsap.from(".story-line", {
        y: 28,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-copy",
          start: "top 75%",
        },
      });

      const menuWrap = page.querySelector(".menu-horizontal");
      const menuTrack = page.querySelector(".menu-track");
      if (menuWrap && menuTrack) {
        gsap.from(".menu-card", {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".menu-stage",
            start: "top 76%",
          },
        });

        gsap.to(menuTrack, {
          x: () => {
            const distance = menuTrack.scrollWidth - window.innerWidth - window.innerWidth * 0.08;
            return -Math.max(distance, 0);
          },
          ease: "none",
          scrollTrigger: {
            trigger: menuWrap,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      page.querySelectorAll<HTMLElement>(".stat-number").forEach((stat) => {
        const target = Number(stat.dataset.value || 0);
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.8,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 82%",
            },
          },
        );
      });

      gsap.fromTo(
        ".vibe-tile",
        { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          stagger: 0.08,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".vibe-grid",
            start: "top 78%",
          },
        },
      );

      gsap.to(".particle", {
        y: "random(-24, 24)",
        x: "random(-18, 18)",
        opacity: "random(0.18, 0.55)",
        duration: "random(2.4, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <PageReveal>
      <main ref={pageRef}>
        <section className="hero noise relative min-h-screen overflow-hidden bg-[#1a0f0a]">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=90"
            alt="Coffee being poured at Local Bistro"
            fill
            priority
            className="hero-bg object-cover opacity-55"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f0a] via-[#1a0f0a]/74 to-[#1a0f0a]/25" />
          <div className="section-pad relative flex min-h-screen items-end pb-[clamp(3rem,8vw,7rem)] pt-32">
            <div className="max-w-[min(88vw,74rem)]">
              <p className="hero-later mb-5 text-xs font-black uppercase tracking-[0.28em] text-[#c17f3a]">
                Single origin. Slow brewed. Locally loved.
              </p>
              <h1 className="hero-title font-display max-w-[12ch] overflow-hidden text-[clamp(3.8rem,12vw,11rem)] leading-[0.86] tracking-normal">
                Coffee that feels like home.
              </h1>
              <p className="hero-later mt-8 max-w-2xl text-[clamp(1rem,1.5vw,1.35rem)] leading-8 text-[#f5e6d0]/78">
                Local Bistro is a warm table, a careful roast, and an online shelf of coffee rituals made for slow mornings.
              </p>
              <div className="hero-later mt-8 flex flex-wrap gap-3">
                <LoadingLink className="btn-primary gap-2" href="#menu">
                  Explore Our Menu <ArrowDown size={16} />
                </LoadingLink>
                <LoadingLink className="btn-secondary gap-2" href="/shop">
                  Shop Now <ArrowRight size={16} />
                </LoadingLink>
              </div>
            </div>
          </div>
        </section>

        <section className="cream-panel overflow-hidden py-[clamp(3rem,6vw,5rem)]">
          <div className="section-pad">
            <p className="font-display mx-auto max-w-5xl text-center text-[clamp(1.8rem,4vw,4.4rem)] leading-tight">
              A neighborhood coffee house for careful beans, gentle service, and cups worth slowing down for.
            </p>
          </div>
          <div className="mt-12 flex overflow-hidden border-y border-[#1a0f0a]/12 py-5">
            <div className="marquee-track flex min-w-max gap-10 text-xs font-black uppercase tracking-[0.24em] text-[#1a0f0a]/72">
              {Array.from({ length: 2 }).map((_, index) => (
                <span key={index} className="flex gap-10">
                  <span>Single Origin</span>
                  <span>Slow Brewed</span>
                  <span>Locally Sourced</span>
                  <span>Artisan Roast</span>
                  <span>Warm Table</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#1a0f0a] py-[clamp(5rem,10vw,9rem)]">
          <div className="container-fluid">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
                  Best sellers
                </p>
                <h2 className="split-heading font-display max-w-3xl text-[clamp(3rem,7vw,7rem)] leading-[0.9]">
                  Beans with a loyal following.
                </h2>
              </div>
              <LoadingLink href="/shop" className="btn-secondary w-fit gap-2">
                View Shop <ArrowRight size={16} />
              </LoadingLink>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="story-section cream-panel section-pad py-[clamp(5rem,10vw,9rem)]">
          <div className="container-fluid grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="grid gap-4">
              <div className="relative aspect-[1.08] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1400&q=88"
                  alt="Barista preparing espresso"
                  fill
                  className="scroll-image object-cover"
                  sizes="(max-width: 1024px) 92vw, 42vw"
                />
              </div>
              <div className="relative ml-auto aspect-[2.2] w-[72%] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85"
                  alt="Warm cup of coffee on a bistro table"
                  fill
                  className="object-cover"
                  sizes="60vw"
                />
              </div>
            </div>
            <div className="story-copy">
              <p className="story-line mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
                Our story
              </p>
              <h2 className="story-line font-display max-w-3xl text-[clamp(3rem,7vw,7rem)] leading-[0.9]">
                Roasted for the rhythm of real life.
              </h2>
              <p className="story-line mt-8 max-w-2xl text-lg leading-8 text-[#1a0f0a]/72">
                Local Bistro began as a small counter where neighbors lingered after one more cup. Today we roast in small batches, brew with patience, and ship coffee products that carry the same warmth home.
              </p>
              <p className="story-line mt-5 max-w-2xl text-lg leading-8 text-[#1a0f0a]/72">
                Every bean is chosen for balance, every drink is built with care, and every visit should feel unhurried.
              </p>
            </div>
          </div>
        </section>

        <section id="menu" className="menu-horizontal noise relative h-[240vh] overflow-clip bg-[#120b08]">
          <div className="menu-stage sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-[clamp(4.5rem,7vh,6rem)]">
            <div className="section-pad mb-[clamp(1.5rem,4vh,3rem)]">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
                The menu taste
              </p>
              <h2 className="split-heading font-display max-w-5xl text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.9]">
                Six cups, one slow scroll.
              </h2>
            </div>
            <div className="menu-track flex w-max gap-5 pl-[4vw] pr-[12vw]">
              {menuItems.map((item, index) => (
                <article
                  key={item.name}
                  className="menu-card lb-card grid h-[min(56vh,31rem)] w-[min(84vw,24rem)] shrink-0 overflow-hidden md:h-[min(38vh,21rem)] md:w-[min(72vw,43rem)] md:grid-cols-[0.95fr_1fr]"
                >
                  <div className="relative min-h-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 84vw, 34vw"
                    />
                  </div>
                  <div className="flex min-h-0 flex-col justify-between p-[clamp(1.1rem,2.4vw,1.75rem)]">
                    <div className="mb-4 flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-[#c17f3a]">
                      <span>0{index + 1}</span>
                      <span>{item.price}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-[clamp(1.8rem,3.2vw,3.1rem)] leading-[0.9]">
                        {item.name}
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-[#f5e6d0]/68">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad cream-panel py-[clamp(5rem,10vw,8rem)]">
          <div className="container-fluid grid gap-5 md:grid-cols-4">
            {[
              { icon: Coffee, value: 12, label: "Years of craft" },
              { icon: Leaf, value: 100, label: "Arabica focus" },
              { icon: PackageCheck, value: 48, label: "Hour dispatch" },
              { icon: Sparkles, value: 6, label: "Signature drinks" },
            ].map((stat) => (
              <div key={stat.label} className="border border-[#1a0f0a]/12 p-6">
                <stat.icon className="mb-10 text-[#c17f3a]" size={26} />
                <p className="font-display text-6xl leading-none">
                  <span className="stat-number" data-value={stat.value}>
                    0
                  </span>
                  {stat.value === 100 ? "%" : "+"}
                </p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-[#1a0f0a]/56">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-pad bg-[#1a0f0a] py-[clamp(5rem,10vw,9rem)]">
          <div className="container-fluid">
            <h2 className="split-heading font-display mb-10 max-w-4xl text-[clamp(3rem,7vw,7rem)] leading-[0.9]">
              Seen around the bistro.
            </h2>
            <div className="vibe-grid grid grid-cols-2 gap-4 md:grid-cols-3">
              {vibeImages.map((image, index) => (
                <div
                  key={image}
                  className="vibe-tile relative aspect-[4/5] overflow-hidden"
                >
                  <Image src={image} alt="Local Bistro atmosphere" fill className="object-cover" sizes="50vw" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="noise section-pad relative overflow-hidden bg-[#24140d] py-[clamp(5rem,9vw,8rem)] text-center">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="particle absolute h-2 w-2 rounded-full bg-[#c17f3a]"
              style={{
                left: `${8 + ((index * 13) % 86)}%`,
                top: `${14 + ((index * 19) % 72)}%`,
              }}
            />
          ))}
          <div className="relative mx-auto max-w-5xl">
            <h2 className="split-heading font-display text-[clamp(3rem,8vw,8rem)] leading-[0.88]">
              Ready for your next cup?
            </h2>
            <LoadingLink href="/shop" className="btn-primary mt-8 gap-2">
              Shop Coffee <ArrowRight size={16} />
            </LoadingLink>
          </div>
        </section>
      </main>
    </PageReveal>
  );
}

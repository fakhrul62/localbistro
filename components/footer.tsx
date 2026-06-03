"use client";

import Link from "next/link";
import { Camera, Mail, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/logo";
import { gsap, SplitText } from "@/lib/gsap";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const headline = footer.querySelector(".footer-headline");
      if (headline) {
        const split = new SplitText(headline, { type: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 82%",
          },
        });
      }

      gsap.from(".footer-item", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 72%",
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="noise section-pad bg-[#120b08] py-[clamp(4rem,9vw,8rem)]">
      <div className="container-fluid relative grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Logo />
          <h2 className="footer-headline font-display mt-10 max-w-3xl text-[clamp(2.5rem,7vw,6.8rem)] leading-[0.92]">
            Come home to coffee.
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-3 lg:pt-20">
          <div className="footer-item">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#c17f3a]">
              Visit
            </p>
            <p className="text-sm leading-7 text-[#f5e6d0]/72">
              18 Market Lane
              <br />
              Open daily, 7am-8pm
            </p>
          </div>
          <div className="footer-item">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#c17f3a]">
              Menu
            </p>
            <div className="grid gap-3 text-sm text-[#f5e6d0]/72">
              <Link href="/">Story</Link>
              <Link href="/menu">Cafe Menu</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/cart">Cart</Link>
            </div>
          </div>
          <div className="footer-item">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#c17f3a]">
              Social
            </p>
            <div className="flex gap-3">
              <span className="icon-button">
                <Camera size={16} />
              </span>
              <span className="icon-button">
                <Mail size={16} />
              </span>
              <span className="icon-button">
                <MapPin size={16} />
              </span>
            </div>
          </div>
        </div>
        <p className="footer-item text-xs uppercase tracking-[0.18em] text-[#f5e6d0]/45 lg:col-span-2">
          Copyright 2026 Local Bistro. Slow coffee, roasted with care.
        </p>
      </div>
    </footer>
  );
}

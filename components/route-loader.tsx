"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type LoaderState = {
  active: boolean;
  startPath: string;
};

export const startRouteLoader = () => {
  window.dispatchEvent(new CustomEvent("local-bistro:route-loading"));
};

export function RouteLoader() {
  const [loader, setLoader] = useState<LoaderState>({
    active: false,
    startPath: "",
  });
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const show = () =>
      setLoader({
        active: true,
        startPath: window.location.pathname,
      });

    window.addEventListener("local-bistro:route-loading", show);
    return () => window.removeEventListener("local-bistro:route-loading", show);
  }, []);

  useEffect(() => {
    if (!loader.active || !wrapRef.current || !barRef.current || !cupRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(wrapRef.current, { autoAlpha: 1 });
      gsap.fromTo(
        barRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 0.72, duration: 0.55, ease: "power3.out" },
      );
      gsap.to(barRef.current, {
        scaleX: 0.92,
        duration: 3,
        delay: 0.55,
        ease: "power1.out",
      });
      gsap.to(cupRef.current, {
        y: -5,
        rotate: 2,
        repeat: -1,
        yoyo: true,
        duration: 0.55,
        ease: "sine.inOut",
      });
      gsap.fromTo(
        ".route-steam",
        { y: 8, opacity: 0 },
        { y: -10, opacity: 1, stagger: 0.1, repeat: -1, yoyo: true, duration: 0.8 },
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [loader.active]);

  useEffect(() => {
    if (!loader.active) return;

    const fallback = window.setTimeout(() => {
      if (wrapRef.current) {
        gsap.to(wrapRef.current, {
          autoAlpha: 0,
          duration: 0.28,
          ease: "power2.out",
          onComplete: () => setLoader({ active: false, startPath: "" }),
        });
      } else {
        setLoader({ active: false, startPath: "" });
      }
    }, 9000);

    return () => window.clearTimeout(fallback);
  }, [loader.active]);

  useEffect(() => {
    if (!loader.active || !wrapRef.current || !barRef.current) return;
    if (pathname === loader.startPath) return;

    const timeout = window.setTimeout(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        duration: 0.22,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(wrapRef.current, {
            autoAlpha: 0,
            duration: 0.28,
            ease: "power2.out",
            onComplete: () => setLoader({ active: false, startPath: "" }),
          });
        },
      });
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [pathname, loader.active, loader.startPath]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none invisible fixed inset-x-0 top-0 z-[80] bg-[#1a0f0a]/78 backdrop-blur-md"
      aria-hidden
    >
      <div ref={barRef} className="h-1 origin-left scale-x-0 bg-[#c17f3a]" />
      <div className="fixed bottom-5 left-5 flex items-center gap-3 border border-[#f5e6d0]/14 bg-[#1a0f0a]/82 px-4 py-3 text-[#f5e6d0] shadow-2xl backdrop-blur-md">
        <div ref={cupRef} className="loader-cup">
          <span className="route-steam" />
          <span className="route-steam" />
          <span className="route-steam" />
        </div>
        <span className="text-[0.65rem] font-black uppercase tracking-[0.22em]">
          Brewing
        </span>
      </div>
    </div>
  );
}

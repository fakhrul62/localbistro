"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const move = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;
      gsap.set(dot, { x: pos.x - 7, y: pos.y - 7 });
    };

    const enter = () => gsap.to(dot, { scale: 3.2, duration: 0.25, ease: "power3.out" });
    const leave = () => gsap.to(dot, { scale: 1, duration: 0.25, ease: "power3.out" });
    const interactive = document.querySelectorAll("a, button, input, textarea, select");

    window.addEventListener("mousemove", move);
    gsap.ticker.add(tick);
    interactive.forEach((node) => {
      node.addEventListener("mouseenter", enter);
      node.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      gsap.ticker.remove(tick);
      interactive.forEach((node) => {
        node.removeEventListener("mouseenter", enter);
        node.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden />;
}

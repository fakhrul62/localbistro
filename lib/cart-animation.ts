"use client";

import { gsap } from "@/lib/gsap";

export function animateCoffeeToCart(source: HTMLElement | null) {
  if (!source || typeof document === "undefined") return;

  const cart = document.querySelector<HTMLElement>("[data-cart-target]");
  const start = source.getBoundingClientRect();
  const end = cart?.getBoundingClientRect();

  const flight = document.createElement("div");
  flight.className = "cart-flight";
  flight.innerHTML = "<span></span>";
  document.body.appendChild(flight);

  const startX = start.left + start.width / 2;
  const startY = start.top + start.height / 2;
  const endX = end ? end.left + end.width / 2 : window.innerWidth - 36;
  const endY = end ? end.top + end.height / 2 : 36;

  gsap.set(flight, { x: startX, y: startY, scale: 0.75, autoAlpha: 1 });
  gsap.to(flight, {
    x: endX,
    y: endY,
    scale: 0.32,
    rotate: 22,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      gsap.to(flight, {
        autoAlpha: 0,
        scale: 0.1,
        duration: 0.18,
        onComplete: () => flight.remove(),
      });
      if (cart) {
        gsap.fromTo(
          cart,
          { scale: 1 },
          { scale: 1.18, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" },
        );
      }
    },
  });
}

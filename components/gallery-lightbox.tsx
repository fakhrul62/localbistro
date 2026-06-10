"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryLightboxProps {
  images: string[];
  altText?: string;
}

export function GalleryLightbox({ images, altText = "Gallery image" }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeLightbox = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(() => {
      setSelectedIndex(null);
      setIsClosing(false);
    }, 200);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null || images.length === 0) return currentIndex;
      return (currentIndex + 1) % images.length;
    });
  }, [images.length]);

  const previousImage = useCallback(() => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null || images.length === 0) return currentIndex;
      return (currentIndex - 1 + images.length) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") previousImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeLightbox, nextImage, previousImage, selectedIndex]);

  const lightbox =
    selectedIndex !== null ? (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-200 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={`${altText} lightbox`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/92"
          onClick={closeLightbox}
          aria-label="Close lightbox"
        />

        <button
          type="button"
          onClick={closeLightbox}
          className="absolute right-4 top-4 z-[10000] rounded-lg p-2 text-white transition-colors hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X size={28} />
        </button>

        <div className="relative z-[10000] flex h-[90vh] w-[min(92vw,72rem)] items-center justify-center">
          <Image
            src={images[selectedIndex]}
            alt={`${altText} ${selectedIndex + 1}`}
            fill
            className="object-contain"
            priority
            sizes="92vw"
          />
        </div>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-4 top-1/2 z-[10000] -translate-y-1/2 rounded-lg p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 z-[10000] -translate-y-1/2 rounded-lg p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </>
        ) : null}

        <div className="pointer-events-none absolute bottom-4 left-1/2 z-[10000] -translate-x-1/2 rounded-lg bg-black/60 px-4 py-2 text-sm text-white">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>
    ) : null;

  return (
    <>
      <div className="vibe-grid grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            onClick={() => setSelectedIndex(index)}
            className="vibe-tile group relative aspect-[4/5] cursor-pointer overflow-hidden"
            aria-label={`Open ${altText} ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${altText} ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
              <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}

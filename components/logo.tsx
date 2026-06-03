import { Coffee } from "lucide-react";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" aria-label="Local Bistro">
      <span
        className={`grid h-9 w-9 place-items-center border ${
          dark ? "border-[#1a0f0a]/25" : "border-[#f5e6d0]/25"
        }`}
      >
        <Coffee size={18} strokeWidth={1.7} />
      </span>
      <span className="font-display text-xl font-semibold leading-none tracking-normal">
        Local Bistro
      </span>
    </span>
  );
}

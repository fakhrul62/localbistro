import { BookOpen, Droplets, Timer } from "lucide-react";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { brewGuides } from "@/data/cafe-extras";

export default function CoffeeGuidePage() {
  return (
    <PageReveal>
      <main className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <section className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Brew guide
          </p>
          <h1 className="font-display max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[0.85]">
            Make cafe coffee at home.
          </h1>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {brewGuides.map((guide) => (
              <article key={guide.method} className="lb-card p-6">
                <BookOpen className="mb-10 text-[#c17f3a]" size={28} />
                <h2 className="font-display text-4xl leading-none">{guide.method}</h2>
                <div className="mt-8 grid gap-3 text-sm text-[#f5e6d0]/72">
                  <p className="flex justify-between gap-4 border-b border-[#f5e6d0]/10 pb-3">
                    <span>Ratio</span>
                    <span className="text-[#f5e6d0]">{guide.ratio}</span>
                  </p>
                  <p className="flex justify-between gap-4 border-b border-[#f5e6d0]/10 pb-3">
                    <span>Grind</span>
                    <span className="text-[#f5e6d0]">{guide.grind}</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span>Time</span>
                    <span className="text-[#f5e6d0]">{guide.time}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="border border-[#f5e6d0]/12 p-6">
              <Droplets className="mb-8 text-[#c17f3a]" size={26} />
              <h2 className="font-display text-4xl leading-none">Water matters</h2>
              <p className="mt-5 text-sm leading-7 text-[#f5e6d0]/68">
                Use clean filtered water just off boil for hot coffee, and cold filtered water for overnight brews.
              </p>
            </div>
            <div className="border border-[#f5e6d0]/12 p-6">
              <Timer className="mb-8 text-[#c17f3a]" size={26} />
              <h2 className="font-display text-4xl leading-none">Grind fresh</h2>
              <p className="mt-5 text-sm leading-7 text-[#f5e6d0]/68">
                A fresh grind keeps aroma and sweetness intact. Ask the cafe to grind your bag if needed.
              </p>
            </div>
          </div>
          <LoadingLink href="/shop" className="btn-primary mt-8">
            Shop Beans
          </LoadingLink>
        </section>
      </main>
    </PageReveal>
  );
}

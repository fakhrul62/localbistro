import { PackageCheck, Repeat, SlidersHorizontal } from "lucide-react";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { subscriptions } from "@/data/cafe-extras";

export default function SubscriptionsPage() {
  return (
    <PageReveal>
      <main className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <section className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Coffee subscriptions
          </p>
          <h1 className="font-display max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[0.85]">
            Beans on your rhythm.
          </h1>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {subscriptions.map((plan) => (
              <article key={plan.name} className="lb-card flex min-h-[25rem] flex-col justify-between p-6">
                <div>
                  <Repeat className="mb-8 text-[#c17f3a]" size={28} />
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c17f3a]">
                    {plan.cadence}
                  </p>
                  <h2 className="font-display mt-5 text-[clamp(2.5rem,4vw,4rem)] leading-[0.9]">
                    {plan.name}
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-[#f5e6d0]/68">{plan.description}</p>
                </div>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <span className="font-display text-5xl">{plan.price}</span>
                  <LoadingLink href="/shop" className="btn-primary">
                    Pick Beans
                  </LoadingLink>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="border border-[#f5e6d0]/12 p-6">
              <SlidersHorizontal className="mb-8 text-[#c17f3a]" size={26} />
              <h2 className="font-display text-4xl leading-none">Choose grind and roast</h2>
              <p className="mt-5 text-sm leading-7 text-[#f5e6d0]/68">
                Whole bean, espresso grind, filter grind, or French press grind can be prepared by the counter.
              </p>
            </div>
            <div className="border border-[#f5e6d0]/12 p-6">
              <PackageCheck className="mb-8 text-[#c17f3a]" size={26} />
              <h2 className="font-display text-4xl leading-none">Pickup or delivery</h2>
              <p className="mt-5 text-sm leading-7 text-[#f5e6d0]/68">
                Local pickup keeps it simple, while neighborhood delivery can be added for recurring members.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageReveal>
  );
}

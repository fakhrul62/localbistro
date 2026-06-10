import { BadgeCheck, Coffee, Gift, Sparkles } from "lucide-react";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { cafeInfo } from "@/data/cafe-extras";

const perks = [
  { icon: Coffee, title: "Every 8th cup free", text: "Scan in-store and keep the morning ritual simple." },
  { icon: Gift, title: "Birthday coffee", text: "A drink on the house during your birthday week." },
  { icon: Sparkles, title: "Member tastings", text: "First access to new beans, seasonal cups, and small-batch brews." },
];

export default function LoyaltyPage() {
  return (
    <PageReveal>
      <main className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <section className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Brew Club
          </p>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <h1 className="font-display max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[0.85]">
                Loyalty for regulars.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f5e6d0]/70">
                Brew Club keeps cafe visits personal: drink rewards, birthday coffee, tasting invites, and member-only bean drops.
              </p>
            </div>
            <form
              action={`mailto:${cafeInfo.email}`}
              method="post"
              encType="text/plain"
              className="lb-card grid gap-4 p-5"
            >
              <input className="field" placeholder="Name" />
              <input className="field" placeholder="Email or phone" />
              <button className="btn-primary gap-2" type="submit">
                <BadgeCheck size={16} />
                Join Brew Club
              </button>
            </form>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {perks.map((perk) => (
              <article key={perk.title} className="border border-[#f5e6d0]/12 p-6">
                <perk.icon className="mb-10 text-[#c17f3a]" size={28} />
                <h2 className="font-display text-4xl leading-none">{perk.title}</h2>
                <p className="mt-5 text-sm leading-7 text-[#f5e6d0]/68">{perk.text}</p>
              </article>
            ))}
          </div>

          <LoadingLink href="/subscriptions" className="btn-secondary mt-8">
            See Bean Subscriptions
          </LoadingLink>
        </section>
      </main>
    </PageReveal>
  );
}

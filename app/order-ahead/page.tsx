import { Clock, Coffee, CupSoda, ShoppingBag } from "lucide-react";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { cafeInfo } from "@/data/cafe-extras";
import { cafeMenuSections } from "@/data/cafe-menu";

const quickPicks = cafeMenuSections.flatMap((section) => section.items.slice(0, 2)).slice(0, 8);

export default function OrderAheadPage() {
  return (
    <PageReveal>
      <main className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <section className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Order ahead
          </p>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1fr]">
            <div>
              <h1 className="font-display max-w-4xl text-[clamp(4rem,10vw,9rem)] leading-[0.85]">
                Pickup without the wait.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f5e6d0]/70">
                Send the cafe a pickup request for drinks, pastries, or beans. The counter confirms timing before preparing your order.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Coffee, label: "Cafe drinks" },
                  { icon: CupSoda, label: "Cold cups" },
                  { icon: ShoppingBag, label: "Beans to go" },
                ].map((item) => (
                  <div key={item.label} className="border border-[#f5e6d0]/12 p-4">
                    <item.icon className="mb-5 text-[#c17f3a]" size={22} />
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f5e6d0]/70">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <form
              action={`mailto:${cafeInfo.email}`}
              method="post"
              encType="text/plain"
              className="lb-card grid gap-4 p-5 sm:grid-cols-2"
            >
              <input className="field" name="name" placeholder="Your name" />
              <input className="field" name="phone" placeholder="Phone number" />
              <input className="field" name="time" placeholder="Pickup time" />
              <select className="field" name="type" defaultValue="drinks">
                <option value="drinks">Drinks and pastry</option>
                <option value="beans">Beans or merch</option>
                <option value="both">Cafe order plus beans</option>
              </select>
              <textarea
                className="field min-h-40 sm:col-span-2"
                name="items"
                placeholder="Write your order here"
              />
              <button className="btn-primary gap-2 sm:col-span-2" type="submit">
                <Clock size={16} />
                Request Pickup
              </button>
            </form>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {quickPicks.map((item) => (
              <article key={item.name} className="border border-[#f5e6d0]/12 p-5">
                <p className="font-display text-2xl leading-none">{item.name}</p>
                <p className="mt-3 text-sm leading-6 text-[#f5e6d0]/62">{item.description}</p>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#c17f3a]">
                  from {item.regular}
                </p>
              </article>
            ))}
          </div>

          <LoadingLink href="/menu" className="btn-secondary mt-8">
            View Full Cafe Menu
          </LoadingLink>
        </section>
      </main>
    </PageReveal>
  );
}

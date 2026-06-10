import { Gift, Heart, Mail } from "lucide-react";
import { PageReveal } from "@/components/page-reveal";
import { cafeInfo } from "@/data/cafe-extras";

const amounts = ["$15", "$25", "$50", "$100"];

export default function GiftCardsPage() {
  return (
    <PageReveal>
      <main className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <section className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Gift cards
          </p>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <h1 className="font-display max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[0.85]">
                Give someone a slow cup.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f5e6d0]/70">
                Gift cards work for cafe drinks, pastry counter treats, beans, brewing gear, and small merchandise.
              </p>
            </div>
            <div className="lb-card p-6">
              <Gift className="mb-10 text-[#c17f3a]" size={34} />
              <div className="grid grid-cols-2 gap-3">
                {amounts.map((amount) => (
                  <button key={amount} className="min-h-16 border border-[#f5e6d0]/14 font-display text-3xl" type="button">
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form
            action={`mailto:${cafeInfo.email}`}
            method="post"
            encType="text/plain"
            className="mt-10 grid gap-4 border border-[#f5e6d0]/12 p-5 sm:grid-cols-2"
          >
            <input className="field" placeholder="Buyer name" />
            <input className="field" placeholder="Recipient name" />
            <input className="field" placeholder="Email or phone" />
            <select className="field" defaultValue="$25">
              {amounts.map((amount) => (
                <option key={amount}>{amount}</option>
              ))}
            </select>
            <textarea className="field min-h-32 sm:col-span-2" placeholder="Gift note" />
            <button className="btn-primary gap-2 sm:col-span-2" type="submit">
              <Mail size={16} />
              Request Gift Card
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3 text-sm leading-7 text-[#f5e6d0]/68">
            <Heart className="text-[#c17f3a]" size={20} />
            Physical cards can be collected at the counter. Digital cards can be emailed after confirmation.
          </div>
        </section>
      </main>
    </PageReveal>
  );
}

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { cafeInfo, reviews } from "@/data/cafe-extras";

export default function VisitPage() {
  return (
    <PageReveal>
      <main className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <section className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Visit the cafe
          </p>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <h1 className="font-display max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[0.85]">
              Your table is close by.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#f5e6d0]/70">
              Local Bistro is built for walk-ins, slow mornings, quick takeaways, and people who want the cafe version before they buy the beans.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <div className="relative min-h-[28rem] overflow-hidden bg-[#24140d]">
              <iframe
                title="Local Bistro map"
                src="https://www.google.com/maps?q=coffee%20shop&output=embed"
                className="h-full min-h-[28rem] w-full border-0 grayscale"
                loading="lazy"
              />
            </div>
            <div className="grid gap-5">
              <div className="lb-card p-6">
                <MapPin className="mb-8 text-[#c17f3a]" size={26} />
                <p className="font-display text-4xl leading-none">{cafeInfo.address}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn-primary" href="https://maps.google.com/?q=18%20Market%20Lane" target="_blank" rel="noreferrer">
                    Get Directions
                  </a>
                  <LoadingLink className="btn-secondary" href="/bookings">
                    Book a Table
                  </LoadingLink>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="lb-card p-5">
                  <Clock className="mb-6 text-[#c17f3a]" size={22} />
                  <div className="grid gap-3 text-sm text-[#f5e6d0]/72">
                    {cafeInfo.hours.map((item) => (
                      <p key={item.days} className="flex justify-between gap-4">
                        <span>{item.days}</span>
                        <span className="text-[#f5e6d0]">{item.time}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="lb-card p-5">
                  <Phone className="mb-6 text-[#c17f3a]" size={22} />
                  <p className="text-sm leading-7 text-[#f5e6d0]/72">{cafeInfo.phone}</p>
                  <Mail className="mb-6 mt-8 text-[#c17f3a]" size={22} />
                  <p className="text-sm leading-7 text-[#f5e6d0]/72">{cafeInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="border border-[#f5e6d0]/12 p-6">
                <p className="text-lg leading-8 text-[#f5e6d0]/78">&quot;{review.quote}&quot;</p>
                <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-[#c17f3a]">
                  {review.name}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageReveal>
  );
}

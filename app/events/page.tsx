import { CalendarDays, Music, Users } from "lucide-react";
import { LoadingLink } from "@/components/loading-link";
import { PageReveal } from "@/components/page-reveal";
import { events } from "@/data/cafe-extras";

export default function EventsPage() {
  return (
    <PageReveal>
      <main className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <section className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Community board
          </p>
          <h1 className="font-display max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[0.85]">
            Small events, warm tables.
          </h1>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {events.map((event, index) => (
              <article key={event.title} className="lb-card flex min-h-[24rem] flex-col justify-between p-6">
                <div>
                  {(() => {
                    const Icon = [Music, CalendarDays, Users][index];
                    return <Icon className="mb-8 text-[#c17f3a]" size={28} />;
                  })()}
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c17f3a]">
                    {event.date} / {event.time}
                  </p>
                  <h2 className="font-display mt-5 text-[clamp(2.5rem,4vw,4rem)] leading-[0.9]">
                    {event.title}
                  </h2>
                </div>
                <p className="mt-8 text-base leading-7 text-[#f5e6d0]/68">{event.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LoadingLink href="/bookings" className="btn-primary">
              Host Something Here
            </LoadingLink>
            <LoadingLink href="/visit" className="btn-secondary">
              Visit the Cafe
            </LoadingLink>
          </div>
        </section>
      </main>
    </PageReveal>
  );
}

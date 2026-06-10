import { CalendarCheck, PartyPopper, Users } from "lucide-react";
import { PageReveal } from "@/components/page-reveal";
import { cafeInfo } from "@/data/cafe-extras";

const bookingTypes = [
  { icon: CalendarCheck, title: "Table Reservation", text: "For 2-6 guests during busy mornings and weekend afternoons." },
  { icon: Users, title: "Work Table", text: "Quiet corner blocks for small meetings, study sessions, and creator work." },
  { icon: PartyPopper, title: "Private Cafe Moment", text: "Birthday corners, tasting tables, and small community gatherings." },
];

export default function BookingsPage() {
  return (
    <PageReveal>
      <main className="section-pad bg-[#1a0f0a] pb-[clamp(5rem,8vw,7rem)] pt-36">
        <section className="container-fluid">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
            Reservations and bookings
          </p>
          <h1 className="font-display max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[0.85]">
            Save a seat for coffee.
          </h1>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {bookingTypes.map((item) => (
              <article key={item.title} className="border border-[#f5e6d0]/12 p-6">
                <item.icon className="mb-10 text-[#c17f3a]" size={28} />
                <h2 className="font-display text-4xl leading-none">{item.title}</h2>
                <p className="mt-5 text-sm leading-7 text-[#f5e6d0]/68">{item.text}</p>
              </article>
            ))}
          </div>
          <form
            action={`mailto:${cafeInfo.email}`}
            method="post"
            encType="text/plain"
            className="lb-card mt-10 grid gap-4 p-5 sm:grid-cols-2"
          >
            <input className="field" placeholder="Name" />
            <input className="field" placeholder="Phone or email" />
            <input className="field" placeholder="Date" />
            <input className="field" placeholder="Guest count" />
            <select className="field sm:col-span-2" defaultValue="table">
              <option value="table">Table reservation</option>
              <option value="work">Work table</option>
              <option value="private">Private booking</option>
            </select>
            <textarea className="field min-h-36 sm:col-span-2" placeholder="Notes, timing, or event details" />
            <button className="btn-primary sm:col-span-2" type="submit">
              Send Booking Request
            </button>
          </form>
        </section>
      </main>
    </PageReveal>
  );
}

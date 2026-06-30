import { siteConfig } from "@/constants/siteData";
import Link from "next/link";
import Image from "next/image";
import "@/styles/pages/events.css";
import "@/styles/components/HeroSection.css";

export const metadata = {
  title: `Events | ${siteConfig.name}`,
  description: `Health camps, awareness drives, seminars, and community events hosted by ${siteConfig.name}.`,
  openGraph: {
    title: `Events | ${siteConfig.name}`,
    description: `Upcoming and past health events from ${siteConfig.name}.`,
    url: `${siteConfig.url}/events`,
  },
};

const upcomingEvents = [
  {
    id: 1,
    date: "15",
    month: "Jul",
    year: "2026",
    time: "9:00 AM - 4:00 PM",
    title: "Free Diabetes Screening Camp",
    location: "Renova Life Care, Main Campus, Dhaka",
    category: "Health Camp",
    desc: "Complimentary blood sugar testing, diet counseling, and consultations with our endocrinology specialists.",
    spots: "120 spots left",
    image: "/images/events/01.jpg",
  },
  {
    id: 2,
    date: "22",
    month: "Jul",
    year: "2026",
    time: "10:00 AM - 1:00 PM",
    title: "Heart Health Awareness Seminar",
    location: "Renova Auditorium, 3rd Floor",
    category: "Seminar",
    desc: "Cardiologists discuss prevention, early warning signs, and Q&A on cardiovascular wellness.",
    spots: "Open to all",
    image: "/images/events/02.jpg",
  },
  {
    id: 3,
    date: "05",
    month: "Aug",
    year: "2026",
    time: "8:00 AM - 5:00 PM",
    title: "Rural Community Health Drive",
    location: "Savar Union, Dhaka Division",
    category: "Community",
    desc: "Free general checkups, medicine distribution, and maternal health support for underserved communities.",
    spots: "Volunteers needed",
    image: "/images/events/03.jpg",
  },
  {
    id: 4,
    date: "18",
    month: "Aug",
    year: "2026",
    time: "11:00 AM - 2:00 PM",
    title: "Child Nutrition & Vaccination Camp",
    location: "Renova Pediatric Wing",
    category: "Health Camp",
    desc: "Free vaccinations, growth monitoring, and nutrition guidance for children under 12.",
    spots: "80 spots left",
    image: "/images/events/04.jpg",
  },
];

const pastEvents = [
  { id: 1, title: "World Health Day Free Checkup Camp", date: "April 7, 2026", attendees: "850+ Attendees" },
  { id: 2, title: "Breast Cancer Awareness Walk", date: "October 12, 2025", attendees: "1,200+ Attendees" },
  { id: 3, title: "Annual Blood Donation Drive", date: "September 5, 2025", attendees: "600+ Donors" },
];

const categoryColors = {
  "Health Camp": "#428a26",
  "Seminar": "#1d6fb5",
  "Community": "#e67e22",
};

export default function EventsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Community & Outreach</span>
          <h1 className="page-hero__title">
            Our <span className="page-hero__highlight">Events</span>
          </h1>
          <p className="page-hero__subtitle">
            Free health camps, awareness seminars, and community drives — bringing quality
            healthcare closer to the people of Bangladesh.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Events</span>
          </nav>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="page-section page-section--white">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__label">What's Coming Up</span>
            <h2 className="page-section__title">Upcoming Events</h2>
            <p className="page-section__subtitle">
              Reserve your spot at our next health camp, seminar, or community initiative.
            </p>
          </div>

          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <article key={event.id} className="event-card">
                <div className="event-card__poster">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="event-card__poster-img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
                  />
                  <div className="event-card__date-block">
                    <span className="event-card__day">{event.date}</span>
                    <span className="event-card__month">{event.month}</span>
                    <span className="event-card__year">{event.year}</span>
                  </div>
                  <span
                    className="event-card__category event-card__category--floating"
                    style={{
                      backgroundColor: categoryColors[event.category] || "#428a26",
                    }}
                  >
                    {event.category}
                  </span>
                </div>

                <div className="event-card__body">
                  <div className="event-card__top">
                    <span className="event-card__spots">{event.spots}</span>
                  </div>

                  <h3 className="event-card__title">{event.title}</h3>
                  <p className="event-card__desc">{event.desc}</p>

                  <div className="event-card__meta">
                    <span className="event-card__meta-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {event.time}
                    </span>
                    <span className="event-card__meta-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {event.location}
                    </span>
                  </div>

                  <Link href="/contact" className="event-card__btn">
                    Register Interest
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__label">Looking Back</span>
            <h2 className="page-section__title">Past Events</h2>
            <p className="page-section__subtitle">
              A glimpse at the impact we've made together with our community.
            </p>
          </div>

          <div className="past-events-list">
            {pastEvents.map((event) => (
              <div key={event.id} className="past-event-row">
                <div className="past-event-row__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div className="past-event-row__content">
                  <h4 className="past-event-row__title">{event.title}</h4>
                  <span className="past-event-row__date">{event.date}</span>
                </div>
                <span className="past-event-row__attendees">{event.attendees}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section page-section--green">
        <div className="page-section__container page-cta-center">
          <span className="page-section__label">Stay Involved</span>
          <h2 className="page-cta-title">Want to Partner or Volunteer?</h2>
          <p className="page-cta-subtitle">
            Reach out to our outreach team to collaborate on the next community health initiative.
          </p>
          <Link href="/contact" className="page-cta-btn">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
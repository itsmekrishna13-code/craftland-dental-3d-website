import { CalendarCheck2, MessageCircle, Phone } from "lucide-react";

const PHONE = "+16155550147";

const base =
  "flex h-12 w-12 items-center justify-center rounded-full shadow-[0_10px_30px_-12px_rgba(17,36,25,0.65)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory";

/** Fixed quick-contact stack, available on every screen. */
export default function FloatingActions() {
  return (
    <div aria-label="Quick contact" className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 sm:bottom-8 sm:right-6">
      <a
        href="#contact"
        aria-label="Book an appointment"
        title="Book an appointment"
        className={`${base} bg-gold text-forest-deep hover:bg-gold-soft hover:shadow-[0_14px_34px_-12px_rgba(184,152,94,0.95)]`}
      >
        <CalendarCheck2 className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={`sms:${PHONE}`}
        aria-label="Text us"
        title="Text us"
        className={`${base} border border-gold/40 bg-forest text-ivory hover:border-gold hover:bg-forest-mid`}
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={`tel:${PHONE}`}
        aria-label="Call us"
        title="Call us"
        className={`${base} border border-gold/40 bg-forest text-ivory hover:border-gold hover:bg-forest-mid`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
}

import { useState, type ReactNode } from "react";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Modal } from "./Modal";
import { HOURS, NAV_LINKS, SITE, TREATMENTS } from "../data/content";

const SOCIALS = [
  {
    name: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.3-1.4 1.4-1.4h1.5V5.3c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6V11H8.5v2.8h2.4V21h2.6z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" />
      </svg>
    ),
  },
];

function FooterCol({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h4 className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold-soft">{title}</h4>
      <div className="mt-6 flex flex-col gap-3.5 text-sm text-ivory/70">{children}</div>
    </div>
  );
}

const LINK = "w-fit transition-colors duration-300 hover:text-gold-soft";

export default function Footer() {
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-forest-deep text-ivory">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 lg:pt-24">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65 text-pretty">
              A boutique dental studio where advanced technology, artistry and patient-first care come together to create
              smiles that feel entirely your own.
            </p>
            <p className="mt-5 font-serif text-xl italic text-gold-soft">{SITE.tagline}</p>
            <div className="mt-8 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href="#home"
                  aria-label={`${s.name} (placeholder link)`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold-soft"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links" className="lg:col-span-2">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={LINK}>
                {l.label}
              </a>
            ))}
          </FooterCol>

          <FooterCol title="Treatments" className="lg:col-span-2">
            {TREATMENTS.slice(0, 6).map((t) => (
              <a key={t.id} href="#treatments" className={LINK}>
                {t.title}
              </a>
            ))}
          </FooterCol>

          <div className="lg:col-span-4">
            <h4 className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold-soft">Contact</h4>
            <ul className="mt-6 space-y-4 text-sm text-ivory/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" /> {SITE.address}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                <a href={SITE.phoneHref} className="hover:text-gold-soft">{SITE.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-gold-soft">{SITE.email}</a>
              </li>
            </ul>

            <h4 className="mt-10 flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold-soft">
              <Clock className="h-3.5 w-3.5" /> Opening Hours
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm text-ivory/70">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span className="text-right text-ivory/55">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-ivory/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ivory/50">© {year} CRAFTLAND DENTAL. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-ivory/60">
            <button type="button" onClick={() => setLegal("privacy")} className="transition-colors hover:text-gold-soft">
              Privacy Policy
            </button>
            <button type="button" onClick={() => setLegal("terms")} className="transition-colors hover:text-gold-soft">
              Terms and Conditions
            </button>
          </div>
          <a
            href="#home"
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center self-end rounded-full border border-ivory/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold-soft md:self-auto"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Modal
        open={legal !== null}
        onClose={() => setLegal(null)}
        title={legal === "privacy" ? "Privacy Policy" : "Terms and Conditions"}
        eyebrow="Placeholder document"
        id="legal-title"
      >
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            This is placeholder text for demonstration purposes. Before launch, replace it with your clinic's
            legally reviewed {legal === "privacy" ? "privacy policy" : "terms and conditions"}.
          </p>
          <p>
            CRAFTLAND DENTAL respects your privacy. Information you submit through the appointment form is only validated
            within this demo front end and is not transmitted anywhere until a backend is connected.
          </p>
          <p>
            Clinical information is provided for general guidance only and does not replace a consultation with a
            qualified dental professional.
          </p>
        </div>
      </Modal>
    </footer>
  );
}

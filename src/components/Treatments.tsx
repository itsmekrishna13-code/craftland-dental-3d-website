import { useCallback, useState } from "react";
import { m } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Button, Reveal, SafeImage, SectionHeading } from "./ui";
import { Modal } from "./Modal";
import { TREATMENTS, type Treatment } from "../data/content";

export default function Treatments() {
  const [selected, setSelected] = useState<Treatment | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="treatments" className="relative bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our Dental Treatments"
            title="Thoughtful care for every stage of your smile."
            description="From everyday prevention to complete smile transformations, each treatment is planned with precision and finished with an artist's eye."
          />
          <Reveal delay={0.2}>
            <Button href="#contact" variant="secondary">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.08} className="h-full">
              <m.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <SafeImage
                    src={t.image}
                    alt={`${t.title} — sample treatment photograph`}
                    label={t.title}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.8s] ease-out group-hover:scale-[1.07]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/35 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.2em] text-forest">
                    0{i + 1}
                  </span>
                  <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-forest shadow-lg transition-all duration-500 group-hover:rotate-[-10deg] group-hover:bg-gold group-hover:text-ivory">
                    <t.icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col pt-7">
                  <h3 className="font-serif text-[1.7rem] leading-tight text-forest-deep">{t.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{t.short}</p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-forest/10 pt-5">
                    <span className="inline-flex items-center gap-2 text-xs tracking-wide text-muted">
                      <Clock className="h-3.5 w-3.5 text-gold" /> {t.duration}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelected(t)}
                      aria-label={`Learn more about ${t.title}`}
                      className="group/btn inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-gold"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </m.article>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={close} title={selected?.title ?? ""} eyebrow="Treatment details" id="treatment-title">
        {selected && (
          <div className="space-y-7">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <SafeImage src={selected.image} alt={`${selected.title} sample photograph`} label={selected.title} className="h-full w-full" />
            </div>
            <p className="text-base leading-relaxed text-muted">{selected.details}</p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {selected.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 rounded-2xl bg-champagne/60 p-4 text-sm text-forest-deep">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 border-t border-forest/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">Typical visit: {selected.duration}. Your plan is confirmed after consultation.</p>
              <Button href="#contact" onClick={close}>
                Book This Treatment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

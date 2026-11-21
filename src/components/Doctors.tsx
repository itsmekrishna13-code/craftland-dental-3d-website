import { useCallback, useState } from "react";
import { Award, Stethoscope } from "lucide-react";
import { Modal } from "./Modal";
import { Button, Reveal, SafeImage, SectionHeading } from "./ui";
import { DOCTORS } from "../data/content";

type Doctor = (typeof DOCTORS)[number];

export default function Doctors() {
  const [active, setActive] = useState<Doctor | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="team" className="relative bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Meet Our Dentists"
          title="Specialists who take pride in every detail."
          description="Our team combines advanced clinical training with a genuine passion for design, comfort and long-term oral health. Portraits shown are sample placeholders."
        />

        <div className="mt-16 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.1} className="h-full">
              <article className="group flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <SafeImage
                    src={d.image}
                    alt={`Sample professional portrait of ${d.name}`}
                    label={d.name}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.8s] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-x-3 bottom-3 translate-y-[140%] rounded-xl bg-ivory/95 p-4 text-sm text-forest-deep opacity-0 shadow-lg backdrop-blur transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      <Award className="h-3.5 w-3.5" /> {d.years} years in practice
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col pt-6">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">{d.specialty}</p>
                  <h3 className="mt-2 font-serif text-[1.75rem] leading-tight text-forest-deep">{d.name}</h3>
                  <p className="mt-1 text-sm font-medium text-forest/80">{d.role}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{d.bio}</p>

                  <div className="mt-6 border-t border-forest/10 pt-5">
                    <Button variant="secondary" className="w-full !px-5 sm:w-auto" onClick={() => setActive(d)} ariaLabel={`View profile of ${d.name}`}>
                      View Profile
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={close} title={active?.name ?? ""} eyebrow={active?.role} id="doctor-title">
        {active && (
          <div className="grid gap-7 sm:grid-cols-[200px_1fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-auto sm:h-full">
              <SafeImage src={active.image} alt={`Sample portrait of ${active.name}`} label={active.name} className="h-full w-full" />
            </div>
            <div>
              <p className="text-sm font-medium text-gold">{active.specialty}</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{active.bio}</p>
              <ul className="mt-6 space-y-3 text-sm text-forest-deep">
                <li className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-gold" /> {active.years} years in clinical practice
                </li>
                <li className="flex items-center gap-3">
                  <Stethoscope className="h-4 w-4 text-gold" /> Focus: {active.specialty.split(" · ").join(", ")}
                </li>
              </ul>
              <p className="mt-6 rounded-xl bg-champagne/70 p-4 text-xs leading-relaxed text-muted">
                Demo profile. Credentials, languages and availability are placeholders to be replaced with verified
                information before launch.
              </p>
              <div className="mt-7">
                <Button href="#contact" onClick={close}>
                  Book with {active.name.split(" ").slice(0, 2).join(" ")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

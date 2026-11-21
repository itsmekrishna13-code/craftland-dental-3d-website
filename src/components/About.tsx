import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cpu, Heart, Target } from "lucide-react";
import { Button, CountUp, Reveal, RevealImage, SectionHeading } from "./ui";
import { MEDIA, STATS } from "../data/content";

const PILLARS = [
  {
    icon: Heart,
    title: "Patient-first approach",
    text: "Every visit starts with listening. We explain options clearly, so you decide with confidence and never feel rushed.",
  },
  {
    icon: Cpu,
    title: "Modern dental technology",
    text: "Digital scanning, 3D imaging and precise planning software shape each treatment before we begin.",
  },
  {
    icon: Target,
    title: "Artistry & precision",
    text: "Our restorations are hand-finished with the eye of a designer, so every result looks natural and balanced.",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const accentY = useTransform(scrollYProgress, [0, 1], [70, -50]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        {/* Split-screen imagery */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div aria-hidden className="absolute -inset-4 -z-10 translate-x-4 translate-y-4 rounded-[2rem] border border-gold/35" />
          <motion.div style={{ y: mainY }} className="relative aspect-[4/5] w-[86%] overflow-hidden rounded-[2rem]">
            <RevealImage
              src={MEDIA.about}
              alt="Dentist consulting with a patient in a bright CRAFTLAND DENTAL treatment suite"
              label="Clinic photography"
              className="h-full w-full"
            />
          </motion.div>

          <motion.div
            style={{ y: accentY }}
            className="absolute bottom-[-6%] right-0 aspect-square w-[46%] overflow-hidden rounded-[1.6rem] border-[10px] border-ivory shadow-[0_30px_60px_-30px_rgba(17,36,25,0.5)]"
          >
            <RevealImage
              src={MEDIA.aboutSecondary}
              alt="Smiling patient at a CRAFTLAND DENTAL reception"
              label="Patient experience"
              className="h-full w-full"
            />
          </motion.div>

          {/* Rotating badge */}
          <div className="absolute left-0 top-[6%] hidden h-32 w-32 items-center justify-center rounded-full bg-forest text-ivory shadow-xl sm:flex">
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_24s_linear_infinite]" aria-hidden>
              <defs>
                <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text className="fill-ivory/80" style={{ fontSize: 10.2, letterSpacing: 3.2, fontWeight: 600 }}>
                <textPath href="#badge-circle">PATIENT-FIRST · CRAFTED WITH CARE · </textPath>
              </text>
            </svg>
            <span className="font-serif text-2xl italic text-gold-soft">CD</span>
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="About Craftland Dental"
            title="Artistry and advanced dentistry, under one roof."
            description="CRAFTLAND DENTAL is a boutique dental studio built on a simple idea: a beautiful smile should feel effortless to achieve. We combine clinical excellence with a calm, design-led environment and a team that puts your comfort first."
          />

          <div className="mt-12 space-y-7">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.15 + i * 0.1} className="group flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-forest transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-forest group-hover:text-ivory">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-forest-deep">{p.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-forest/10 pt-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-4xl text-forest-deep">
                  <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <Button href="#team" variant="secondary">
              Meet Our Team <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

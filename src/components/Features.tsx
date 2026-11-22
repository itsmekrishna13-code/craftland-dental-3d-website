import { m } from "framer-motion";
import { Reveal, SectionHeading } from "./ui";
import { FEATURES } from "../data/content";

export default function Features() {
  return (
    <section id="why" className="relative bg-cream py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Why Choose Craftland"
            title="Six reasons our patients stay for life."
            description="From the first conversation to long-term maintenance, every detail is designed to make your care clear, comfortable and genuinely excellent."
          />
          <Reveal delay={0.2}>
            <p className="max-w-xs border-l border-gold/50 pl-5 text-sm leading-relaxed text-muted">
              Our standards are simple: honest advice, precise dentistry and results that look entirely like you.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.1} className="h-full">
              <m.article
                whileHover={{ backgroundColor: "#FAF6EE" }}
                transition={{ duration: 0.5 }}
                className="group relative flex h-full flex-col bg-cream p-8 sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="relative flex h-16 w-16 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-gold/40 transition-transform duration-700 group-hover:scale-110 group-hover:border-gold" />
                    <span className="absolute inset-1 rounded-full bg-sage-soft/60 transition-all duration-700 group-hover:bg-forest group-hover:scale-95" />
                    <f.icon className="relative h-6 w-6 text-forest transition-all duration-700 group-hover:-rotate-[10deg] group-hover:scale-110 group-hover:text-ivory" />
                  </span>
                  <span className="font-serif text-lg italic text-gold/80">0{i + 1}</span>
                </div>

                <h3 className="mt-10 font-serif text-[1.65rem] leading-tight text-forest-deep">{f.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{f.text}</p>

                <span className="absolute bottom-0 left-8 right-8 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 sm:left-10 sm:right-10" />
              </m.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

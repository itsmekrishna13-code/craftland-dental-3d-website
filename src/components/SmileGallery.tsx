import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Reveal, SectionHeading } from "./ui";
import { GALLERY_CASES } from "../data/content";

export default function SmileGallery() {
  return (
    <section id="gallery" className="relative bg-champagne/50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Before & After Smile Gallery"
            title="Drag to see the difference."
            description="Compare sample smile transformations with the interactive slider. The images are demonstration visuals created for illustration, not photographs of real patient outcomes."
          />
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {GALLERY_CASES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.12} className="h-full">
              <article className="flex h-full flex-col">
                <BeforeAfterSlider
                  before={c.before}
                  after={c.after}
                  altBefore={`Sample before photo: ${c.title}`}
                  altAfter={`Sample after photo: ${c.title}`}
                  className="aspect-[4/5]"
                />

                <div className="mt-7 flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold">{c.treatment}</p>
                      <h3 className="mt-2 font-serif text-2xl leading-tight text-forest-deep">{c.title}</h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-forest/20 px-3 py-1 text-[0.58rem] font-semibold tracking-[0.18em] text-forest/70">
                      SAMPLE
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{c.note}</p>
                  <p className="mt-4 text-xs tracking-wide text-muted/80">{c.timeline}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

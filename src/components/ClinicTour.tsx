import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VideoPlayer } from "./VideoPlayer";
import { Reveal, SafeImage, SectionHeading, cx } from "./ui";
import { MEDIA, TOUR_SCENES } from "../data/content";

export default function ClinicTour() {
  const [index, setIndex] = useState(0);
  const scene = TOUR_SCENES[index];

  return (
    <section id="tour" className="relative bg-cream py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Clinic Tour"
            title="Step inside our studio."
            description="Warm reception, calm treatment suites and considered design. Play the tour film or browse the rooms below."
          />
        </div>

        <Reveal className="mt-14">
          <VideoPlayer
            src={MEDIA.tourVideo}
            poster={MEDIA.tourPoster}
            title="The CRAFTLAND DENTAL studio tour"
            caption="Reception, treatment suites and equipment"
            aspect="aspect-video"
            className="shadow-[0_40px_80px_-50px_rgba(17,36,25,0.6)]"
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between gap-8 lg:col-span-4">
            <div role="tablist" aria-label="Clinic areas" className="flex flex-col gap-2">
              {TOUR_SCENES.map((s, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={s.label}
                    role="tab"
                    id={`tour-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls="tour-panel"
                    type="button"
                    onClick={() => setIndex(i)}
                    className={cx(
                      "group flex min-h-14 items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-500",
                      isActive
                        ? "border-forest bg-forest text-ivory"
                        : "border-forest/12 bg-transparent text-forest-deep hover:border-gold/60 hover:bg-champagne/50"
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span className={cx("font-serif text-lg italic", isActive ? "text-gold-soft" : "text-gold")}>
                        0{i + 1}
                      </span>
                      <span className="text-sm font-semibold tracking-wide">{s.label}</span>
                    </span>
                    <span
                      className={cx(
                        "h-px w-8 origin-left transition-all duration-700",
                        isActive ? "scale-x-100 bg-gold-soft" : "scale-x-50 bg-forest/25 group-hover:bg-gold"
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <p className="font-serif text-2xl leading-snug text-forest-deep lg:text-3xl">{scene.title}.</p>
          </div>

          <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${index}`} className="lg:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-champagne sm:aspect-[16/10]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.label}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <SafeImage src={scene.image} alt={`${scene.label}: ${scene.title}`} label={scene.label} className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
              <span className="absolute left-5 top-5 z-10 rounded-full bg-cream/90 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-forest backdrop-blur">
                {scene.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

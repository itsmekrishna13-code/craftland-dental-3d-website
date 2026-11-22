import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Reveal, SafeImage, SectionHeading, CountUp, cx } from "./ui";
import { TESTIMONIALS } from "../data/content";

const variants = {
  enter: (d: number) => ({ x: d > 0 ? 70 : -70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -70 : 70, opacity: 0 }),
};

export default function Testimonials() {
  const total = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (step: number) => {
      setDir(step);
      setIndex((i) => (i + step + total) % total);
    },
    [total]
  );

  // Autoplay (disabled for reduced-motion users and while hovered/focused).
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(t);
  }, [paused, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 500) go(-1);
  };

  const t = TESTIMONIALS[index];
  const average = TESTIMONIALS.reduce((sum, r) => sum + r.rating, 0) / total;

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-champagne/60 py-24 sm:py-32 lg:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full border border-gold/20"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Patient Testimonials" title="Words from our patients." />
          <Reveal delay={0.2} className="mt-10">
            <p className="font-serif text-7xl leading-none text-forest-deep">
              <CountUp to={Number(average.toFixed(1))} decimals={1} duration={1.8} />
            </p>
            <div className="mt-4 flex gap-1" aria-label={`Average rating ${average.toFixed(1)} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cx("h-5 w-5", i < Math.round(average) ? "fill-gold text-gold" : "text-gold/30")} />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">Average of sample reviews shown here</p>
          </Reveal>

          <div className="mt-12 hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/25 text-forest transition-colors hover:bg-forest hover:text-ivory"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/25 text-forest transition-colors hover:bg-forest hover:text-ivory"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-cream p-8 shadow-[0_40px_80px_-50px_rgba(17,36,25,0.45)] sm:p-14">
              <Quote aria-hidden className="absolute right-8 top-8 h-16 w-16 text-gold/20 sm:right-12 sm:top-12" />

              <div className="min-h-[330px] sm:min-h-[300px]">
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <m.div
                    key={t.id}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={onDragEnd}
                    className="cursor-grab touch-pan-y active:cursor-grabbing"
                    aria-live="polite"
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cx("h-4 w-4", i < t.rating ? "fill-gold text-gold" : "text-gold/30")}
                        />
                      ))}
                    </div>
                    <blockquote className="mt-7 font-serif text-2xl italic leading-snug text-forest-deep sm:text-[1.9rem] text-pretty">
                      “{t.text}”
                    </blockquote>
                    <div className="mt-9 flex items-center gap-4">
                      <SafeImage
                        src={t.image}
                        alt={`Sample portrait for ${t.name}`}
                        label={t.name}
                        className="h-14 w-14 rounded-full ring-4 ring-champagne"
                      />
                      <div>
                        <p className="font-semibold text-forest-deep">{t.name}</p>
                        <p className="text-sm text-muted">{t.treatment}</p>
                      </div>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-forest/10 pt-7">
                <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
                  {TESTIMONIALS.map((r, i) => (
                    <button
                      key={r.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Show testimonial from ${r.name}`}
                      onClick={() => go(i - index)}
                      className="flex h-11 w-7 items-center justify-center"
                    >
                      <span
                        className={cx(
                          "h-1.5 rounded-full transition-all duration-500",
                          i === index ? "w-7 bg-gold" : "w-1.5 bg-forest/25 hover:bg-forest/50"
                        )}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-gold/40 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold">
                    Sample · demo content
                  </span>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous testimonial"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest lg:hidden"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next testimonial"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest lg:hidden"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
          <p className="mt-5 text-xs leading-relaxed text-muted/80">
            Testimonials are illustrative placeholders written for demonstration purposes and do not represent real patients.
          </p>
        </div>
      </div>
    </section>
  );
}

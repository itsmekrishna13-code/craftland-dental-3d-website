import { lazy, Suspense, useRef, useState } from "react";
import { useInView, useScroll, useTransform } from "framer-motion";
import { Layers } from "lucide-react";
import type { LayerVisibility } from "./three/DentalScenes";
import { Reveal, SectionHeading, cx } from "./ui";

// Defer the heavy Three.js bundle until this section is close to the viewport.
const AnatomyScene = lazy(() => import("./three/DentalScenes").then((m) => ({ default: m.AnatomyScene })));

const LAYERS: { key: keyof LayerVisibility; label: string; text: string }[] = [
  {
    key: "enamel",
    label: "Enamel",
    text: "The hardest, outermost layer. Translucent and mineralised, it defines the brilliance and colour of your smile.",
  },
  {
    key: "dentin",
    label: "Dentin",
    text: "A living, warmer layer beneath the enamel that gives teeth their natural depth and shade.",
  },
  {
    key: "pulp",
    label: "Pulp",
    text: "The soft core of nerves and vessels. Understanding it is what makes root canal therapy so effective.",
  },
];

export default function DentalExperience() {
  const ref = useRef<HTMLElement>(null);
  const sceneWrapRef = useRef<HTMLDivElement>(null);
  const sceneInView = useInView(sceneWrapRef, { once: true, margin: "300px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Scroll-linked rotation: the anatomy turns as you move through the section.
  const scrollSpin = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [layers, setLayers] = useState<LayerVisibility>({ enamel: true, dentin: true, pulp: true });
  const toggle = (key: keyof LayerVisibility) => setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  const visibleCount = Object.values(layers).filter(Boolean).length;

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden bg-forest-deep py-24 text-ivory sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(50%_45%_at_72%_50%,rgba(45,79,65,0.9)_0%,transparent_70%),radial-gradient(40%_35%_at_10%_10%,rgba(184,152,94,0.14)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="light"
            eyebrow="The 3D Dental Experience"
            title="Explore the anatomy of a perfect tooth."
            description="Peel back the layers of a molar and see how enamel, dentin and pulp work together. Drag to rotate, and toggle each layer to explore it on its own."
          />

          <div className="mt-12 space-y-3" role="group" aria-label="Anatomy layers">
            {LAYERS.map((layer, i) => {
              const on = layers[layer.key];
              return (
                <Reveal key={layer.key} delay={0.1 + i * 0.08}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(layer.key)}
                    className={cx(
                      "group flex w-full items-start gap-5 rounded-2xl border p-5 text-left transition-all duration-500 sm:p-6",
                      on
                        ? "border-gold/50 bg-ivory/[0.06]"
                        : "border-ivory/10 bg-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <span
                      className={cx(
                        "mt-1 flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors duration-500",
                        on ? "bg-gold" : "bg-ivory/20"
                      )}
                    >
                      <span
                        className={cx(
                          "h-4 w-4 rounded-full bg-ivory shadow transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          on ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-3">
                        <span className="font-serif text-2xl">{layer.label}</span>
                        <span className="text-[0.62rem] tracking-[0.25em] text-gold-soft">0{i + 1}</span>
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-ivory/65">{layer.text}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="lg:col-span-7" delay={0.15}>
          <div className="relative mx-auto aspect-square w-full max-w-[600px]">
            <div
              aria-hidden
              className="absolute inset-[6%] rounded-full border border-gold/20 shadow-[inset_0_0_120px_rgba(184,152,94,0.08)]"
            />
            <div aria-hidden className="absolute inset-[18%] rounded-full border border-ivory/5" />
            <div ref={sceneWrapRef} className="absolute inset-0 cursor-grab active:cursor-grabbing">
              {sceneInView && (
                <Suspense fallback={null}>
                  <AnatomyScene layers={layers} progress={scrollSpin} />
                </Suspense>
              )}
            </div>

            <div className="glass absolute left-3 top-3 flex items-center gap-2 rounded-full px-4 py-2 text-[0.7rem] font-medium tracking-wide text-forest-deep sm:left-6 sm:top-6">
              <Layers className="h-3.5 w-3.5 text-gold" />
              {visibleCount} of 3 layers visible
            </div>
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 sm:bottom-6">
              Drag to rotate · Scroll to spin
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

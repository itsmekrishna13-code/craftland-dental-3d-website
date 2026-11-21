import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button, Reveal, SectionHeading, cx } from "./ui";
import { FAQS } from "../data/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Everything you wanted to ask."
            description="Clear answers to the questions we hear most often. If yours isn't here, our team is always happy to help."
          />
          <Reveal delay={0.25} className="mt-10">
            <Button href="#contact" variant="secondary">
              Ask Our Team
            </Button>
          </Reveal>
        </div>

        <div className="divide-y divide-forest/10 border-y border-forest/10 lg:col-span-7">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={(i % 4) * 0.05}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                  >
                    <span
                      className={cx(
                        "font-serif text-xl leading-snug transition-colors duration-300 sm:text-2xl",
                        isOpen ? "text-gold" : "text-forest-deep group-hover:text-forest-mid"
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cx(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isOpen ? "rotate-45 border-forest bg-forest text-ivory" : "border-forest/20 text-forest"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-12 text-base leading-relaxed text-muted sm:pr-16">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

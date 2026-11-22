import { m } from "framer-motion";
import { Button, Reveal, SafeImage, SplitWords } from "./ui";
import { MEDIA, SITE } from "../data/content";
import { Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-36 lg:py-44">
      <m.div
        aria-hidden
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <SafeImage src={MEDIA.ctaBg} alt="" className="h-full w-full" />
      </m.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-forest-deep/85" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_50%_0%,rgba(184,152,94,0.22),transparent_70%)]"
      />

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">Your Journey Begins Today</p>
        </Reveal>

        <h2 className="mt-7 font-serif text-[2.9rem] leading-[1.02] text-ivory sm:text-7xl lg:text-[6rem]">
          <SplitWords as="span" text="Your Perfect Smile" className="block" />
          <SplitWords as="span" text="Starts Here." className="block italic text-gold-soft" delay={0.3} />
        </h2>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ivory/75 sm:text-lg text-pretty">
            Book a consultation with the CRAFTLAND DENTAL team. We will listen, plan carefully and design a path to a
            smile you are proud to share.
          </p>
        </Reveal>

        <Reveal delay={0.45} className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <Button href="#contact" variant="light" magnetic>
            Book Your Appointment
          </Button>
          <a
            href={SITE.phoneHref}
            className="inline-flex min-h-12 items-center gap-2.5 text-sm font-medium text-ivory/85 transition-colors hover:text-gold-soft"
          >
            <Phone className="h-4 w-4 text-gold-soft" /> or call {SITE.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

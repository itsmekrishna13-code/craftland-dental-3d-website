import { motion } from "framer-motion";
import { VideoPlayer } from "./VideoPlayer";
import { Reveal, SafeImage, SectionHeading } from "./ui";
import { MEDIA, TECHNOLOGY } from "../data/content";

export default function Technology() {
  return (
    <section id="technology" className="relative bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Technology"
          title="Advanced tools, quietly used."
          description="Precision equipment does the heavy lifting so you can focus on comfort. Explore the technology behind every visit."
        />

        <Reveal className="mt-14">
          <VideoPlayer
            src={MEDIA.techVideo}
            poster={MEDIA.techPoster}
            title="Dental technology showcase"
            caption="Instruments and equipment in use"
            aspect="aspect-[16/10] sm:aspect-video"
            className="shadow-[0_40px_80px_-50px_rgba(17,36,25,0.6)]"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGY.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.08} className="h-full">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-cream transition-shadow duration-700 hover:shadow-[0_30px_60px_-40px_rgba(17,36,25,0.5)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeImage
                    src={t.image}
                    alt={`${t.title} equipment photograph`}
                    label={t.title}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-ivory shadow-lg transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                    <t.icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-2xl leading-tight text-forest-deep">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{t.text}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

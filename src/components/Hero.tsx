import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button, CountUp, Reveal, SplitWords } from "./ui";
import { MEDIA, STATS } from "../data/content";

// Three.js is a heavy dependency: load it only after the page settles, and
// never on small screens (a static poster is used there instead).
const HeroScene = lazy(() => import("./three/DentalScenes").then((m) => ({ default: m.HeroScene })));

function HeroPoster() {
  return (
    <img
      src={MEDIA.heroPoster}
      alt=""
      aria-hidden="true"
      width={760}
      height={867}
      decoding="async"
      className="h-full w-full object-contain"
    />
  );
}

const PARTICLES = [
  { top: "14%", left: "6%", size: 6, delay: 0 },
  { top: "28%", left: "44%", size: 4, delay: 1.2 },
  { top: "62%", left: "12%", size: 8, delay: 2.1 },
  { top: "18%", left: "78%", size: 5, delay: 0.6 },
  { top: "74%", left: "48%", size: 4, delay: 2.8 },
  { top: "86%", left: "90%", size: 6, delay: 1.7 },
  { top: "40%", left: "93%", size: 3, delay: 3.2 },
  { top: "52%", left: "36%", size: 3, delay: 0.9 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setShow3D(true);
    };
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(enable, { timeout: 2500 });
      } else {
        window.setTimeout(enable, 1200);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
    };
  }, [isMobile]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24"
    >
      {/* Atmospheric background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(55%_50%_at_78%_42%,#EEF2E9_0%,transparent_70%),radial-gradient(45%_40%_at_8%_95%,#F2E6D0_0%,transparent_70%)]"
      />
      {/* Hidden on mobile — don't even request the video there (6 MB download). */}
      {!isMobile && (
        <video
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.16] grayscale md:block"
          src={MEDIA.heroVideo}
          poster={MEDIA.heroVideoPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ivory via-ivory/85 to-ivory/30" />

      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animate-float absolute rounded-full bg-gold-soft/70 shadow-[0_0_18px_rgba(217,195,149,0.8)]"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${6 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-6">
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-6">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-forest/15 bg-cream/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-forest">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-gold" />
                <span className="relative h-2 w-2 rounded-full bg-gold" />
              </span>
              Premium Cosmetic &amp; Restorative Studio
            </div>
          </Reveal>

          <h1 className="mt-8 font-serif text-[3.1rem] leading-[0.98] text-forest-deep sm:text-7xl lg:text-[5.4rem] xl:text-[6.2rem]">
            <SplitWords as="span" text="Your Smile," className="block" />
            <SplitWords as="span" text="Crafted to" className="block" delay={0.2} />
            <SplitWords as="span" text="Perfection." className="block italic text-gold" delay={0.4} />
          </h1>

          <Reveal delay={0.5}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg text-pretty">
              Welcome to <span className="font-semibold text-forest">CRAFTLAND DENTAL</span> — a boutique dental studio where
              advanced technology, artistry and patient-first care come together. Every treatment is planned around your
              face, your goals and your comfort.
            </p>
          </Reveal>

          <Reveal delay={0.65} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#contact" magnetic>
              Book an Appointment
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Button>
            <Button href="#treatments" variant="secondary">
              Explore Our Treatments
            </Button>
          </Reveal>

          <Reveal delay={0.8} className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-forest/10 pt-8 sm:gap-8">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl text-forest-deep sm:text-4xl">
                  <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-1 text-[0.7rem] leading-snug text-muted sm:text-xs">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </motion.div>

        <motion.div
          style={{ y: visualY }}
          className="relative h-[440px] sm:h-[580px] lg:col-span-6 lg:h-[680px]"
        >
          <div
            aria-hidden
            className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle_at_50%_40%,#FFFDF8_0%,#F0F3EA_42%,rgba(230,215,189,0.25)_68%,transparent_72%)]"
          />
          <div aria-hidden className="absolute inset-[12%] rounded-full border border-gold/20" />
          <div className="absolute inset-0">
            {show3D && !isMobile ? (
              <Suspense fallback={<HeroPoster />}>
                <HeroScene />
              </Suspense>
            ) : (
              <HeroPoster />
            )}
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute left-0 top-[16%] flex items-center gap-3 rounded-2xl border border-white/60 px-4 py-3 shadow-[0_20px_50px_-30px_rgba(17,36,25,0.5)] sm:left-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">Smile preview</span>
              <span className="font-serif text-lg leading-tight text-forest-deep">Digital 3D planning</span>
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass absolute bottom-[12%] right-0 flex items-center gap-3 rounded-2xl border border-white/60 px-4 py-3 shadow-[0_20px_50px_-30px_rgba(17,36,25,0.5)] sm:right-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-soft text-forest">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">Care standard</span>
              <span className="font-serif text-lg leading-tight text-forest-deep">Hand-finished precision</span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about us"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-forest/60 transition-colors hover:text-forest md:flex"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce text-gold" />
      </a>
    </section>
  );
}

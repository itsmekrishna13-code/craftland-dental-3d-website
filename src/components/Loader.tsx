import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { LogoMark } from "./Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Elegant intro: mark scales in, wordmark rises, then the curtain lifts. */
export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(false), 1100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key="loader"
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest-deep text-ivory"
          exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        >
          <m.div
            initial={{ scale: 0.6, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <LogoMark className="h-20 w-20" />
          </m.div>

          <div className="mt-8 overflow-hidden">
            <m.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
              className="font-serif text-3xl tracking-[0.3em] sm:text-4xl"
            >
              CRAFTLAND
            </m.p>
          </div>

          <m.div
            className="mt-5 h-px w-44 origin-left bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.7, ease: EASE }}
          />
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-4 text-[0.65rem] font-semibold tracking-[0.5em] text-gold-soft"
          >
            DENTAL
          </m.p>
        </m.div>
      )}
    </AnimatePresence>
  );
}

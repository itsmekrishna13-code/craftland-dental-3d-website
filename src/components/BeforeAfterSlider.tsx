import { useRef } from "react";
import {
  animate,
  m,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage, cx } from "./ui";
import { useEffect, useState } from "react";

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Draggable before/after comparison. Works with mouse, touch and keyboard.
 * Pointer capture keeps the drag smooth even when the cursor leaves the frame.
 */
export function BeforeAfterSlider({
  before,
  after,
  altBefore,
  altAfter,
  className,
}: {
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const touchedRef = useRef(false);
  const introRef = useRef<AnimationPlaybackControls | null>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const raw = useMotionValue(50);
  const pos = useSpring(raw, { stiffness: 300, damping: 36, mass: 0.6 });
  const [value, setValue] = useState(50);
  useMotionValueEvent(pos, "change", (v) => setValue(Math.round(v)));

  const inverse = useTransform(pos, (p) => 100 - p);
  const clipPath = useMotionTemplate`inset(0 ${inverse}% 0 0)`;
  const left = useTransform(pos, (p) => `${p}%`);

  // Gentle intro sweep so visitors immediately understand the interaction.
  useEffect(() => {
    if (!inView || touchedRef.current) return;
    introRef.current = animate(raw, [50, 24, 76, 50], { duration: 2.6, ease: "easeInOut" });
    return () => introRef.current?.stop();
  }, [inView, raw]);

  const stopIntro = () => {
    if (!touchedRef.current) {
      touchedRef.current = true;
      introRef.current?.stop();
    }
  };

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    raw.set(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stopIntro();
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) setFromClientX(e.clientX);
  };
  const endDrag = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    stopIntro();
    if (e.key === "ArrowLeft") raw.set(clamp(raw.get() - 5));
    if (e.key === "ArrowRight") raw.set(clamp(raw.get() + 5));
    if (e.key === "Home") raw.set(0);
    if (e.key === "End") raw.set(100);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cx(
        "group relative isolate cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl bg-champagne shadow-[0_30px_60px_-40px_rgba(17,36,25,0.55)]",
        className
      )}
    >
      {/* After (base layer) */}
      <div className="absolute inset-0">
        <SafeImage
          src={after}
          alt={altAfter}
          label="After · sample"
          loading="lazy"
          width={560}
          height={700}
          className="h-full w-full"
          imgClassName="pointer-events-none"
        />
      </div>

      {/* Before (clipped layer) */}
      <m.div className="absolute inset-0" style={{ clipPath }}>
        <SafeImage
          src={before}
          alt={altBefore}
          label="Before · sample"
          loading="lazy"
          width={560}
          height={700}
          className="h-full w-full"
          imgClassName="pointer-events-none"
        />
      </m.div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-forest-deep/70 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ivory backdrop-blur-sm">
        Before · Sample
      </span>
      <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-gold/90 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-forest-deep backdrop-blur-sm">
        After · Demo
      </span>

      {/* Divider line */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-10 w-[2px] -translate-x-1/2 bg-ivory shadow-[0_0_18px_rgba(255,255,255,0.7)]"
        style={{ left }}
      />

      {/* Handle */}
      <m.div
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-forest shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] transition-transform duration-300 group-active:scale-95 hover:scale-105"
        style={{ left }}
      >
        <ChevronLeft className="h-4 w-4" />
        <ChevronRight className="h-4 w-4" />
      </m.div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-ivory/85 px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-forest-deep backdrop-blur-sm">
        Drag to compare
      </div>
    </div>
  );
}

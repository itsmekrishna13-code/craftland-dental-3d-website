import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

/** Tiny className joiner. */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  duration?: number;
  immediate?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({ children, delay = 0, y = 36, className, duration = 1, immediate = false, ...rest }: RevealProps) {
  // Above-the-fold copy must paint at first render rather than waiting on an
  // IntersectionObserver-driven opacity transition.
  if (immediate) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated typography: words rise in sequence                        */
/* ------------------------------------------------------------------ */

export function SplitWords({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(" ");
  if (immediate) {
    return (
      <Tag className={className} aria-label={text}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pr-[0.25em] last:pr-0">
            <span className="inline-block">{word}</span>
          </span>
        ))}
      </Tag>
    );
  }
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pr-[0.25em] last:pr-0">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <SplitWords
        as="h2"
        text={title}
        className={cx(
          "mt-5 font-serif text-[2.6rem] leading-[1.04] sm:text-5xl lg:text-6xl text-balance",
          isLight ? "text-ivory" : "text-forest-deep"
        )}
      />
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cx(
              "mt-6 text-base leading-relaxed sm:text-lg text-pretty",
              isLight ? "text-ivory/75" : "text-muted"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic hover wrapper                                             */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={cx("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "light" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  magnetic?: boolean;
  ariaLabel?: string;
  size?: "md" | "sm";
};

const BTN_BASE =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-60";

const BTN_VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-forest text-ivory shadow-[0_18px_40px_-20px_rgba(17,36,25,0.8)] hover:bg-forest-deep hover:shadow-[0_24px_50px_-18px_rgba(17,36,25,0.9)]",
  secondary: "border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-ivory",
  light: "bg-ivory text-forest hover:bg-champagne",
  ghost: "text-forest underline-offset-8 hover:underline px-0 py-2 min-h-0",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled,
  magnetic = false,
  ariaLabel,
  size = "md",
}: ButtonProps) {
  const content = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </>
  );
  const sizeCls =
    size === "sm" ? "min-h-11 px-5 py-2.5 text-[0.8rem]" : "min-h-12 px-7 py-3.5 text-sm";
  const classes = cx(BTN_BASE, sizeCls, BTN_VARIANTS[variant], className);

  const element =
    href !== undefined ? (
      <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    ) : (
      <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
        {content}
      </button>
    );

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}

/* ------------------------------------------------------------------ */
/*  Images with graceful fallback + reveal                             */
/* ------------------------------------------------------------------ */

export function SafeImage({
  src,
  alt,
  className,
  imgClassName,
  label,
  loading = "lazy",
  reveal = false,
  style,
  width = 1200,
  height = 900,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
  loading?: "lazy" | "eager";
  reveal?: boolean;
  style?: CSSProperties;
  width?: number;
  height?: number;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = !reveal || inView;

  return (
    <div ref={ref} className={cx("relative overflow-hidden bg-champagne", className)} style={style}>
      {status === "loading" && <div className="shimmer-bg absolute inset-0" aria-hidden />}

      {status === "error" && (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-sage-soft via-champagne to-beige text-forest"
        >
          <span className="font-serif text-4xl italic text-forest/80">CD</span>
          {label && <span className="px-4 text-center text-xs tracking-[0.2em] uppercase text-forest/60">{label}</span>}
        </div>
      )}

      {show && status !== "error" && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          initial={reveal ? { scale: 1.12, opacity: 0 } : false}
          animate={status === "loaded" ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE }}
          className={cx("h-full w-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}

/** Image that unveils with a clip-path wipe on scroll. */
export function RevealImage({ immediate = false, ...props }: Parameters<typeof SafeImage>[0] & { immediate?: boolean }) {
  // Images near the top of a section must never stay hidden behind a
  // scroll-triggered clip-path: render them eagerly with no reveal gate.
  if (immediate) {
    return (
      <div className={props.className}>
        <SafeImage {...props} className="h-full w-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.3, ease: EASE }}
      className={props.className}
    >
      <SafeImage {...props} className="h-full w-full" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

export function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 2.2,
  className,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const format = (v: number) =>
      decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = format(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

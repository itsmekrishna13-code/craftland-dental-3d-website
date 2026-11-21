import { cx } from "./ui";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cx("h-10 w-10 shrink-0", className)} aria-hidden>
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="#B8985E" strokeWidth="1" />
      <circle cx="24" cy="24" r="18" fill="#1E3A2F" />
      <path
        d="M24 12.5c-1.6 0-2.7.7-3.9.7-1.5 0-2.4-.9-3.7-.9-2.7 0-4.7 2.6-4.7 6.6 0 3.3 1.3 5.6 2 8.2.6 2.1 1.3 7.4 3.8 7.4 2 0 2.6-3.2 3.8-3.2s1.8 3.2 3.8 3.2c2.5 0 3.2-5.3 3.8-7.4.7-2.6 2-4.9 2-8.2 0-4-2-6.6-4.7-6.6-1.3 0-2.2.9-3.7.9-1.2 0-2.3-.7-3.9-.7Z"
        fill="#FAF6EE"
      />
      <path d="M19.5 17.5c1.2-.5 2.8-.4 4.5 0" fill="none" stroke="#D9C395" strokeWidth="1" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}

export function Logo({
  light = false,
  compact = false,
  className,
}: {
  light?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#home"
      aria-label="CRAFTLAND DENTAL — back to top"
      className={cx("group inline-flex items-center gap-3", className)}
    >
      <LogoMark className="transition-transform duration-700 group-hover:rotate-[12deg]" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cx(
              "font-serif text-[1.3rem] font-semibold tracking-[0.2em] sm:text-[1.4rem]",
              light ? "text-ivory" : "text-forest-deep"
            )}
          >
            CRAFTLAND
          </span>
          <span className="mt-1.5 text-[0.6rem] font-semibold tracking-[0.46em] text-gold">DENTAL</span>
        </span>
      )}
    </a>
  );
}

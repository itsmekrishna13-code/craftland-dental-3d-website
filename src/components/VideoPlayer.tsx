import { useState } from "react";
import { Play } from "lucide-react";
import { SafeImage, cx } from "./ui";

/**
 * Poster-first video player. The heavy video file is only requested once the
 * visitor presses play, keeping the page light on mobile and slow connections.
 */
export function VideoPlayer({
  src,
  poster,
  title,
  caption,
  className,
  aspect = "aspect-video",
}: {
  src: string;
  poster: string;
  title: string;
  caption?: string;
  className?: string;
  aspect?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cx("group relative isolate overflow-hidden rounded-3xl bg-forest-deep", aspect, className)}>
      {playing && !failed ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          aria-label={title}
          onEnded={() => setPlaying(false)}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <SafeImage
            src={poster}
            alt={title}
            label={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            imgClassName="transition-transform duration-[2.4s] ease-out group-hover:scale-[1.04]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/10 to-transparent" />

          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-forest shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 sm:h-24 sm:w-24"
          >
            <span aria-hidden className="animate-pulse-ring absolute inset-0 rounded-full border border-ivory/80" />
            <Play className="relative ml-1 h-7 w-7 fill-forest" />
          </button>

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-ivory sm:inset-x-8 sm:bottom-7">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold-soft">
                Sample film · demo footage
              </p>
              <p className="mt-1 font-serif text-2xl leading-tight sm:text-3xl">{title}</p>
              {caption && <p className="mt-1 hidden text-sm text-ivory/75 sm:block">{caption}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

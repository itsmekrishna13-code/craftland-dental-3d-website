import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Accessible dialog: Escape to close, focus moves inside, background scroll locked. */
export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  id = "modal-title",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  id?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevModalOpen = document.body.dataset.modalOpen;
    document.body.style.overflow = "hidden";
    document.body.dataset.modalOpen = "true";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      if (prevModalOpen === undefined) delete document.body.dataset.modalOpen;
      else document.body.dataset.modalOpen = prevModalOpen;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Sections use `content-visibility: auto`, which makes them a containing
  // block for fixed children and traps their z-index in a local stacking
  // context. Portalling to body keeps the dialog viewport-fixed and above the
  // navbar, floating actions and loader.
  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[120] flex items-end justify-center pt-[4.5rem] sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-forest-deep/60 backdrop-blur-sm"
          />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={id}
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:max-w-2xl sm:rounded-3xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest hover:text-ivory sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="shrink-0 px-6 pt-6 sm:px-10 sm:pt-10">
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h3 id={id} className="mt-3 pr-12 font-serif text-3xl leading-tight text-forest-deep sm:text-4xl">
                {title}
              </h3>
            </div>
            <div className="overflow-y-auto overscroll-contain px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 sm:px-10 sm:pb-10 sm:pt-6">
              {children}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

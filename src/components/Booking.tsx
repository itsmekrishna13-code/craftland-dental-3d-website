import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button, Reveal, SectionHeading, SafeImage, cx } from "./ui";
import { HOURS, MEDIA, SITE, TREATMENTS } from "../data/content";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = { name: "", email: "", phone: "", treatment: "", date: "", time: "", message: "" };

const TIME_SLOTS = Array.from({ length: 22 }, (_, i) => {
  const mins = 8 * 60 + i * 30;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
});

const formatTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
};

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  const name = v.name.trim();
  if (name.length < 2) e.name = "Please enter your full name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "");
  if (!/^\+?[0-9\s()-]{7,20}$/.test(v.phone.trim()) || digits.length < 7 || digits.length > 15)
    e.phone = "Please enter a valid phone number (7–15 digits).";
  if (!v.treatment) e.treatment = "Please choose a preferred treatment.";
  if (!v.date) {
    e.date = "Please choose a preferred date.";
  } else {
    const day = new Date(`${v.date}T12:00:00`);
    if (v.date < todayISO()) e.date = "Please choose today or a future date.";
    else if (day.getDay() === 0) e.date = "We're closed on Sundays. Please choose another day.";
  }
  if (!v.time || !TIME_SLOTS.includes(v.time)) e.time = "Please choose a preferred time.";
  if (v.message.length > 500) e.message = "Please keep your message under 500 characters.";
  return e;
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cx("block", className)}>
      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-forest/70">{label}</span>
      <div className="mt-2">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-1.5 text-xs text-red-700"
          >
            <AlertCircle className="h-3.5 w-3.5" /> {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

const inputClass = (hasError: boolean) =>
  cx(
    "w-full min-h-12 rounded-none border-0 border-b bg-transparent px-0 py-3 text-base text-forest-deep placeholder:text-muted/50 transition-colors duration-300 focus:border-gold focus:outline-none focus:ring-0",
    hasError ? "border-red-700/60" : "border-forest/20"
  );

export default function Booking() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const update = (key: keyof FormValues) => (e: { target: { value: string } }) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (errors[key]) setErrors(validate(next));
  };

  const blur = (key: keyof FormValues) => () => {
    setErrors((prev) => ({ ...prev, [key]: validate(values)[key] }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = (Object.keys(EMPTY) as (keyof FormValues)[]).find((k) => found[k]);
    if (firstKey) {
      (e.currentTarget.elements.namedItem(firstKey) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("submitting");
    // Frontend-only demo: no request leaves the browser. Connect an endpoint here to go live.
    window.setTimeout(() => {
      setSubmitted(values);
      setStatus("success");
    }, 1400);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setSubmitted(null);
    setStatus("idle");
  };

  return (
    <section id="contact" className="relative bg-cream py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Info panel */}
        <div className="relative overflow-hidden rounded-3xl bg-forest-deep p-8 text-ivory sm:p-12 lg:col-span-5">
          <div aria-hidden className="absolute inset-0 opacity-25">
            <SafeImage src={MEDIA.receptionPhoto} alt="" className="h-full w-full" imgClassName="mix-blend-luminosity" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-forest-deep/80 to-forest-deep" />

          <div className="relative">
            <p className="eyebrow">Book Your Visit</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl text-balance">Begin with a conversation.</h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/75">
              Share a few details and choose a preferred time. Our coordinators will confirm your appointment and help you
              prepare for your first visit.
            </p>

            <ul className="mt-12 space-y-7">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
                <span className="text-sm leading-relaxed text-ivory/85">{SITE.address}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
                <span className="text-sm leading-relaxed text-ivory/85">
                  <a href={SITE.phoneHref} className="transition-colors hover:text-gold-soft">{SITE.phone}</a>
                  <br />
                  <span className="text-ivory/55">Emergency: {SITE.emergency}</span>
                </span>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
                <a href={`mailto:${SITE.email}`} className="break-all text-sm text-ivory/85 transition-colors hover:text-gold-soft">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
                <span className="space-y-1.5 text-sm text-ivory/85">
                  {HOURS.map((h) => (
                    <span key={h.day} className="flex justify-between gap-6">
                      <span>{h.day}</span>
                      <span className="text-ivory/60">{h.time}</span>
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Appointment Booking"
            title="Request your appointment."
            description="Fields marked by validation will guide you as you go. Your details are only checked in this demo and are not sent to a clinic."
          />

          <Reveal delay={0.1} className="mt-12">
            <AnimatePresence mode="wait">
              {status === "success" && submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  role="status"
                  className="rounded-3xl border border-gold/40 bg-champagne/50 p-8 sm:p-10"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest text-ivory">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="mt-7 font-serif text-3xl text-forest-deep sm:text-4xl">
                    Thank you, {submitted.name.trim().split(" ")[0]}.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    Your request for <strong className="text-forest-deep">{submitted.treatment}</strong> on{" "}
                    <strong className="text-forest-deep">{submitted.date}</strong> at{" "}
                    <strong className="text-forest-deep">{formatTime(submitted.time)}</strong> has been validated. A
                    coordinator would confirm by email at <strong className="text-forest-deep">{submitted.email}</strong>.
                  </p>
                  <p className="mt-5 rounded-xl bg-cream/80 p-4 text-xs leading-relaxed text-muted">
                    <strong className="text-forest-deep">Demo mode:</strong> this website front end does not transmit
                    bookings. Connect a booking backend or form service to receive real requests.
                  </p>
                  <div className="mt-8">
                    <Button variant="secondary" onClick={reset}>
                      Submit Another Request
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-label="Appointment request form"
                  className="grid gap-x-8 gap-y-9 sm:grid-cols-2"
                >
                  <Field label="Patient name" error={errors.name}>
                    <input
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={update("name")}
                      onBlur={blur("name")}
                      placeholder="Jane Doe"
                      aria-invalid={!!errors.name}
                      className={inputClass(!!errors.name)}
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={update("email")}
                      onBlur={blur("email")}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      className={inputClass(!!errors.email)}
                    />
                  </Field>
                  <Field label="Phone number" error={errors.phone}>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={update("phone")}
                      onBlur={blur("phone")}
                      placeholder="+1 (555) 000-0000"
                      aria-invalid={!!errors.phone}
                      className={inputClass(!!errors.phone)}
                    />
                  </Field>
                  <Field label="Preferred treatment" error={errors.treatment}>
                    <select
                      name="treatment"
                      value={values.treatment}
                      onChange={update("treatment")}
                      onBlur={blur("treatment")}
                      aria-invalid={!!errors.treatment}
                      className={cx(inputClass(!!errors.treatment), "pr-6")}
                    >
                      <option value="">Select a treatment</option>
                      {TREATMENTS.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                      <option value="Not sure yet">Not sure yet — advise me</option>
                    </select>
                  </Field>
                  <Field label="Preferred date" error={errors.date}>
                    <input
                      name="date"
                      type="date"
                      min={todayISO()}
                      value={values.date}
                      onChange={update("date")}
                      onBlur={blur("date")}
                      aria-invalid={!!errors.date}
                      className={inputClass(!!errors.date)}
                    />
                  </Field>
                  <Field label="Preferred time" error={errors.time}>
                    <select
                      name="time"
                      value={values.time}
                      onChange={update("time")}
                      onBlur={blur("time")}
                      aria-invalid={!!errors.time}
                      className={cx(inputClass(!!errors.time), "pr-6")}
                    >
                      <option value="">Select a time</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {formatTime(t)}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Message (optional)" error={errors.message} className="sm:col-span-2">
                    <textarea
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={update("message")}
                      onBlur={blur("message")}
                      placeholder="Tell us about your goals, concerns or questions."
                      aria-invalid={!!errors.message}
                      className={cx(inputClass(!!errors.message), "resize-none")}
                    />
                    <span className="mt-1 block text-right text-[0.65rem] text-muted/70">{values.message.length}/500</span>
                  </Field>

                  <div className="sm:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-relaxed text-muted sm:max-w-xs">
                      By submitting, you agree to be contacted about your request. We never share your details.
                    </p>
                    <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
                      {status === "submitting" ? "Submitting…" : "Submit Appointment Request"}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

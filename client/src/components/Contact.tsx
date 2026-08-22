/* NOIR KINETIC — contact + footer: giant CTA type, inquiry form, mono contact grid,
   socials, and closing marquee. Crosshair logo mark as favicon anchor. */
import { useState, type FormEvent } from "react";
import { trpc } from "@/lib/trpc";

export const FOOTER_BRAND_MARK = "✦";
export const FOOTER_COPYRIGHT = "© 2026 Andre Astika — Bali, Indonesia";
export const INQUIRY_EMAIL = "en.andre.st@gmail.com";

export type InquiryDraft = {
  name: string;
  email: string;
  project: string;
  message: string;
};

type InquiryFieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMPTY_INQUIRY: InquiryDraft = { name: "", email: "", project: "", message: "" };

export function capitalizeInquiryValue(value: string) {
  const trimmed = value.trim();
  return trimmed ? `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}` : trimmed;
}

export function normalizeInquiryEmail(value: string) {
  return value.trim().toLowerCase();
}

export function buildInquiryMailto(draft: InquiryDraft) {
  const name = capitalizeInquiryValue(draft.name) || "A new visitor";
  const email = normalizeInquiryEmail(draft.email) || "Not provided";
  const project = capitalizeInquiryValue(draft.project) || "Not specified";
  const message = capitalizeInquiryValue(draft.message) || "Not provided";
  const subject = `Project inquiry from ${name}`;
  const body = [
    "Hello Andre,",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${project}`,
    "",
    "Message:",
    message,
  ].join("\n");

  return `mailto:${INQUIRY_EMAIL}?${new URLSearchParams({ subject, body }).toString()}`;
}

export function getInquiryClientErrors(draft: InquiryDraft): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {};
  if (!draft.name.trim()) errors.name = "Please enter your name.";
  if (!draft.email.trim() || !/^\S+@\S+\.\S+$/.test(draft.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!draft.message.trim()) errors.message = "Please share a few project details.";
  return errors;
}

export const SOCIALS = [
  { label: "Email", href: `mailto:${INQUIRY_EMAIL}`, value: INQUIRY_EMAIL },
  { label: "Web", href: "https://andre-astika.github.io/portfolio/", value: "andre-astika.github.io/portfolio", external: true },
  { label: "Location", href: "#contact", value: "Bali, Indonesia" },
];

export default function Contact() {
  const [inquiry, setInquiry] = useState<InquiryDraft>(EMPTY_INQUIRY);
  const [honeypot, setHoneypot] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [fieldErrors, setFieldErrors] = useState<InquiryFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "validation" | "success" | "error">("idle");
  const isGitHubPagesBuild = import.meta.env.VITE_GITHUB_PAGES === "true";
  const mailtoHref = buildInquiryMailto(inquiry);
  const inquiryMutation = trpc.inquiry.submit.useMutation({
    onSuccess: () => {
      setInquiry(EMPTY_INQUIRY);
      setHoneypot("");
      setFormStartedAt(Date.now());
      setStatus("success");
    },
    onError: () => setStatus("error"),
  });

  const updateInquiry = (field: keyof InquiryDraft, value: string) => {
    setInquiry((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  };

  const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = getInquiryClientErrors(inquiry);
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      setStatus("validation");
      return;
    }

    setStatus("idle");
    inquiryMutation.mutate({ ...inquiry, honeypot, formStartedAt });
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="container py-24 md:py-36">
        <p className="reveal font-label mb-4 text-[11px] uppercase tracking-[0.35em] text-white/45">
          (Contact) — Available for new projects
        </p>
        <h2 className="reveal font-display text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white md:text-[7.5rem]">
          Let's build
          <br />
          <span className="text-stroke">something bold.</span>
        </h2>

        <form
          noValidate
          onSubmit={handleInquirySubmit}
          className="reveal relative mt-12 border border-white/10 bg-[oklch(0.13_0_0)] p-6 md:mt-16 md:p-8"
        >
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/45">Quick inquiry</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">Tell me about the project.</h3>
            </div>
            <p className="font-label text-[9px] uppercase tracking-[0.2em] text-white/35">
              {isGitHubPagesBuild ? "Securely sends via Andre's form" : "Securely sends to Andre"}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="font-label text-[9px] uppercase tracking-[0.24em] text-white/45">Your name</span>
              <input
                required
                value={inquiry.name}
                onChange={(event) => updateInquiry("name", event.target.value)}
                className="h-12 border border-white/15 bg-transparent px-4 font-label text-xs uppercase tracking-[0.12em] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/60"
                placeholder="Name"
                autoComplete="name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "inquiry-name-error" : undefined}
              />
              {fieldErrors.name && <span id="inquiry-name-error" className="font-label text-[10px] text-white/55">{fieldErrors.name}</span>}
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-label text-[9px] uppercase tracking-[0.24em] text-white/45">Email</span>
              <input
                required
                type="email"
                value={inquiry.email}
                onChange={(event) => updateInquiry("email", event.target.value)}
                className="h-12 border border-white/15 bg-transparent px-4 font-label text-xs tracking-[0.04em] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/60"
                placeholder="you@company.com"
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "inquiry-email-error" : undefined}
              />
              {fieldErrors.email && <span id="inquiry-email-error" className="font-label text-[10px] text-white/55">{fieldErrors.email}</span>}
            </label>
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="font-label text-[9px] uppercase tracking-[0.24em] text-white/45">Project type</span>
              <input
                value={inquiry.project}
                onChange={(event) => updateInquiry("project", event.target.value)}
                className="h-12 border border-white/15 bg-transparent px-4 font-label text-xs uppercase tracking-[0.12em] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/60"
                placeholder="Website, brand identity, or digital product"
              />
            </label>
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="font-label text-[9px] uppercase tracking-[0.24em] text-white/45">Project details</span>
              <textarea
                required
                value={inquiry.message}
                onChange={(event) => updateInquiry("message", event.target.value)}
                className="min-h-32 resize-y border border-white/15 bg-transparent px-4 py-3 font-label text-xs leading-relaxed tracking-[0.04em] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/60"
                placeholder="What are you looking to build?"
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? "inquiry-message-error" : undefined}
              />
              {fieldErrors.message && <span id="inquiry-message-error" className="font-label text-[10px] text-white/55">{fieldErrors.message}</span>}
            </label>
          </div>

          <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="inquiry-company-website">Company website</label>
            <input
              id="inquiry-company-website"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            data-cursor
            data-cursor-label="SEND"
            disabled={inquiryMutation.isPending}
            className="contact-inquiry-submit font-label mt-6 inline-flex items-center gap-3 px-7 py-4 text-xs font-medium uppercase tracking-[0.24em] transition-all duration-200 active:scale-[0.97] disabled:cursor-wait disabled:opacity-50"
          >
            {inquiryMutation.isPending ? "Sending…" : "Send inquiry"} <span aria-hidden="true">→</span>
          </button>
          {status === "validation" && (
            <p role="alert" className="font-label mt-4 text-[10px] uppercase tracking-[0.18em] text-white/60">
              Please complete the highlighted required fields before continuing.
            </p>
          )}
          {status === "success" && (
            <p role="status" className="font-label mt-4 text-[10px] uppercase tracking-[0.18em] text-white/60">
              Thanks — your inquiry has been sent.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="font-label mt-4 text-[10px] uppercase tracking-[0.18em] text-white/60">
              Delivery could not be completed. Please try again, <a href={mailtoHref} className="underline underline-offset-4">open an email draft</a>, or use the Email card below.
            </p>
          )}
        </form>

        <div className="mt-20 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noopener noreferrer" : undefined}
              data-cursor
              className="spotlight group flex flex-col gap-4 bg-[oklch(0.13_0_0)] p-8 transition-colors duration-300 hover:bg-[oklch(0.17_0_0)]"
            >
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">
                {s.label}
              </span>
              <span className="text-sm text-white/80 transition-colors duration-300 group-hover:text-white md:text-base">
                {s.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 bg-[oklch(0.11_0_0)] py-10 md:py-14">
        <div className="flex items-center justify-between px-6 md:px-12">
          <span className="font-display text-2xl leading-none text-white" aria-hidden="true">
            {FOOTER_BRAND_MARK}
          </span>
          <span className="font-label text-right text-[9px] uppercase tracking-[0.18em] text-white/40 sm:text-[10px] sm:tracking-[0.3em]">
            {FOOTER_COPYRIGHT}
          </span>
        </div>
      </div>
    </section>
  );
}

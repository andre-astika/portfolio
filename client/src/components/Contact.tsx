/* NOIR KINETIC — contact + footer: giant CTA type, inquiry form, mono contact grid,
   socials, and closing marquee. Crosshair logo mark as favicon anchor. */
import { useState, type FormEvent } from "react";

export const FOOTER_BRAND_MARK = "✦";
export const FOOTER_COPYRIGHT = "© 2026 Andre Astika — Bali, Indonesia";
export const INQUIRY_EMAIL = "en.andre.st@gmail.com";

export type InquiryDraft = {
  name: string;
  email: string;
  project: string;
  message: string;
};

const EMPTY_INQUIRY: InquiryDraft = { name: "", email: "", project: "", message: "" };

export function buildInquiryMailto(draft: InquiryDraft) {
  const subject = `Project inquiry from ${draft.name.trim() || "a new visitor"}`;
  const body = [
    "Hello Andre,",
    "",
    `Name: ${draft.name.trim() || "Not provided"}`,
    `Email: ${draft.email.trim() || "Not provided"}`,
    `Project type: ${draft.project.trim() || "Not specified"}`,
    "",
    "Message:",
    draft.message.trim() || "Not provided",
  ].join("\n");

  return `mailto:${INQUIRY_EMAIL}?${new URLSearchParams({ subject, body }).toString()}`;
}

export const SOCIALS = [
  { label: "Email", href: `mailto:${INQUIRY_EMAIL}`, value: INQUIRY_EMAIL },
  { label: "Web", href: "https://andre.jupitragency.com", value: "andre.jupitragency.com", external: true },
  { label: "Location", href: "#contact", value: "Bali, Indonesia" },
];

export default function Contact() {
  const [inquiry, setInquiry] = useState<InquiryDraft>(EMPTY_INQUIRY);

  const updateInquiry = (field: keyof InquiryDraft, value: string) => {
    setInquiry((current) => ({ ...current, [field]: value }));
  };

  const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = buildInquiryMailto(inquiry);
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
          onSubmit={handleInquirySubmit}
          className="reveal mt-12 border border-white/10 bg-[oklch(0.13_0_0)] p-6 md:mt-16 md:p-8"
        >
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/45">Quick inquiry</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">Tell me about the project.</h3>
            </div>
            <p className="font-label text-[9px] uppercase tracking-[0.2em] text-white/35">Opens your email app</p>
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
              />
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
              />
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
              />
            </label>
          </div>

          <button
            type="submit"
            data-cursor
            data-cursor-label="SEND"
            className="contact-inquiry-submit font-label mt-6 inline-flex items-center gap-3 px-7 py-4 text-xs font-medium uppercase tracking-[0.24em] transition-all duration-200 active:scale-[0.97]"
          >
            Draft email inquiry <span aria-hidden="true">→</span>
          </button>
        </form>

        {/* contact grid */}
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

      {/* closing marquee */}
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

/* NOIR KINETIC — contact + footer: giant CTA type, inquiry form, mono contact grid,
   socials, and closing marquee. Crosshair logo mark as favicon anchor. */
import { useState, type FormEvent } from "react";
import { trpc } from "@/lib/trpc";
import { FOOTER_CHROME_CONTAINER_CLASS, FOOTER_SECTION_CLASS, SITE_CHROME_MARK_CLASS } from "@/lib/siteChrome";


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
  { label: "Web", href: "https://andre-astika.github.io/algorhythm-works/", value: "andre-astika.github.io/algorhythm-works", external: true },
  { label: "Location", href: "#contact", value: "Bali, Indonesia" },
];


export default function Contact() {
  const [inquiry, setInquiry] = useState<InquiryDraft>(EMPTY_INQUIRY);
  const [honeypot, setHoneypot] = useState("");

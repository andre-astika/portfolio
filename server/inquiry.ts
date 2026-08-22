import { createHash, randomUUID } from "node:crypto";
import { z } from "zod";
import { getResendConfig } from "./resendConfig";

export const INQUIRY_MIN_COMPLETION_MS = 3_000;

export const inquiryInputSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  project: z.string().trim().max(160),
  message: z.string().trim().min(1, "Please share a few project details.").max(5_000),
  honeypot: z.string().max(200),
  formStartedAt: z.number().int().positive(),
});

export type InquiryInput = z.infer<typeof inquiryInputSchema>;

type InquiryEmailPayload = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export function createInquiryFingerprint(ipAddress: string, userAgent: string) {
  return createHash("sha256").update(`${ipAddress}\n${userAgent}`).digest("hex");
}

export function isInquirySubmittedTooQuickly(formStartedAt: number, now = Date.now()) {
  return now - formStartedAt < INQUIRY_MIN_COMPLETION_MS;
}

export function buildInquiryEmailPayload(input: InquiryInput): InquiryEmailPayload {
  const config = getResendConfig();
  const project = input.project || "Not specified";
  const text = [
    "New portfolio inquiry",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Project type: ${project}`,
    "",
    "Project details:",
    input.message,
  ].join("\n");

  return {
    // The temporary Resend onboarding sender is accepted only as a bare
    // address. A branded display name can be restored once a custom domain
    // has been verified in Resend.
    from: config.fromEmail,
    to: [config.recipientEmail],
    reply_to: input.email,
    subject: `Portfolio inquiry — ${input.name}`,
    text,
    html: `
      <h1>New portfolio inquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(project)}</p>
      <p><strong>Project details:</strong></p>
      <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
    `.trim(),
  };
}

export async function sendInquiryEmail(input: InquiryInput) {
  const config = getResendConfig();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `portfolio-inquiry/${randomUUID()}`,
    },
    body: JSON.stringify(buildInquiryEmailPayload(input)),
  });

  if (!response.ok) {
    const responseBody: unknown = await response.json().catch(() => undefined);
    const providerMessage =
      typeof responseBody === "object" && responseBody !== null && "message" in responseBody && typeof responseBody.message === "string"
        ? responseBody.message
        : "No error message returned";
    throw new Error(`Resend rejected the inquiry email (${response.status}): ${providerMessage}`);
  }
}

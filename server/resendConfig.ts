import { ENV } from "./_core/env";

export type ResendConfigSource = {
  resendApiKey: string;
  resendFromEmail: string;
  inquiryToEmail: string;
};

export type ResendConfig = {
  apiKey: string;
  fromEmail: string;
  recipientEmail: string;
};

const SIMPLE_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getResendConfig(source: ResendConfigSource = ENV): ResendConfig {
  const apiKey = source.resendApiKey.trim();
  const fromEmail = source.resendFromEmail.trim().replace(/[.,;:]+$/, "");
  const recipientEmail = source.inquiryToEmail.trim();

  if (!apiKey.startsWith("re_")) {
    throw new Error("RESEND_API_KEY is not configured correctly");
  }

  if (!SIMPLE_EMAIL_PATTERN.test(fromEmail)) {
    throw new Error("RESEND_FROM_EMAIL must be a valid email address");
  }

  if (!SIMPLE_EMAIL_PATTERN.test(recipientEmail)) {
    throw new Error("INQUIRY_TO_EMAIL must be a valid email address");
  }

  return { apiKey, fromEmail, recipientEmail };
}

import { describe, expect, it } from "vitest";
import { getResendConfig } from "./resendConfig";

describe("getResendConfig", () => {
  it("returns trimmed, server-only Resend settings when every value is valid", () => {
    expect(
      getResendConfig({
        resendApiKey: " re_example ",
        resendFromEmail: " onboarding@resend.dev ",
        inquiryToEmail: " en.andre.st@gmail.com ",
      }),
    ).toEqual({
      apiKey: "re_example",
      fromEmail: "onboarding@resend.dev",
      recipientEmail: "en.andre.st@gmail.com",
    });
  });

  it("rejects an absent or malformed API key", () => {
    expect(() =>
      getResendConfig({
        resendApiKey: "not-a-resend-key",
        resendFromEmail: "onboarding@resend.dev",
        inquiryToEmail: "en.andre.st@gmail.com",
      }),
    ).toThrow("RESEND_API_KEY");
  });

  it("rejects invalid sender and recipient email addresses", () => {
    expect(() =>
      getResendConfig({
        resendApiKey: "re_example",
        resendFromEmail: "not-an-email",
        inquiryToEmail: "en.andre.st@gmail.com",
      }),
    ).toThrow("RESEND_FROM_EMAIL");

    expect(() =>
      getResendConfig({
        resendApiKey: "re_example",
        resendFromEmail: "onboarding@resend.dev",
        inquiryToEmail: "not-an-email",
      }),
    ).toThrow("INQUIRY_TO_EMAIL");
  });
});

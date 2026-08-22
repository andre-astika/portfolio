import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";
import { getResendConfig } from "./resendConfig";

describe("Resend credentials", () => {
  it("authenticates against the email endpoint without sending an email", async () => {
    const config = getResendConfig();
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      // An intentionally invalid payload checks the Sending access credential
      // without producing a message or processing visitor data.
      body: JSON.stringify({}),
    });

    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(403);
    expect(ENV.inquiryToEmail).toBe("en.andre.st@gmail.com");
  }, 15_000);
});

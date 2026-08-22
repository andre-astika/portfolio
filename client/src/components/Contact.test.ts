import { describe, expect, it } from "vitest";
import {
  buildInquiryMailto,
  capitalizeInquiryValue,
  FOOTER_COPYRIGHT,
  getInquiryClientErrors,
  INQUIRY_EMAIL,
  normalizeInquiryEmail,
  SOCIALS,
} from "./Contact";

describe("Contact privacy and location content", () => {
  it("keeps a direct email action while removing private phone and availability cards", () => {
    expect(SOCIALS.some((item) => item.label === "Phone")).toBe(false);
    expect(SOCIALS.some((item) => item.label === "Availability")).toBe(false);
    expect(SOCIALS.find((item) => item.label === "Email")?.href).toBe(`mailto:${INQUIRY_EMAIL}`);
  });

  it("uses the requested Contact and footer location labels", () => {
    expect(SOCIALS.find((item) => item.label === "Location")?.value).toBe("Bali, Indonesia");
    expect(FOOTER_COPYRIGHT).toBe("© 2026 Andre Astika — Bali, Indonesia");
  });

  it("keeps a mailto fallback for the static GitHub Pages edition", () => {
    const inquiryUrl = new URL(buildInquiryMailto({
      name: "Nina Lee",
      email: "nina@example.com",
      project: "Portfolio website",
      message: "I would like to discuss a new portfolio.",
    }));

    expect(inquiryUrl.protocol).toBe("mailto:");
    expect(inquiryUrl.pathname).toBe("en.andre.st@gmail.com");
    expect(inquiryUrl.searchParams.get("subject")).toBe("Project inquiry from Nina Lee");
    expect(inquiryUrl.searchParams.get("body")).toContain("Project type: Portfolio website");
  });

  it("requires a name, valid email, and project details before sending", () => {
    expect(getInquiryClientErrors({ name: "", email: "invalid", project: "", message: "" })).toEqual({
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      message: "Please share a few project details.",
    });

    expect(getInquiryClientErrors({ name: "Nina", email: "nina@example.com", project: "Website", message: "Hello" })).toEqual({});
  });

  it("formats the mailto fallback with capitalized content and a lowercase email", () => {
    const inquiryUrl = new URL(
      buildInquiryMailto({ name: "test", email: "TEST@GMAIL.COM", project: "test", message: "test" }),
    );

    expect(capitalizeInquiryValue("test")).toBe("Test");
    expect(normalizeInquiryEmail("TEST@GMAIL.COM")).toBe("test@gmail.com");
    expect(inquiryUrl.searchParams.get("body")).toContain("Name: Test");
    expect(inquiryUrl.searchParams.get("body")).toContain("Email: test@gmail.com");
    expect(inquiryUrl.searchParams.get("body")).toContain("Project type: Test");
  });
});

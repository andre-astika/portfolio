import { describe, expect, it } from "vitest";
import { buildInquiryMailto, FOOTER_COPYRIGHT, INQUIRY_EMAIL, SOCIALS } from "./Contact";

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

  it("builds a prefilled email inquiry without submitting visitor data to a service", () => {
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
});

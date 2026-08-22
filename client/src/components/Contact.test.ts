import { describe, expect, it } from "vitest";
import { CONTACT_AVAILABILITY, FOOTER_COPYRIGHT, SOCIALS } from "./Contact";

describe("Contact privacy and location content", () => {
  it("replaces the private phone contact with availability information", () => {
    expect(SOCIALS.some((item) => item.label === "Phone")).toBe(false);
    expect(SOCIALS.find((item) => item.label === "Availability")?.value).toBe(CONTACT_AVAILABILITY);
  });

  it("uses the requested Contact and footer location labels", () => {
    expect(SOCIALS.find((item) => item.label === "Location")?.value).toBe("Denpasar, Bali");
    expect(FOOTER_COPYRIGHT).toBe("© 2026 Andre Astika — Bali, Indonesia");
  });
});

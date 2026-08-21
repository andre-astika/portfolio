import { describe, expect, it } from "vitest";
import { ARTICLES, getArticle } from "./articles";

describe("How I Think articles", () => {
  it("exposes the three requested topic-based article slugs", () => {
    expect(ARTICLES.map((article) => article.slug)).toEqual(["typography", "user-experience", "color-theory"]);
  });

  it("gives every article a complete professional reading structure", () => {
    ARTICLES.forEach((article) => {
      expect(article.sections).toHaveLength(3);
      expect(article.fieldNotes).toHaveLength(3);
      expect(article.checklist.length).toBeGreaterThanOrEqual(4);
      expect(article.read).toMatch(/^\d+ min read$/);
    });
  });

  it("finds an article by its public route slug", () => {
    expect(getArticle("user-experience")?.category).toBe("User Experience");
    expect(getArticle("missing")).toBeUndefined();
  });
});

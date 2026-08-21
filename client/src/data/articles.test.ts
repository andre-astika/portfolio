import { describe, expect, it } from "vitest";
import { ARTICLES, getArticle } from "./articles";

describe("How I Think articles", () => {
  it("exposes the three requested standalone blog slugs", () => {
    expect(ARTICLES.map((article) => article.slug)).toEqual(["blog-1", "blog-2", "blog-3"]);
  });

  it("gives every article a complete professional reading structure", () => {
    ARTICLES.forEach((article) => {
      expect(article.sections).toHaveLength(3);
      expect(article.fieldNotes).toHaveLength(3);
      expect(article.checklist.length).toBeGreaterThanOrEqual(4);
    });
  });

  it("finds an article by its public route slug", () => {
    expect(getArticle("blog-2")?.category).toBe("User Experience");
    expect(getArticle("missing")).toBeUndefined();
  });
});

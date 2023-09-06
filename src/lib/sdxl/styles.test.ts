import { describe, test, expect } from "vitest";
import { getStyleNames, stylePrompt } from "./styles";

describe("styles", () => {
  test("should style a prompt", () => {
    const prompt = "house";
    const styledPrompt = stylePrompt(prompt, "Silhouette");

    expect(styledPrompt).toEqual({
      name: "Silhouette",
      prompt: expect.stringContaining("Silhouette style house"),
      negative_prompt: expect.stringMatching(/.*/),
    });
  });

  test("should return style names", () => {
    const names = getStyleNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain("Analog Film");
    expect(names).toContain("Anime");
    expect(names).toContain("Tilt-Shift");
  });
});

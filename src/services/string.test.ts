import { countWords, countVowels } from "./strings";

describe("Count Words", () => {
  it.each(["a", "ab", "abc", "isn't", "северо-запад", "1-s", "dérivé ; "])(
    "String '%s' has one word",
    (str) => {
      expect(countWords(str)).toBe(1);
    }
  );

  it.each(["a f", "ab - a", "living,—clipp'd ", "dérivé ; le", "Wales,—which"])(
    "String '%s' has two words",
    (str) => {
      expect(countWords(str)).toBe(2);
    }
  );

  it.each(["Scotland, Wales,—which calls"])(
    "String '%s' has four words",
    (str) => {
      expect(countWords(str)).toBe(4);
    }
  );
  it("Should count words in Russian example", () => {
    expect(countWords("Буря мглою небо кроет.")).toBe(4);
  });
  it("Should count words in English example", () => {
    expect(
      countWords(
        "O for a Muse of fire, that would ascend the brightest heaven of invention, a kingdom for a stage, princes to act and monarchs to behold the swelling scene!"
      )
    ).toBe(29);
  });
  it("Should count words in German example", () => {
    expect(
      countWords(
        "Der Hölle Rache kocht in meinem Herzen, Tod und Verzweiflung flammet um mich her!"
      )
    ).toBe(14);
  });
});

describe("Count vowels", () => {
  it("Should count vowels in Russian example", () => {
    expect(countVowels("Буря мглою небо кроет.")).toBe(8);
  });
  it("Should count vowels in English example", () => {
    expect(
      countVowels(
        "O for a Muse of fire, that would ascend the brightest heaven of invention, a kingdom for a stage, princes to act and monarchs to behold the swelling scene!"
      )
    ).toBe(46);
  });
  it("Should count vowels in German example", () => {
    expect(
      countVowels(
        "Der Hölle Rache kocht in meinem Herzen, Tod und Verzweiflung flammet um mich her!"
      )
    ).toBe(23);
  });
});
export {};

import { LanguageCSharp } from "../ide/frames/language-c-sharp";
import { LanguagePython } from "../ide/frames/language-python";
import { LanguageRefLang } from "../ide/frames/language-ref-lang";

export class ReservedWords {
  // Singleton
  static Instance: ReservedWords = new ReservedWords();

  private constructor() {
    this._set = LanguageRefLang.Instance.reservedWords
      .union(LanguagePython.Instance.reservedWords)
      .union(LanguageCSharp.Instance.reservedWords);
  }

  private _set: Set<string>;

  matchesIgnoringCase(target: string): boolean {
    return this._set.has(target.toLowerCase());
  }
}

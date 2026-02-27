import { LanguageCS } from "../ide/frames/language-cs";
import { LanguageElan } from "../ide/frames/language-elan";
import { LanguageJava } from "../ide/frames/language-java";
import { LanguagePython } from "../ide/frames/language-python";
import { LanguageVB } from "../ide/frames/language-vb";

export class ReservedWords {
  // Singleton
  static Instance: ReservedWords = new ReservedWords();

  private constructor() {
    this._set = LanguageElan.Instance.reservedWords
      .union(LanguagePython.Instance.reservedWords)
      .union(LanguageVB.Instance.reservedWords)
      .union(LanguageCS.Instance.reservedWords)
      .union(LanguageJava.Instance.reservedWords);
      //TODO temporary kludge
      this._set.delete("true");
      this._set.delete("false");
  }

  private _set: Set<string>;

  matchesIgnoringCase(target: string): boolean {
    return this._set.has(target.toLowerCase());
  }
}

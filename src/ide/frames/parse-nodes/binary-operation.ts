import {
  andKeyword,
  divKeyword,
  isKeyword,
  isntKeyword,
  modKeyword,
  orKeyword,
} from "../../../compiler/keywords";
import { ParseStatus } from "../status-enums";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { DIVIDE, GT, LT, MINUS, MULT, PLUS, POWER } from "../symbols";
import { AbstractParseNode } from "./abstract-parse-node";

export class BinaryOperation extends AbstractParseNode {
  constructor() {
    super();
    this.completionWhenEmpty = "<i>operator </i>";
  }

  keyword: boolean = false;
  closePacked: boolean = false;
  completion: string = "";

  parseText(text: string): void {
    this.remainingText = text;
    if (this.remainingText.length > 0) {
      while (this.nextChar() === " ") {
        this.moveCharsToMatched(1, ParseStatus.incomplete);
      }
      if (this.nextChar() === GT || this.nextChar() === LT) {
        this.processComparison();
      } else if (this.nextChar() === "i") {
        this.processEquality();
      } else if (
        this.nextChar() === POWER ||
        this.nextChar() === MULT ||
        this.nextChar() === DIVIDE
      ) {
        this.moveCharsToMatched(1, ParseStatus.valid);
        this.closePacked = true;
      } else if (this.nextChar() === PLUS || this.nextChar() === MINUS) {
        this.moveCharsToMatched(1, ParseStatus.valid);
        this._done = true;
      } else {
        this.processKeywords();
      }
      while (this.status === ParseStatus.valid && this.nextChar() === " ") {
        this.moveCharsToMatched(1, ParseStatus.valid);
      }
      if (
        this.remainingText.length > 0 &&
        (this.status === ParseStatus.empty || this.status === ParseStatus.incomplete)
      ) {
        this.status = ParseStatus.invalid;
      }
    }
  }

  private nextChar(): string {
    return this.remainingText.length > 0 ? this.remainingText[0] : "";
  }

  private moveCharsToMatched(n: number, st: ParseStatus): void {
    this.matchedText = this.matchedText + this.remainingText.slice(0, n);
    this.remainingText = this.remainingText.slice(n);
    this.status = st;
  }

  private processComparison(): void {
    this.moveCharsToMatched(1, ParseStatus.incomplete);
    if (this.nextChar() === "=") {
      this.moveCharsToMatched(1, ParseStatus.valid);
      this._done = true;
    } else if (this.remainingText.length === 0) {
      this.status = ParseStatus.incomplete;
    } else {
      this.status = ParseStatus.valid; //but leave all remaining characters
      this._done = true;
    }
  }

  private processEquality(): void {
    if (this.remainingText.length === 1) {
      this.moveCharsToMatched(1, ParseStatus.incomplete);
      this.completion = "s";
    } else if (this.remainingText.startsWith("isnt")) {
      this.moveCharsToMatched(4, ParseStatus.valid);
      this.keyword = true;
      this._done = true;
    } else if (this.remainingText.startsWith("isn")) {
      this.moveCharsToMatched(3, ParseStatus.incomplete);
      this.completion = "t";
    } else if (this.remainingText.length > 2 && this.remainingText.startsWith("is")) {
      this.moveCharsToMatched(2, ParseStatus.valid);
      this.keyword = true;
      this._done = true;
    } else if (this.remainingText.startsWith("is")) {
      this.moveCharsToMatched(2, ParseStatus.incomplete);
    }
  }

  private attemptToMatchKw(kw: string): boolean {
    if (this.remainingText.startsWith(kw)) {
      this.moveCharsToMatched(kw.length, ParseStatus.valid);
      this.keyword = true;
      this._done = true;
      return true;
    } else if (kw.startsWith(this.remainingText)) {
      this.completion = kw.slice(this.remainingText.length);
      this.moveCharsToMatched(this.remainingText.length, ParseStatus.incomplete);
      return true;
    }
    return false;
  }

  private processKeywords() {
    const keywords = [andKeyword, orKeyword, divKeyword, modKeyword];
    let match = false;
    let i = 0;
    while (!match && i < keywords.length) {
      match = this.attemptToMatchKw(keywords[i]);
      i++;
    }
  }

  renderAsHtml(): string {
    const open = this.keyword ? "<el-kw>" : "";
    const close = this.keyword ? "</el-kw>" : "";
    return `${open}${this.renderAsSource()}${close}`;
  }

  //TODO: for Python
  /*   renderAsHtml(): string {
    const open = this.keyword ? "<el-kw>" : "";
    const close = this.keyword ? "</el-kw>" : "";
    let text = this.matchedText.trim();
    if (text === isKeyword) {
      text = " == ";
    } else if (text === isntKeyword) {
      text = " != ";
    } else {
      text = this.renderAsSource();
    }
    return `${open}${text}${close}`;
  } */

  renderAsSource(): string {
    let source = "";
    if (this.status === ParseStatus.valid) {
      const space = this.closePacked ? "" : " ";
      source = `${space}${this.matchedText.trim()}${space}`;
    } else {
      source = this.matchedText;
    }
    return source;
  }

  getSyntaxCompletionAsHtml(): string {
    let completion = this.completion;
    if (this.matchedText === "" || this.matchedText === " ") {
      completion = "<i>operator </i>";
    }
    return completion;
  }

  override symbolCompletion_keywords(): Set<KeywordCompletion> {
    let kws = [andKeyword, divKeyword, isKeyword, isntKeyword, modKeyword, orKeyword].map((kw) =>
      KeywordCompletion.create(kw),
    );
    const trim = this.matchedText.trim();
    if (trim.length > 0) {
      kws = kws.filter((kw) => kw.keyword.startsWith(trim));
    }
    return new Set(kws);
  }
}

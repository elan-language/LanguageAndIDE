import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { DIVIDE, GE, GT, LE, LT, MINUS, MULT, PLUS } from "../symbols";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Operator } from "./operator";

export class BinaryOperation extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "<i>operator </i>";
  }

  keywords: string[] = [];

  private elanEQUAL = "is";
  private elanNOT_EQUAL = "isnt";
  private elanAND = "and";
  private elanOR = "or";
  private elanMOD = "mod";

  parseText(text: string): void {
    if (text.length > 0) {
      //const lang = this.file.language();
      this.remainingText = text;
      this.alternatives.push(new Operator(this.file, this.elanEQUAL, (lang) => lang.EQUAL));
      this.alternatives.push(new Operator(this.file, this.elanNOT_EQUAL, (lang) => lang.NOT_EQUAL));
      this.alternatives.push(new Operator(this.file, GT));
      this.alternatives.push(new Operator(this.file, LT));
      this.alternatives.push(new Operator(this.file, GE));
      this.alternatives.push(new Operator(this.file, LE));
      this.alternatives.push(new Operator(this.file, MULT));
      this.alternatives.push(new Operator(this.file, DIVIDE));
      this.alternatives.push(new Operator(this.file, PLUS));
      this.alternatives.push(new Operator(this.file, MINUS));
      this.alternatives.push(new Operator(this.file, this.elanAND, (lang) => lang.AND));
      this.alternatives.push(new Operator(this.file, this.elanOR, (lang) => lang.OR));
      this.alternatives.push(new Operator(this.file, this.elanMOD, (lang) => lang.MOD));
      while (this.nextChar() === " ") {
        this.moveCharsToMatched(1, ParseStatus.incomplete);
      }
      super.parseText(text);
      while (this.status === ParseStatus.valid && this.nextChar() === " ") {
        this.moveCharsToMatched(1, ParseStatus.valid);
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

  getSyntaxCompletionAsHtml(): string {
    let completion = "";
    if (this.matchedText === "" || this.matchedText === " ") {
      completion = "<i>operator </i>";
    }
    return completion;
  }

  override symbolCompletion_keywords(): Set<KeywordCompletion> {
    let kws = this.keywords.map((kw) => KeywordCompletion.create(kw));
    const trim = this.matchedText.trim();
    if (trim.length > 0) {
      kws = kws.filter((kw) => kw.keyword.startsWith(trim));
    }
    return new Set(kws);
  }

  renderAsElanSource(): string {
    let elan: string = "";
    if (this.status === ParseStatus.valid) {
      const op = this.bestMatch! as Operator;
      elan = op.renderAsElanSource();
    } else if (this.status === ParseStatus.incomplete) {
      elan = this.matchedText;
    }
    return elan;
  }

  renderAsHtml() {
    let html: string = "";
    if (this.status === ParseStatus.valid) {
      const op = this.bestMatch! as Operator;
      html = op.renderAsHtml();
    } else if (this.status === ParseStatus.incomplete) {
      html = this.matchedText;
    }
    return html;
  }
}

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

  alpha = /^[a-zA-Z]/;

  private elanEQUAL = "is";
  private elanNOT_EQUAL = "isnt";
  private elanAND = "and";
  private elanOR = "or";
  private elanMOD = "mod";

  elanToLang(op: string): string {
    const lang = this.file.language();
    let result = op;
    if (op === this.elanEQUAL) {
      result = lang.EQUAL;
    } else if (op === this.elanNOT_EQUAL) {
      result = lang.NOT_EQUAL;
    } else if (op === this.elanAND) {
      result = lang.AND;
    } else if (op === this.elanOR) {
      result = lang.OR;
    } else if (op === this.elanMOD) {
      result = lang.MOD;
    }
    return result;
  }

  langToElan(op: string): string {
    const lang = this.file.language();
    let result = op;
    if (op === lang.EQUAL) {
      result = this.elanEQUAL;
    } else if (op === lang.NOT_EQUAL) {
      result = this.elanNOT_EQUAL;
    } else if (op === lang.AND) {
      result = this.elanAND;
    } else if (op === lang.OR) {
      result = this.elanOR;
    } else if (op === lang.MOD) {
      result = this.elanMOD;
    }
    return result;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const lang = this.file.language();
      this.alternatives.push(new Operator(this.file, this.elanEQUAL, lang.EQUAL));
      this.alternatives.push(new Operator(this.file, this.elanNOT_EQUAL, lang.NOT_EQUAL));
      this.alternatives.push(new Operator(this.file, GT, GT));
      this.alternatives.push(new Operator(this.file, LT, LT));
      this.alternatives.push(new Operator(this.file, GE, GE));
      this.alternatives.push(new Operator(this.file, LE, LE));
      this.alternatives.push(new Operator(this.file, MULT, MULT));
      this.alternatives.push(new Operator(this.file, DIVIDE, DIVIDE));
      this.alternatives.push(new Operator(this.file, PLUS, PLUS));
      this.alternatives.push(new Operator(this.file, MINUS, MINUS));
      this.alternatives.push(new Operator(this.file, this.elanAND, lang.AND));
      this.alternatives.push(new Operator(this.file, this.elanOR, lang.OR));
      this.alternatives.push(new Operator(this.file, this.elanMOD, lang.MOD));
      super.parseText(text);
    }
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
      const text = op.elanOp;
      const closePacked = text === MULT || text === DIVIDE;
      const space = closePacked ? "" : " ";
      elan = `${space}${text}${space}`;
    }
    return elan;
  }

  renderAsHtml() {
    let html: string = "";
    if (this.status === ParseStatus.valid) {
      const op = this.bestMatch! as Operator;
      const text = op.langOp;
      const kw = this.alpha.test(text);
      const closePacked = text === MULT || text === DIVIDE;
      const open = kw ? "<el-kw>" : "";
      const close = kw ? "</el-kw>" : "";
      const space = closePacked ? "" : " ";
      html = `${open}${space}${text}${space}${close}`;
    }
    return html;
  }
}

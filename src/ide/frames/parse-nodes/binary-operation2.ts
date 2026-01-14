import {
  andKeyword,
  divKeyword,
  isKeyword,
  isntKeyword,
  modKeyword,
  orKeyword,
} from "../../../compiler/keywords";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { DIVIDE, GE, GT, LE, LT, MINUS, MULT, PLUS } from "../symbols";
import { AbstractAlternatives } from "./abstract-alternatives";
import { FixedTextNode } from "./fixed-text-node";


// THIS IS NOT WORKING, or currently used.
export class Operation extends FixedTextNode {
  keyword: boolean = false;
  closePacked: boolean = false;
  elanSource: string = "";
  op: string = "";

  constructor(file: File, op: string, closePacked: boolean, elanSource: string) {
    super(file, op);
    if (/^[A-Za-z]/.test(op)) {
      this.keyword = true;
    }
    this.op = op;
    this.closePacked = closePacked;
    this.elanSource = elanSource;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      const target = this.fixedText;
      while (text.startsWith(" ")) {
        text = text.substring(1);
      }
      if (text.startsWith(target)) {
        const n = this.numLeadingSpaces(text) + this.fixedText.length;
        this.set(ParseStatus.valid, text.substring(0, n), text.substring(n));
        this._done = true;
      } else if (target.startsWith(text)) {
        this.set(ParseStatus.incomplete, text, "");
      } else {
        this.set(ParseStatus.invalid, "", text);
      }
    }
  }
}

export class BinaryOperation extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "<i>operator </i>";
  }

  keyword: boolean = false;
  closePacked: boolean = false;
  completion: string = "";

  parseText(text: string): void {
    const lang = this.file.language();
    const file = this.file;
    if (text.length > 0) {
      this.alternatives.push(new Operation(file, PLUS, false, "+"));
      this.alternatives.push(new Operation(file, MINUS, false, "-"));
      this.alternatives.push(new Operation(file, MULT, true, "*"));
      this.alternatives.push(new Operation(file, DIVIDE, true, "/"));
      this.alternatives.push(new Operation(file, lang.POWER, true, "^"));
      this.alternatives.push(new Operation(file, lang.MOD, false, "mod"));
      this.alternatives.push(new Operation(file, lang.EQUAL, false, "is"));
      this.alternatives.push(new Operation(file, lang.NOT_EQUAL, false, "isnt"));
      this.alternatives.push(new Operation(file, GT, false, ">"));
      this.alternatives.push(new Operation(file, GE, false, ">="));
      this.alternatives.push(new Operation(file, LT, false, "<"));
      this.alternatives.push(new Operation(file, LE, false, "<="));
      this.alternatives.push(new Operation(file, lang.AND, false, "and"));
      this.alternatives.push(new Operation(file, lang.OR, false, "or"));
      this.alternatives.push(new Operation(file, lang.NOT, false, "not"));
      super.parseText(text);
    }
  }

  renderAsElanSource(): string {
    let source = "";
    if (this.status === ParseStatus.valid) {
      const best = this.bestMatch! as Operation;
      const space = best.closePacked ? "" : " ";
      source = `${space}${best.matchedText.trim()}${space}`;
    } else {
      source = this.matchedText;
    }
    return source;
  }

  renderAsHtml(): string {
    const best = this.bestMatch! as Operation;
    const open = best.keyword ? "<el-kw>" : "";
    const close = best.keyword ? "</el-kw>" : "";
    return `${open}${this.renderAsElanSource()}${close}`;
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

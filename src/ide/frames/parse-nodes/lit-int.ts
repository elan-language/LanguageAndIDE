import { Regexes } from "../fields/regexes";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { matchRegEx } from "./parse-node-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class LitInt extends RegExMatchNode {
  constructor(file: File) {
    super(file, Regexes.negatableLitInt);
    this.completionWhenEmpty = "<i>integer value </i>";
  }

  parseText(text: string) {
    if (text.length > 0) {
      let regExp = Regexes.negatableBase10Number;
      const lang = this.file.language();
      const binary_prefix = lang.BINARY_PREFIX;
      const hex_prefix = lang.HEX_PREFIX;
      let trimmed = text.trimStart();
      if (trimmed.startsWith(binary_prefix)) {
        this.isBinary = true;
        trimmed = trimmed.replace(binary_prefix, "");
        regExp = Regexes.binaryNumber;
      } else if (trimmed.startsWith(hex_prefix)) {
        this.isHex = true;
        trimmed = trimmed.replace(hex_prefix, "");
        regExp = Regexes.hexNumber;
      }
      [this.status, this.matchedText, this.remainingText] = matchRegEx(trimmed, regExp);
      if (this.status === ParseStatus.invalid) {
        this.remainingText = text; // to restore trimmed leading spaces
      }
    }
  }

  isBinary: boolean = false;
  isHex: boolean = false;

  renderAsHtml(): string {
    const lang = this.file.language();
    const prefix = this.isBinary ? lang.BINARY_PREFIX : this.isHex ? lang.HEX_PREFIX : "";
    return `<el-lit>${prefix}${this.matchedText}</el-lit>`;
  }

  renderAsElanSource(): string {
    const prefix = this.isBinary ? "0b" : this.isHex ? "0x" : "";
    return `${prefix}${this.matchedText}`;
  }
}

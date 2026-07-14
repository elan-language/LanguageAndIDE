import { Regexes } from "../fields/regexes";
import { ParseStatus } from "../status-enums";
import { IdentifierUse } from "./identifier-use";
import { matchRegEx } from "./parse-node-helpers";

export class IdentifierDef extends IdentifierUse {
  override parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      [this.status, this.matchedText, this.remainingText] = matchRegEx(
        text.trimStart(),
        Regexes.identifier,
      );
    }
    const disallowed = this.file.language().DISALLOWED_IDENTIFIERS.concat(["if", "if_"]);
    if (this.isValid() && disallowed.includes(this.matchedText.toLowerCase())) {
      this.status = ParseStatus.invalid;
      this.remainingText = text;
      this.matchedText = "";
    }
    if (this.isValid()) {
      this._done = true;
    }
  }
}

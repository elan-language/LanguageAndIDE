import { ReservedWords } from "../../../compiler/reserved-words";
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
    if (this.isValid()) {
      if (ReservedWords.Instance.matchesReservedWord_caseIgnored(this.matchedText)) {
        this.status = ParseStatus.invalid;
        this.message = `'${this.matchedText}' is reserved word.`;
      } else {
        this._done = true;
      }
    }
  }
}

import { Regexes } from "../fields/regexes";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";
import { Space } from "./parse-node-helpers";
import { File } from "../frame-interfaces/file";

export class SpaceNode extends AbstractParseNode {
  type: Space;

  constructor(file: File, type: Space) {
    super(file);
    this.type = type;
  }

  parseText(text: string): void {
    if (text.length === 0) {
      if (this.type === Space.required) {
        this.status = ParseStatus.empty;
      } else {
        this.status = ParseStatus.valid;
      }
    } else {
      this.remainingText = text;
      const matches = text.match(Regexes.leadingSpaceNotNL);
      if (matches !== null && matches.length > 0) {
        this.remainingText = text.replace(matches[0], "");
        this.status = ParseStatus.valid;
        this._done = true;
      } else if (this.type === Space.required) {
        this.status = ParseStatus.invalid;
      } else {
        this.status = ParseStatus.valid;
        this._done = true;
      }
    }
  }

  renderAsHtml(): string {
    return this.renderAsElanSource();
  }

  renderAsElanSource(): string {
    return this.type === Space.ignored || this.status === ParseStatus.empty ? "" : " ";
  }

  getSyntaxCompletionAsHtml(): string {
    return this.status === ParseStatus.empty && this.type === Space.required ? " " : "";
  }

  compile(): string {
    return this.type === Space.ignored ? "" : " ";
  }
}

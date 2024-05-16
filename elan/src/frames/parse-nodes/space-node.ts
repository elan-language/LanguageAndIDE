import { Regexes } from "../fields/regexes";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";
import { Space } from "./parse-node-helpers";

export class SpaceNode extends AbstractParseNode {
  type: Space;

  constructor(type: Space) {
    super();
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
      } else {
        this.status =
          this.type === Space.required
            ? ParseStatus.invalid
            : ParseStatus.valid;
      }
    }
  }

  renderAsHtml(): string {
    return this.renderAsSource();
  }

  renderAsSource(): string {
    return this.type === Space.ignored || this.status === ParseStatus.empty
      ? ""
      : " ";
  }

  getCompletionAsHtml(): string {
    return this.status === ParseStatus.empty && this.type === Space.required
      ? " "
      : "";
  }

  compile(): string {
    return this.type === Space.ignored ? "" : " ";
  }
}

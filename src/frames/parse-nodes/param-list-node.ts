import { CSV } from "./csv";
import { ParamDefNode } from "./param-def-node";
import { removeUnmatchedClosingBracket } from "./parse-node-helpers";

export class ParamListNode extends CSV {
  override nameForError(): string {
    return `as a parameter definition list`;
  }

  constructor() {
    super(() => new ParamDefNode(), 0);
    this.setSyntaxCompletionWhenEmpty("<i>parameter definitions</i>");
  }
  parseText(text: string): void {
    text = removeUnmatchedClosingBracket(text);
    super.parseText(text);
  }
}

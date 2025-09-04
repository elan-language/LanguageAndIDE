import { CSV } from "./csv";
import { ParamDefNode } from "./param-def-node";
import { removeUnmatchedClosingBracket } from "./parse-node-helpers";

export class ParamListNode extends CSV {
  outPermitted: boolean;

  constructor(outPermitted: boolean) {
    super(() => new ParamDefNode(outPermitted), 0);
    this.outPermitted = outPermitted;
    this.setSyntaxCompletionWhenEmpty("<i>parameter definitions</i>");
  }
  parseText(text: string): void {
    text = removeUnmatchedClosingBracket(text);
    super.parseText(text);
  }
}

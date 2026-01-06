import { CSV } from "./csv";
import { ParamDefNode } from "./param-def-node";
import { removeUnmatchedClosingBracket } from "./parse-node-helpers";
import { File } from "../frame-interfaces/file";

export class ParamListNode extends CSV {
  outPermitted: boolean;

  constructor(file: File, outPermitted: boolean) {
    super(file, () => new ParamDefNode(file, outPermitted), 0);
    this.outPermitted = outPermitted;
    this.setSyntaxCompletionWhenEmpty("<i>parameter definitions</i>");
  }
  parseText(text: string): void {
    text = removeUnmatchedClosingBracket(text);
    super.parseText(text);
  }
}

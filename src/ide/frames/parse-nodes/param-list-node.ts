import { CSV } from "./csv";
import { ParamDefNode } from "./param-def-node";
import { removeUnmatchedClosingBracket } from "./parse-node-helpers";
import { File } from "../frame-interfaces/file";

export class ParamListNode extends CSV {
  constructor(file: File) {
    super(file, () => new ParamDefNode(file), 0);
    this.setSyntaxCompletionWhenEmpty("<i>parameter definitions</i>");
  }
  parseText(text: string): void {
    text = removeUnmatchedClosingBracket(text);
    super.parseText(text);
  }
}

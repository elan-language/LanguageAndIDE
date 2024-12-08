import { CSV } from "./csv";
import { ParamDefNode } from "./param-def-node";

export class ParamListNode extends CSV {
  constructor() {
    super(() => new ParamDefNode(), 0);
    this.setSyntaxCompletionWhenEmpty("<i>parameter definitions</i>");
  }
  parseText(text: string): void {
    if (text.endsWith(")") && text.split("(").length - text.split(")").length !== 0) {
      text = text.slice(0, text.length - 1);
    }
    super.parseText(text);
  }
}

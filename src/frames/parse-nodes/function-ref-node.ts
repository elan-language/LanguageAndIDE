import { TokenType } from "../helpers";
import { refKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class FunctionRefNode extends AbstractSequence {
  name: IdentifierNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(refKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.name = new IdentifierNode(new Set<TokenType>([TokenType.method_function]));
      this.addElement(this.name);
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `<el-kw>${refKeyword}</el-kw> <el-method>${this.name!.renderAsHtml()}</el-method>`;
  }

  symbolCompletion_keywords(): string[] {
    return this.getElements().length === 0 ? [refKeyword] : super.symbolCompletion_keywords();
  }
}

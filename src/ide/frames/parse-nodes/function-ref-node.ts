import { refKeyword } from "../../../compiler/elan-keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierUse } from "./identifier-use";
import { KeywordNode } from "./keyword-node";
import { MethodNameUse } from "./method-name-use";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class FunctionRefNode extends AbstractSequence {
  name: IdentifierUse | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(this.file, refKeyword));
      this.addElement(new SpaceNode(this.file, Space.required));
      this.name = new MethodNameUse(this.file, new Set<TokenType>([TokenType.method_function]));
      this.addElement(this.name);
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `<el-kw>${refKeyword}</el-kw> <el-method>${this.name!.renderAsHtml()}</el-method>`;
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(refKeyword)])
      : super.symbolCompletion_keywords();
  }
}

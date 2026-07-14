import { IdentifierNode } from "./identifier-node";

export class MethodNameNode extends IdentifierNode {
  override renderAsHtml(): string {
    return `<el-method>${this.matchedText.trim()}</el-method>`;
  }
}

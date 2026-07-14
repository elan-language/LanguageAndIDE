import { IdentifierUse } from "./identifier-use";

export class MethodNameDef extends IdentifierUse {
  override renderAsHtml(): string {
    return `<el-method>${this.matchedText.trim()}</el-method>`;
  }
}

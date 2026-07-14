import { Identifier } from "./identifier";

export class MethodNameDef extends Identifier {
  override renderAsHtml(): string {
    return `<el-method>${this.matchedText.trim()}</el-method>`;
  }
}

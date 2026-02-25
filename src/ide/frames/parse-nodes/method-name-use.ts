import { IdentifierUse } from "./identifier-use";

export class MethodNameUse extends IdentifierUse {
  override renderAsHtml(): string {
    return `<el-method>${this.renderAsElanSource()}</el-method>`;
  }
}

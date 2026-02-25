import { IdentifierDef } from "./identifier-def";

export class MethodNameDef extends IdentifierDef {
  override renderAsHtml(): string {
    return `<el-method>${this.renderAsElanSource()}</el-method>`;
  }
}

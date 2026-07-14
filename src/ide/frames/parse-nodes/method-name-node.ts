
import { Identifier } from "./identifier";

export class MethodNameNode extends Identifier {

  override renderAsHtml(): string {
    return `<el-method>${this.matchedText.trim()}</el-method>`;
  }
}

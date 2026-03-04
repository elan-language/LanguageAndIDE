import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringOrdinary extends RegExMatchNode {
  contents(): string {
    let contents = "";
    if (this.status === ParseStatus.valid) {
      contents = contents.substring(1, contents.length - 2);
    }
    return contents;
  }

  constructor(file: File) {
    super(file, /^".*?"/);
    this.completionWhenEmpty = this.getCompletionFromLangOr(`"string"`);
  }
  renderAsHtml(): string {
    return `"<el-lit>${this.contents()}</el-lit>"`;
  }
}

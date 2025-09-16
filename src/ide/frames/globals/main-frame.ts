import { mainKeyword } from "../../../compiler/keywords";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { FrameWithStatements } from "../frame-with-statements";

export class MainFrame extends FrameWithStatements implements GlobalFrame {
  isMain = true;
  isGlobal = true;
  file: File;
  constructor(parent: File) {
    super(parent);
    this.file = parent;
  }

  initialKeywords(): string {
    return mainKeyword;
  }

  getFields(): Field[] {
    return []; //no direct fields
  }

  getIdPrefix(): string {
    return "main";
  }

  get symbolId() {
    return "__main";
  }

  public renderAsHtml(): string {
    return `<main class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>main</el-kw>${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end main</el-kw>
</main>`;
  }

  indent(): string {
    return "";
  }

  public renderAsSource(): string {
    return `${this.compilerDirectives()}main\r
${this.renderChildrenAsSource()}\r
end main\r
`;
  }

  parseTop(source: CodeSource) {
    source.remove("main");
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end main");
  }
}

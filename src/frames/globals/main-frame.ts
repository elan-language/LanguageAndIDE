import { mustNotHaveDuplicateMain } from "../compile-rules";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { GlobalFrame } from "../interfaces/global-frame";
import { Transforms } from "../interfaces/transforms";
import { mainKeyword } from "../keywords";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";

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
    return `<main class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>main</el-kw>${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end main</el-kw>
</main>`;
  }

  indent(): string {
    return "";
  }

  public renderAsSource(): string {
    return `main\r
${this.renderChildrenAsSource()}\r
end main\r
`;
  }

  public compile(transforms: Transforms): string {
    this.compileErrors = [];

    const existingMain = this.resolveSymbol("__main", transforms, this);

    if (existingMain instanceof DuplicateSymbol) {
      mustNotHaveDuplicateMain(this.compileErrors, this.htmlId);
    }

    return `async function main() {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren(transforms)}\r
}\r
`;
  }
  parseTop(source: CodeSource) {
    source.remove("main");
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end main");
  }
}

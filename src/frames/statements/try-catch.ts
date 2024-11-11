import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { catchingKeyword, endKeyword, tryKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";
import { CatchingStatement } from "./catching-statement";
import { DoingStatement } from "./doing-statement";

export class TryCatch extends FrameWithStatements {
  private doing: DoingStatement;
  private catch: CatchingStatement;

  constructor(parent: Parent) {
    super(parent);
    this.getChildren().pop()!; //remove the selector added as first child by superclass
    this.doing = new DoingStatement(this);
    this.getChildren().push(this.doing);
    this.catch = new CatchingStatement(this);
    this.getChildren().push(this.catch);
  }
  initialKeywords(): string {
    return tryKeyword;
  }
  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 2; //doing + catching
  }

  getFields(): Field[] {
    return []; //TODO: Issue here is that Try Catch has no DirectFields.
  }

  getIdPrefix(): string {
    return "try";
  }

  public getDoingStatement(): DoingStatement {
    return this.getChildren().filter((m) => "isDoing" in m)[0] as DoingStatement;
  }

  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><el-kw>${tryKeyword} </el-kw>${this.compileMsgAsHtml()}${this.getFrNo()}</top>
${this.renderChildrenAsHtml()}
<el-kw>end try</el-kw>
</statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}try\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${tryKeyword}`;
  }
  parseTop(source: CodeSource): void {
    source.remove(tryKeyword);
    source.removeNewLine();
    this.getDoingStatement().parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    let result = false;
    if (source.isMatch(`${catchingKeyword} `)) {
      result = true;
      this.catch.parseFrom(source);
    }
    return result;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    return `${this.indent()}try {\r
${this.compileStatements(transforms)}\r
${this.indent()}}`;
  }
}

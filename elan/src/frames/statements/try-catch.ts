import { Catch } from "./catch";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { tryKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class TryCatch extends FrameWithStatements {
  private catch: Catch;

  constructor(parent: Parent) {
    super(parent);
    this.catch = new Catch(this);
    this.getChildren().push(this.catch);
  }
  initialKeywords(): string {
    return tryKeyword;
  }
  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 2; //catch +
  }

  getFields(): Field[] {
    return []; //TODO: Issue here is that Try Catch has no DirectFields.
  }

  getIdPrefix(): string {
    return "try";
  }

  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>try </keyword></top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<keyword>end try</keyword>
</statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}try\r
${this.renderChildrenAsSource()}\r
${this.indent()}end try`;
  }
  parseTop(source: CodeSource): void {
    source.remove("try");
  }
  parseBottom(source: CodeSource): boolean {
    let result = false;
    if (source.isMatch("catch ")) {
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

import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../syntax-nodes/transforms";
import { catchingKeyword, doingKeyword, thenKeyword } from "../keywords";

export class DoingStatement extends FrameWithStatements implements Statement {
  isDoing = true;
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
    this.movable = false;
  }
  initialKeywords(): string {
    return doingKeyword;
  }
  delete(): void {} //Does nothing as default cannot be deleted

  getFields(): Field[] {
    return [];
  }
  getIdPrefix(): string {
    return doingKeyword;
  }
  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>${doingKeyword} </keyword>${this.getFrNo()}</top>
${this.renderChildrenAsHtml()}
</statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${doingKeyword}\r
${this.renderChildrenAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.compileStatements(transforms)}\r`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    source.remove(doingKeyword);
  }
  parseBottom(source: CodeSource): boolean {
    let result = false;
    source.removeIndent();
    if (source.isMatch(catchingKeyword)) {
      result = true;
    }
    return result;
  }
  canInsertBefore(): boolean {
    return false;
  }
}

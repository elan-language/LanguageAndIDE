import { endKeyword, tryKeyword } from "../../../compiler/keywords";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";
import { CatchStatement } from "./catch-statement";
import { StatementSelector } from "./statement-selector";

export class TryStatement extends FrameWithStatements {
  catch: CatchStatement;
  constructor(parent: Parent) {
    super(parent);
    this.catch = new CatchStatement(this);
    this.getChildren().push(this.catch);
    this.getChildren().push(new StatementSelector(this));
  }

  initialKeywords(): string {
    return tryKeyword;
  }
  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 2;
  }

  getFieldsDefaultImpl(): Field[] {
    return []; //Try has no direct Fields.
  }

  getIdPrefix(): string {
    return "try";
  }

  frameSpecificAnnotation(): string {
    return "try";
  }

  outerHtmlTag: string = "el-statement";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}try\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${tryKeyword}`;
  }
  parseTop(source: CodeSource): void {
    source.remove(tryKeyword);
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    if (source.isMatchRegEx(/^catch\s/)) {
      this.catch.parseFrom(source);
      const redundantSelector = this.getFirstSelectorAsDirectChild();
      this.removeChild(redundantSelector); //So that parsing will continue from the selector *after* the catch
    }
    return this.parseStandardEnding(source, `${endKeyword} ${tryKeyword}`);
  }
}

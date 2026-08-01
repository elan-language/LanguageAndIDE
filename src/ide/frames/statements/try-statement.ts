import { endKeyword, tryKeyword } from "../../../compiler/elan-keywords";
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
    // get the StatementSelector that has just been created in the call to super()
    // and tell it to delete the TryStatement if Backspace is the next key pressed
    // after the try/catch statement is created, while isNew is still set.
    (this.getChildren()[0] as StatementSelector).setDeleteParentOnBackspace();
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

  getFields(): Field[] {
    return []; //Try has no direct Fields.
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_try`;
  }

  frameSpecificAnnotation(): string {
    return "try statement";
  }

  outerHtmlTag: string = "el-statement";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}try\r
${this.renderChildrenAsElanSource()}\r
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

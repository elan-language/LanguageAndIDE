import { endKeyword, ifKeyword } from "../../../compiler/elan-keywords";
import { Clause } from "../clause";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Frame } from "../frame-interfaces/frame";

export class ThenClause extends Clause {
  override isDeletable() {
    return false;
  }

  override isMovable(): boolean {
    return false;
  }

  override canInsertBefore(): boolean {
    return false;
  }

  override select(withFocus: boolean, _multiSelect: boolean): void {
    // The invisible 'then-clause' is never selected itself
    const parent = this.getParent() as unknown as Frame;
    if (parent.isSelected()) {
      this.getFirstChild().select(withFocus, false);
    } else {
      (this.getParent() as unknown as Frame).select(withFocus, false);
    }
  }

  override getFrNo(): string {
    return "";
  }

  initialKeywords(): string {
    return "";
  }

  getFields(): Field[] {
    return [];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_then`;
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  renderAsElanSource(): string {
    return this.renderChildrenAsElanSource();
  }

  parseTop(_source: CodeSource): void {
    // does nothing
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return source.isMatch(`${endKeyword} ${ifKeyword}`);
  }
}

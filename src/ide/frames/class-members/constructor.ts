import { constructorKeyword } from "../../../compiler/elan-keywords";
import { AbstractSelector } from "../abstract-selector";
import { CompoundFrame } from "../compound-frame";
import { FieldImpl } from "../fields/field-impl";
import { paramListFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { MemberFrame } from "../frame-interfaces/member-frame";
import { Parent } from "../frame-interfaces/parent";
import { StatementSelector } from "../statements/statement-selector";

export class Constructor extends CompoundFrame implements MemberFrame {
  isConstructor = true;
  isMember = true;
  isAbstract = false;
  private = false;
  public params: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.params = new FieldImpl(this, paramListFieldSpec);
  }

  newChildSelector(): AbstractSelector {
    return new StatementSelector(this);
  }

  isPrivate: boolean = false;

  override helpDocument(): string {
    return "oopRef.html";
  }

  override canInsertBefore(): boolean {
    return false;
  }

  override isMovable(): boolean {
    return false;
  }

  override isDeletable(): boolean {
    return false;
  }

  isOnAbstractClass(): boolean {
    return false;
  }

  initialKeywords(): string {
    return constructorKeyword;
  }

  getFields(): Field[] {
    return [this.params];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_constructor`;
  }

  frameSpecificAnnotation(): string {
    return "constructor";
  }

  override outerHtmlTag: string = "el-constructor";

  public renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}constructor(${this.params.renderAsElanSource()})\r
${this.renderChildrenAsElanSource()}\r
${this.indent()}end constructor\r
`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    source.remove("constructor(");
    this.params.parseFrom(source);
    source.remove(")");
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end constructor");
  }

  renderAsExport(): string {
    return `${super.renderAsExport()}\r
`;
  }
}

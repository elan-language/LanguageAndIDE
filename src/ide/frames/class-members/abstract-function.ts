import {
  abstractFunctionKeywords,
  abstractKeyword,
  functionKeyword,
  returnsKeyword,
} from "../../../compiler/elan-keywords";
import { FieldImpl } from "../fields/field-impl";
import { methodNameFieldSpec, paramListFieldSpec, typeFieldSpec } from "../fields/field-spec";
import { singleIndent } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { SingleLineFrame } from "../single-line-frame";

export class AbstractFunction extends SingleLineFrame {
  isAbstract = true;
  isMember: boolean = true;
  private = false;
  public name: FieldImpl;
  public params: FieldImpl;
  public returnType: FieldImpl;
  hrefForFrameHelp: string = "oopRef.html#Abstract_function";

  constructor(parent: Parent) {
    super(parent);
    this.name = new FieldImpl(this, methodNameFieldSpec);
    this.params = new FieldImpl(this, paramListFieldSpec);
    this.returnType = new FieldImpl(this, typeFieldSpec);
    this.canHaveBreakPoint = false;
  }

  initialKeywords(): string {
    return abstractFunctionKeywords;
  }

  override helpDocument(): string {
    return "oopRef.html";
  }

  override helpId(): string {
    return "abstract_function";
  }

  getFields(): Field[] {
    return [this.name, this.params, this.returnType];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_func`;
  }

  frameSpecificAnnotation(): string {
    return "abstract function";
  }

  public override indent(): string {
    return singleIndent();
  }

  override outerHtmlTag: string = "el-func";

  public override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${abstractKeyword} ${functionKeyword} ${this.name.renderAsElanSource()}(${this.params.renderAsElanSource()}) ${returnsKeyword} ${this.returnType.renderAsElanSource()}\r
`;
  }

  parseFrom(source: CodeSource): void {
    source.remove(`${abstractKeyword} ${functionKeyword} `);
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(`) ${returnsKeyword} `);
    this.returnType.parseFrom(source);
  }

  renderAsExport(): string {
    return `${super.renderAsExport()}\r
`;
  }
}

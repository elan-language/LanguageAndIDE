import { FieldImpl } from "../fields/field-impl";
import { methodNameFieldSpec, paramListFieldSpec } from "../fields/field-spec";
import { singleIndent } from "../frame-helpers";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
import { SingleLineFrame } from "../single-line-frame";

export class AbstractProcedure extends SingleLineFrame {
  frameType: FrameType = FrameType.abstractProcedure;
  isAbstract = true;
  isMember: boolean = true;
  private = false;
  public name: FieldImpl;
  public params: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.name = new FieldImpl(this, methodNameFieldSpec);
    this.params = new FieldImpl(this, paramListFieldSpec);
    this.canHaveBreakPoint = false;
  }

  override helpDocument(): string {
    return "oopRef.html";
  }

  override helpId(): string {
    return "abstract_procedure";
  }

  getFields(): Field[] {
    return [this.name, this.params];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_proc`;
  }

  public override indent(): string {
    return singleIndent();
  }

  override outerHtmlTag: string = "el-proc";

  renderAsSource(): string {
    return `${super.renderAsSource()}\r
`;
  }
}

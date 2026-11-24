import { FieldImpl } from "../fields/field-impl";
import { paramListFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { MemberFrame } from "../frame-interfaces/member-frame";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";

export class Constructor extends FrameWithStatements implements MemberFrame {
  frameType: FrameType = FrameType.constructor;
  isConstructor = true;
  isMember = true;
  isAbstract = false;
  private = false;
  public params: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.params = new FieldImpl(this, paramListFieldSpec);
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

  helpId(): string {
    return "constructor";
  }

  getFields(): Field[] {
    return [this.params];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_constructor`;
  }

  override outerHtmlTag: string = "el-constructor";

  renderAsSource(): string {
    return `${super.renderAsSource()}\r
`;
  }
}

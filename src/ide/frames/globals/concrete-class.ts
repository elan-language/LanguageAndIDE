import { classKeyword, endKeyword } from "../../../compiler/elan-keywords";
import { Constructor } from "../class-members/constructor";
import { FunctionMethod } from "../class-members/function-method";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { FrameType } from "../frame-type";
import { ReturnStatement } from "../statements/return-statement";
import { ClassFrame } from "./class-frame";

export class ConcreteClass extends ClassFrame {
  frameType: FrameType = FrameType.concreteClass;
  private constr: Constructor;
  private toString: FunctionMethod;

  constructor(parent: File) {
    super(parent);
    this.isConcrete = true;
    this.constr = new Constructor(this);
    this.getChildren().unshift(this.constr);
    this.toString = new FunctionMethod(this);
    this.toString.name.setFieldToKnownValidText("toString");
    this.toString.returnType.setFieldToKnownValidText(this.language().STRING_NAME);
    (this.toString.getLastChild() as ReturnStatement).expr.setFieldToKnownValidText(`"undefined"`);
    // remove the isNew flag from the return statement frame to allow
    // Backspace to work on the "undefined" string immediately
    // rather than trying to delete the frame, which is marked as new
    this.toString.getLastChild().hasBeenAddedTo();
    this.getChildren().push(this.toString);
  }

  helpId(): string {
    return "class";
  }

  override helpDocument(): string {
    return "oopRef.html";
  }

  doesInherit(): boolean {
    return this.inheritance.text !== "";
  }

  getFields(): Field[] {
    return [this.name, this.inheritance];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_class`;
  }

  topKeywords(): string {
    return `${classKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}

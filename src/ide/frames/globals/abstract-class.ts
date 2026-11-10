import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { FrameType } from "../frame-type";
import { ClassFrame } from "./class-frame";

export class AbstractClass extends ClassFrame {
  frameType: FrameType = FrameType.abstractClass;

  constructor(parent: File) {
    super(parent);
    this.isAbstract = true;
  }

  override helpDocument(): string {
    return "oopRef.html";
  }
  override helpId(): string {
    return "abstract_class";
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
}

import { classKeyword, endKeyword } from "../../../compiler/keywords";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { parentHelper_renderChildrenAsElanSource } from "../parent-helpers";
import { ClassFrame } from "./class-frame";

export class ConcreteClass extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isConcrete = true;
  }

  initialKeywords(): string {
    return classKeyword;
  }

  doesInherit(): boolean {
    return this.inheritance.text !== "";
  }

  getFields(): Field[] {
    return [this.name, this.inheritance];
  }

  getIdPrefix(): string {
    return "class";
  }

  frameSpecificAnnotation(): string {
    return "class";
  }

  public renderAsElanSource(): string {
    return `${this.sourceAnnotations()}class ${this.name.renderAsElanSource()}${this.inheritanceAsElanSource()}\r
${parentHelper_renderChildrenAsElanSource(this)}\r
end class\r\n`;
  }

  topKeywords(): string {
    return `${classKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}

import { abstractClassKeywords, classKeyword, endKeyword } from "../../../compiler/keywords";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { parentHelper_renderChildrenAsSource } from "../parent-helpers";
import { ClassFrame } from "./class-frame";

export class AbstractClass extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isAbstract = true;
  }

  initialKeywords(): string {
    return abstractClassKeywords;
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
    return "abstract class";
  }

  public renderAsElanSource(): string {
    return `${this.sourceAnnotations()}abstract class ${this.name.renderAsElanSource()}${this.inheritanceAsElanSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end class\r\n`;
  }

  topKeywords(): string {
    return `${abstractClassKeywords} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}

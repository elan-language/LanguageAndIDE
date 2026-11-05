import { abstractClassKeywords, classKeyword, endKeyword } from "../../../compiler/elan-keywords";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { ClassFrame } from "./class-frame";

export class AbstractClass extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isAbstract = true;
  }

  initialKeywords(): string {
    return abstractClassKeywords;
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

  frameSpecificAnnotation(): string {
    return "abstract class";
  }
  topKeywords(): string {
    return `${abstractClassKeywords} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}

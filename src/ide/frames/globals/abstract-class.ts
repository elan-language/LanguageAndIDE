import {
  abstractClassKeywords,
  abstractKeyword,
  classKeyword,
  endKeyword,
} from "../../../compiler/elan-keywords";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { parentHelper_renderChildrenAsElanSource } from "../parent-helpers";
import { ClassFrame } from "./class-frame";

export class AbstractClass extends ClassFrame {
  constructor(parent: Parent) {
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

  public renderAsElanSource(): string {
    return `${this.sourceAnnotations()}${abstractKeyword} ${classKeyword} ${this.name.renderAsElanSource()}${this.inheritanceAsElanSource()}\r
${parentHelper_renderChildrenAsElanSource(this)}\r
${endKeyword} ${classKeyword}\r\n`;
  }

  topKeywords(): string {
    return `${abstractClassKeywords} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}

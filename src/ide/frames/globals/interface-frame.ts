import {
  abstractClassKeywords,
  endKeyword,
  interfaceKeyword,
} from "../../../compiler/elan-keywords";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { parentHelper_renderChildrenAsElanSource } from "../parent-helpers";
import { ClassFrame } from "./class-frame";

export class InterfaceFrame extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isAbstract = true;
    this.isInterface = true;
    this.canHaveBreakPoint = false;
  }

  initialKeywords(): string {
    return abstractClassKeywords;
  }

  doesInherit(): boolean {
    return this.inheritance.text !== "";
  }

  getFieldsDefaultImpl(): Field[] {
    return [this.name, this.inheritance];
  }

  getIdPrefix(): string {
    return "class";
  }

  frameSpecificAnnotation(): string {
    return "interface";
  }

  public renderAsElanSource(): string {
    return `${this.sourceAnnotations()}${interfaceKeyword} ${this.name.renderAsElanSource()}${this.inheritanceAsElanSource()}\r
${parentHelper_renderChildrenAsElanSource(this)}\r
${endKeyword} ${interfaceKeyword}\r\n`;
  }

  topKeywords(): string {
    return `${interfaceKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${interfaceKeyword}`;
  }
}

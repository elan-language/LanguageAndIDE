import { classKeyword, endKeyword } from "../../../compiler/elan-keywords";
import { Constructor } from "../class-members/constructor";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { parentHelper_renderChildrenAsElanSource } from "../parent-helpers";
import { ClassFrame } from "./class-frame";

export class ConcreteClass extends ClassFrame {
  private constr: Constructor;

  constructor(parent: File) {
    super(parent);
    this.constr = new Constructor(this);
    this.getChildren().push(this.constr);
    this.constr.select(true, false);
    this.moveSelectedChildrenUpOne();
    this.isConcrete = true;
  }

  initialKeywords(): string {
    return classKeyword;
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
    return "class";
  }

  public renderAsElanSource(): string {
    return `${this.sourceAnnotations()}class ${this.name.renderAsElanSource()}${this.inheritanceAsElanSource()}\r
${parentHelper_renderChildrenAsElanSource(this)}\r
end class\r\n`;
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    if (source.isMatchRegEx(/^catch\s/)) {
      this.constr.parseFrom(source);
      const redundantSelector = this.getFirstSelectorAsDirectChild();
      this.removeChild(redundantSelector); //So that parsing will continue from the selector *after* the constructor
    }
    return super.parseBottom(source);
  }

  topKeywords(): string {
    return `${classKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}

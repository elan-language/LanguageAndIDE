import { classKeyword, endKeyword } from "../../../compiler/elan-keywords";
import { Constructor } from "../class-members/constructor";
import { FunctionMethod } from "../class-members/function-method";
import { MemberSelector } from "../class-members/member-selector";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { parentHelper_renderChildrenAsElanSource } from "../parent-helpers";
import { ReturnStatement } from "../statements/return-statement";
import { ClassFrame } from "./class-frame";

export class ConcreteClass extends ClassFrame {
  private constr: Constructor;
  private toString: FunctionMethod;

  constructor(parent: File) {
    super(parent);
    this.isConcrete = true;
    this.constr = new Constructor(this);
    this.getChildren().push(this.constr);
    this.toString = new FunctionMethod(this);
    this.toString.name.setFieldToKnownValidText("toString");
    this.toString.returnType.setFieldToKnownValidText("String");
    const newCode = this.toString.getFirstChild();
    this.toString.removeChild(newCode);
    (this.toString.getLastChild() as ReturnStatement).expr.setFieldToKnownValidText(`"undefined"`);
    this.getChildren().push(this.toString);
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
    return `${this.sourceAnnotations()}${classKeyword} ${this.name.renderAsElanSource()}${this.inheritanceAsElanSource()}\r
${parentHelper_renderChildrenAsElanSource(this)}\r
${endKeyword} ${classKeyword}\r\n`;
  }

  topKeywords(): string {
    return `${classKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    if (source.isMatchRegEx(/^constructor\(/)) {
      this.constr.parseFrom(source);
      this.removeChild(this.getFirstSelectorAsDirectChild());
      this.addChildAfter(new MemberSelector(this), this.constr); //So that parsing will continue from the selector *after* the catch
    }
    source.removeIndent();
    if (source.isMatchRegEx(/^function toString\(/)) {
      this.toString.parseFrom(source);
      this.removeChild(this.getFirstSelectorAsDirectChild()); //So that parsing will continue from the selector *after* the catch
      this.addChildAfter(new MemberSelector(this), this.toString);
    }
    return super.parseBottom(source);
  }
}

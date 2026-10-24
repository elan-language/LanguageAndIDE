import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { BreakpointEvent } from "../../../compiler/debugging/breakpoint-event";
import { classKeyword, inheritsKeyword } from "../../../compiler/elan-keywords";
import { ClassSubType } from "../../../compiler/symbols/class-type";
import { AbstractSelector } from "../abstract-selector";
import { Constructor } from "../class-members/constructor";
import { MemberSelector } from "../class-members/member-selector";
import { Property } from "../class-members/property";
import { CompoundFrame } from "../compound-frame";
import { FieldImpl } from "../fields/field-impl";
import { inheritsFromFieldSpec, typeNameFieldSpec } from "../fields/field-spec";
import { Regexes } from "../fields/regexes";
import { isConstructor } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Collapsible } from "../frame-interfaces/collapsible";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Frame } from "../frame-interfaces/frame";
import { FrameFactory } from "../frame-interfaces/frame-factory";
import { Parent } from "../frame-interfaces/parent";
import { Paradigm } from "../paradigm";
import { parentHelper_updateBreakpoints } from "../parent-helpers";

export abstract class ClassFrame extends CompoundFrame implements Frame, Parent, Collapsible {
  isCollapsible: boolean = true;
  isParent: boolean = true;
  isClass: boolean = true;
  isAbstract: boolean = false;
  isConcrete: boolean = false;
  isRecord: boolean = false;
  isInterface: boolean = false;
  public name: FieldImpl;
  public isNotInheritable = false;
  public inheritance: FieldImpl;

  constructor(parent: Parent) {
    super(parent);
    this.name = new FieldImpl(this, typeNameFieldSpec);
    this.inheritance = new FieldImpl(this, inheritsFromFieldSpec);
    this.canHaveBreakPoint = false;
  }

  updateOfTypes(_ofTypes: SymbolType[]) {
    return this;
  }

  get subType(): ClassSubType {
    if (this.isInterface) {
      return ClassSubType.interface;
    }
    if (this.isAbstract) {
      return ClassSubType.abstract;
    }
    return ClassSubType.concrete;
  }

  getFile(): File {
    return this.getParent().getFile();
  }

  initialKeywords(): string {
    return classKeyword;
  }

  getParadigm(): Paradigm {
    return this.getFile().getParadigm();
  }
  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "multiline");
  }

  getFrameFactory(): FrameFactory {
    return this.getParent().getFrameFactory();
  }

  fieldUpdated(_field: Field): void {}

  doesInherit(): boolean {
    return this.inheritance.text !== "";
  }

  getFields(): Field[] {
    return [this.name, this.inheritance];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_class`;
  }

  public inheritanceAsHtml(): string {
    return this.inheritance.renderAsHtml();
  }

  public inheritanceAsElanSource(): string {
    return this.doesInherit() ? ` ${inheritsKeyword} ${this.inheritance.renderAsElanSource()}` : ``;
  }

  indent(): string {
    return "";
  }

  properties(): Property[] {
    return this.getChildren().filter((c) => c instanceof Property) as Property[];
  }

  protected seenTwice(name: string, seenNames: string[]) {
    return seenNames.filter((s) => s === name).length > 1;
  }

  public getConstructor(): Constructor {
    return this.getChildren().filter((m) => isConstructor(m))[0] as Constructor;
  }

  parseFrom(source: CodeSource): void {
    this.parseTop(source);
    while (!this.parseBottom(source)) {
      if (source.isMatchRegEx(Regexes.newLine)) {
        source.removeRegEx(Regexes.newLine, false);
        source.removeIndent();
      } else {
        this.getFirstSelectorAsDirectChild().parseFrom(source);
      }
    }
  }
  abstract topKeywords(): string;

  parseTop(source: CodeSource): boolean {
    source.remove(this.topKeywords());
    this.name.parseFrom(source);
    source.removeRegEx(/^\sinherits\s/, true);
    this.inheritance.parseFrom(source);
    return true;
  }

  abstract bottomKeywords(): string;

  parseBottom(source: CodeSource): boolean {
    let result = false;
    source.removeIndent();
    if (source.isMatch(this.bottomKeywords())) {
      source.remove(this.bottomKeywords());
      result = true;
    }
    return result;
  }

  newChildSelector(): AbstractSelector {
    return new MemberSelector(this);
  }

  getClassIndex() {
    return this.getParent().getChildren().indexOf(this);
  }

  updateBreakpoints(event: BreakpointEvent): void {
    super.updateBreakpoints(event);
    parentHelper_updateBreakpoints(this, event);
  }

  outerHtmlTag: string = "el-member";
}

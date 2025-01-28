import { AbstractSelector } from "../abstract-selector";
import { singleIndent } from "../frame-helpers";
import { ClassFrame } from "../globals/class-frame";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import {
  abstractFunctionKeywords,
  abstractKeyword,
  abstractProcedureKeywords,
  abstractPropertyKeywords,
  commentMarker,
  constructorKeyword,
  functionKeyword,
  privateFunctionKeywords,
  privateProcedureKeywords,
  privatePropertyKeywords,
  procedureKeyword,
  propertyKeyword,
} from "../keywords";

export class MemberSelector extends AbstractSelector implements Member {
  isMember: boolean = true;
  isAbstract = false;
  private = false;
  private class: ClassFrame;

  constructor(parent: Parent) {
    super(parent);
    this.class = parent as ClassFrame;
  }

  getClass(): ClassFrame {
    return this.getParent() as ClassFrame;
  }

  defaultOptions(): [string, (parent: Parent) => Frame][] {
    const options: [string, (parent: Parent) => Frame][] = [
      [constructorKeyword, (_parent: Parent) => this.class.createConstructor()],
      [functionKeyword, (_parent: Parent) => this.class.createFunction()],
      [procedureKeyword, (_parent: Parent) => this.class.createProcedure()],
      [propertyKeyword, (_parent: Parent) => this.class.createProperty()],
      [abstractFunctionKeywords, (_parent: Parent) => this.class.createAbstractFunction()],
      [abstractProcedureKeywords, (_parent: Parent) => this.class.createAbstractProcedure()],
      [abstractPropertyKeywords, (_parent: Parent) => this.class.createAbstractProperty()],
      [privateFunctionKeywords, (_parent: Parent) => this.class.createFunction(true)],
      [privateProcedureKeywords, (_parent: Parent) => this.class.createProcedure(true)],
      [privatePropertyKeywords, (_parent: Parent) => this.class.createProperty(true)],
      [commentMarker, (_parent: Parent) => this.class.createComment()],
    ];
    return options;
  }

  profileAllows(keyword: string): boolean {
    return this.profile.class_members.includes(keyword);
  }

  validWithinCurrentContext(keyword: string, _userEntry: boolean): boolean {
    // Reminder: need to use is... methods rather than instanceof because latter creates circular dependencies
    let result = false;
    if (keyword.startsWith(abstractKeyword)) {
      result = this.class.isAbstract || this.class.isInterface;
    } else if (this.class.isInterface) {
      result = keyword === commentMarker;
    } else if (this.class.isRecord) {
      result = keyword === propertyKeyword || keyword === commentMarker;
    } else if (keyword === constructorKeyword) {
      result = this.class.isConcrete && !this.getClass().getConstructor();
    } else {
      result = true;
    }
    return result;
  }

  renderAsHtml(): string {
    return `<el-member class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.textToDisplayAsHtml()}</el-member>`;
  }

  indent(): string {
    return singleIndent();
  }
}

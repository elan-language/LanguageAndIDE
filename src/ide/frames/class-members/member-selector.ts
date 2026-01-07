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
} from "../../../compiler/keywords";
import { AbstractSelector } from "../abstract-selector";
import { singleIndent } from "../frame-helpers";
import { Frame } from "../frame-interfaces/frame";
import { MemberFrame } from "../frame-interfaces/member-frame";
import { Parent } from "../frame-interfaces/parent";
import { ClassFrame } from "../globals/class-frame";

export class MemberSelector extends AbstractSelector implements MemberFrame {
  isMember: boolean = true;
  isAbstract = false;
  private = false;
  private class: ClassFrame;
  constructor(parent: Parent) {
    super(parent);
    this.class = parent as ClassFrame;
  }

  override helpId(): string {
    return "MemberInstructions";
  }

  getClass() {
    return this.getParent() as unknown as ClassFrame;
  }

  defaultOptions(): [string, (parent: Parent) => Frame][] {
    const options: [string, (parent: Parent) => Frame][] = [
      [constructorKeyword, (_parent: Parent) => this.class.createConstructor()],
      [propertyKeyword, (_parent: Parent) => this.class.createProperty()],
      [procedureKeyword, (_parent: Parent) => this.class.createProcedure()],
      [functionKeyword, (_parent: Parent) => this.class.createFunction()],
      [abstractPropertyKeywords, (_parent: Parent) => this.class.createAbstractProperty()],
      [abstractProcedureKeywords, (_parent: Parent) => this.class.createAbstractProcedure()],
      [abstractFunctionKeywords, (_parent: Parent) => this.class.createAbstractFunction()],
      [privatePropertyKeywords, (_parent: Parent) => this.class.createProperty(true)],
      [privateProcedureKeywords, (_parent: Parent) => this.class.createProcedure(true)],
      [privateFunctionKeywords, (_parent: Parent) => this.class.createFunction(true)],
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
      result =
        keyword === propertyKeyword || keyword === functionKeyword || keyword === commentMarker;
    } else if (keyword === constructorKeyword) {
      result = this.class.isConcrete && !this.getClass().getConstructor();
    } else {
      result = true;
    }
    return result;
  }

  outerHtmlTag: string = "el-member";

  indent(): string {
    return singleIndent();
  }
}

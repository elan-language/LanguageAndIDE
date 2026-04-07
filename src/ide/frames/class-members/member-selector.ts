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
} from "../../../compiler/elan-keywords";
import { AbstractSelector } from "../abstract-selector";
import { singleIndent } from "../frame-helpers";
import { Frame } from "../frame-interfaces/frame";
import { MemberFrame } from "../frame-interfaces/member-frame";
import { Parent } from "../frame-interfaces/parent";
import { ClassFrame } from "../globals/class-frame";

export class MemberSelector extends AbstractSelector implements MemberFrame {
  isMember: boolean = true;
  isAbstract = false;
  isPrivate = false;
  private class: ClassFrame;
  constructor(parent: Parent) {
    super(parent);
    this.class = parent as ClassFrame;
  }
  isOnAbstractClass(): boolean {
    throw new Error("Should not be called");
  }

  override helpId(): string {
    return "MemberInstructions";
  }

  getClass() {
    return this.getParent() as unknown as ClassFrame;
  }

  defaultOptions(): [string, string, (parent: Parent) => Frame][] {
    const comment = this.getCommentMarker();
    return [
      [constructorKeyword, "constructor", (_parent: Parent) => this.class.createConstructor()],
      [propertyKeyword, "property", (_parent: Parent) => this.class.createProperty()],
      [procedureKeyword, "procedure", (_parent: Parent) => this.class.createProcedure()],
      [functionKeyword, "<b>f</b>unction", (_parent: Parent) => this.class.createFunction()],
      [abstractPropertyKeywords, "abstract Property", (_parent: Parent) => this.class.createAbstractProperty()],
      [abstractProcedureKeywords, "abstract Procedure", (_parent: Parent) => this.class.createAbstractProcedure()],
      [abstractFunctionKeywords, "abstract Function", (_parent: Parent) => this.class.createAbstractFunction()],
      [privatePropertyKeywords, "private Property", (_parent: Parent) => this.class.createProperty(true)],
      [privateProcedureKeywords, "private Procedure", (_parent: Parent) => this.class.createProcedure(true)],
      [privateFunctionKeywords, "private Function", (_parent: Parent) => this.class.createFunction(true)],
      [comment, `<b>${comment}</b> comment`, (_parent: Parent) => this.class.createComment()],
    ];
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

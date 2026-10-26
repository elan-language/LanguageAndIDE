import {
  abstractFunctionKeywords,
  abstractKeyword,
  abstractProcedureKeywords,
  commentMarker,
  constructorKeyword,
  functionKeyword,
  privateFunctionKeywords,
  privateKeyword,
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

  constructor(parent: ClassFrame) {
    super(parent);
    this.class = parent;
  }
  isOnAbstractClass(): boolean {
    throw new Error("Should not be called");
  }

  override helpId(): string {
    return "MemberInstructions";
  }

  getClass(): ClassFrame {
    return this.class;
  }

  defaultOptions(): [string, string, string, (parent: Parent) => Frame][] {
    return [
      [
        constructorKeyword,
        "c",
        "constructor",
        (parent: Parent) => this.frameFactory.createConstructor(parent),
      ],
      [
        propertyKeyword,
        "p",
        "<b>p</b>roperty",
        (parent: Parent) => this.frameFactory.createProperty(parent, false),
      ],
      [
        procedureKeyword,
        "c",
        "pro<b>c</b>edure method",
        (parent: Parent) => this.frameFactory.createProcedureMethod(parent, false),
      ],
      [
        functionKeyword,
        "f",
        "<b>f</b>unction method",
        (parent: Parent) => this.frameFactory.createFunctionMethod(parent, false),
      ],
      [
        abstractProcedureKeywords,
        "",
        "abstract procedure",
        (parent: Parent) => this.frameFactory.createAbstractProcedure(parent),
      ],
      [
        abstractFunctionKeywords,
        "",
        "abstract function",
        (parent: Parent) => this.frameFactory.createAbstractFunction(parent),
      ],
      [
        privatePropertyKeywords,
        "",
        "private property",
        (parent: Parent) => this.frameFactory.createProperty(parent, true),
      ],
      [
        privateProcedureKeywords,
        "",
        "private procedure",
        (parent: Parent) => this.frameFactory.createProcedureMethod(parent, true),
      ],
      [
        privateFunctionKeywords,
        "",
        "private function",
        (parent: Parent) => this.frameFactory.createFunctionMethod(parent, true),
      ],
      [
        this.getCommentMarker(),
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        (parent: Parent) => this.frameFactory.createComment(parent),
      ],
    ];
  }

  paradigmAllows(_keyword: string): boolean {
    return true;
  }

  validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
    let result = true;
    // First apply universal instruction-specific rules
    if (keyword.startsWith(privateKeyword)) {
      result = !userEntry || this.sourcePasting;
    } else if (keyword.startsWith(abstractKeyword)) {
      result = this.class.isAbstract || this.class.isInterface;
    } else if (this.class.isInterface) {
      result = keyword === commentMarker;
    } else if (this.class.isRecord) {
      result =
        keyword === propertyKeyword ||
        keyword === functionKeyword ||
        keyword === this.getCommentMarker();
    } else if (keyword === constructorKeyword) {
      result = this.class.isConcrete && !this.getClass().getConstructor();
    } else if (keyword === procedureKeyword) {
      result = !(this.getParadigm().isFunctional() && userEntry);
    }
    return result;
  }

  outerHtmlTag: string = "el-member";

  indent(): string {
    return singleIndent();
  }
}

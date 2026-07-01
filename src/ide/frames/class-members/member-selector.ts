import {
  abstractFunctionKeywords,
  abstractKeyword,
  abstractProcedureKeywords,
  abstractPropertyKeywords,
  commentMarker,
  constructorKeyword,
  copyKeyword,
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

  defaultOptions(): [string, string, string, (parent: Parent) => Frame][] {
    return [
      [constructorKeyword, "c", "constructor", (_parent: Parent) => this.class.createConstructor()],
      [propertyKeyword, "p", "<b>p</b>roperty", (_parent: Parent) => this.class.createProperty()],
      [
        procedureKeyword,
        "c",
        "pro<b>c</b>edure method",
        (_parent: Parent) => this.class.createProcedure(),
      ],
      [
        functionKeyword,
        "f",
        "<b>f</b>unction method",
        (_parent: Parent) => this.class.createFunction(),
      ],
      [
        copyKeyword,
        "w",
        "copy <b>w</b>ith method",
        (_parent: Parent) => this.class.createCopyWithMethod(),
      ],
      [
        abstractPropertyKeywords,
        "",
        "abstract property",
        (_parent: Parent) => this.class.createAbstractProperty(),
      ],
      [
        abstractProcedureKeywords,
        "",
        "abstract procedure",
        (_parent: Parent) => this.class.createAbstractProcedure(),
      ],
      [
        abstractFunctionKeywords,
        "",
        "abstract function",
        (_parent: Parent) => this.class.createAbstractFunction(),
      ],
      [
        privatePropertyKeywords,
        "",
        "private property",
        (_parent: Parent) => this.class.createProperty(true),
      ],
      [
        privateProcedureKeywords,
        "",
        "private procedure",
        (_parent: Parent) => this.class.createProcedure(true),
      ],
      [
        privateFunctionKeywords,
        "",
        "private function",
        (_parent: Parent) => this.class.createFunction(true),
      ],
      [
        this.getCommentMarker(),
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        (_parent: Parent) => this.class.createComment(),
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
      result = !userEntry;
    } else if (keyword.startsWith(abstractPropertyKeywords)) {
      result = !userEntry; // Abstract properties not available to user and not documented. Kept to preserve capability, and tests, for time being
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
      result = !(this.paradigm.isFunctional() && userEntry);
    } else if (keyword === copyKeyword) {
      result = !userEntry || this.paradigm.isFunctional();
    }
    return result;
  }

  outerHtmlTag: string = "el-member";

  indent(): string {
    return singleIndent();
  }
}

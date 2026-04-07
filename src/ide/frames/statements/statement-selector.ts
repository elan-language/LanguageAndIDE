import {
  assertKeyword,
  callKeyword,
  catchKeyword,
  constantKeyword,
  elifKeyword,
  elseKeyword,
  forKeyword,
  ifKeyword,
  setKeyword,
  throwKeyword,
  tryKeyword,
  variableKeyword,
  whileKeyword,
} from "../../../compiler/elan-keywords";
import { AbstractSelector } from "../abstract-selector";
import { Frame } from "../frame-interfaces/frame";
import { Parent } from "../frame-interfaces/parent";
import { StatementFactory } from "../frame-interfaces/statement-factory";
import { FrameWithStatements } from "../frame-with-statements";

export class StatementSelector extends AbstractSelector {
  isStatement = true;
  private factory: StatementFactory;
  constructor(parent: FrameWithStatements) {
    super(parent);
    this.factory = parent.getFactory();
  }

  override helpId(): string {
    return "StatementInstructions";
  }

  defaultOptions(): [string, string, (parent: Parent) => Frame][] {
    const comment = this.getCommentMarker();
    return [
      ["p", "<b>p</b>rint", (parent: Parent) => this.factory.newCall(parent, "print")],
      [constantKeyword, "constant", (parent: Parent) => this.factory.newConstantStatement(parent)],
      [
        variableKeyword,
        "<b>v</b>ariable definition",
        (parent: Parent) => this.factory.newVar(parent),
      ],
      [assertKeyword, "<b>a</b>ssert equal", (parent: Parent) => this.factory.newAssert(parent)],
      [setKeyword, "change variable", (parent: Parent) => this.factory.newSet(parent)],
      [ifKeyword, "<b>i</b>f", (parent: Parent) => this.factory.newIf(parent)],
      [elifKeyword, "else if", (parent: Parent) => this.factory.newElif(parent)],
      [elseKeyword, "else", (parent: Parent) => this.factory.newElse(parent)],
      [whileKeyword, "<b>w</b>hile loop", (parent: Parent) => this.factory.newWhile(parent)],
      [forKeyword, "<b>f</b>or loop", (parent: Parent) => this.factory.newFor(parent)],
      [callKeyword, "call procedure", (parent: Parent) => this.factory.newCall(parent, "")],
      [tryKeyword, "try", (parent: Parent) => this.factory.newTryCatch(parent)],
      // [catchKeyword, (parent: Parent) => this.factory.newCatch(parent)],
      [throwKeyword, "throw exception", (parent: Parent) => this.factory.newThrow(parent)],
      [comment, `<b>${comment}</b> comment`, (parent: Parent) => this.factory.newComment(parent)],
    ];
  }

  profileAllows(_keyword: string): boolean {
    return true;
  }

  validWithinCurrentContext(keyword: string, _userEntry: boolean): boolean {
    const parent = this.getParent();
    let result = false;
    if (keyword === elseKeyword || keyword === elifKeyword) {
      result = parent.getIdPrefix() === ifKeyword;
    } else if (keyword === catchKeyword) {
      result = parent.getIdPrefix() === tryKeyword;
    } else if (keyword === callKeyword) {
      result = !(
        this.isWithinAFunction() ||
        this.isDirectlyWithinATest() ||
        this.isWithinAConstructor()
      );
    } else if (keyword === assertKeyword) {
      return this.isDirectlyWithinATest();
    } else {
      result = true;
    }
    return result;
  }

  private isWithinAFunction(): boolean {
    return this.isWithinContext(this.getParent(), "func");
  }

  private isDirectlyWithinATest(): boolean {
    return this.getParent().getIdPrefix() === "test";
  }

  private isWithinAConstructor(): boolean {
    return this.isWithinContext(this.getParent(), "constructor");
  }

  private isWithinContext(parent: Parent, parentPrefix: string): boolean {
    return parent.getIdPrefix() === parentPrefix
      ? true
      : parent.hasParent() && this.isWithinContext(parent.getParent(), parentPrefix);
  }

  outerHtmlTag: string = "el-statement";
}

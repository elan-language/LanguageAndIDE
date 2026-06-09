import {
  assertKeyword,
  callKeyword,
  catchKeyword,
  commentMarker,
  elifKeyword,
  elseKeyword,
  forKeyword,
  ifKeyword,
  letKeyword,
  reassignKeyword,
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

  defaultOptions(): [string, string, string, (parent: Parent) => Frame][] {
    return [
      [assertKeyword, "a", "<b>a</b>ssert", (parent: Parent) => this.factory.newAssert(parent)],
      ["print", "p", "<b>p</b>rint", (parent: Parent) => this.factory.newPrint(parent)],
      [
        letKeyword,
        "l",
        "<b>l</b>et statement",
        (parent: Parent) => this.factory.newLetStatement(parent),
      ],
      [
        variableKeyword,
        "v",
        "<b>v</b>ariable definition",
        (parent: Parent) => this.factory.newVar(parent),
      ],
      [
        reassignKeyword,
        "r",
        "<b>r</b>eassign variable",
        (parent: Parent) => this.factory.newSet(parent),
      ],
      [ifKeyword, "i", "<b>i</b>f", (parent: Parent) => this.factory.newIf(parent)],
      [elifKeyword, "s", "el<b>s</b>e if", (parent: Parent) => this.factory.newElif(parent)],
      [elseKeyword, "e", "<b>e</b>lse", (parent: Parent) => this.factory.newElse(parent)],
      [whileKeyword, "w", "<b>w</b>hile loop", (parent: Parent) => this.factory.newWhile(parent)],
      [forKeyword, "f", "<b>f</b>or loop", (parent: Parent) => this.factory.newFor(parent)],
      [
        callKeyword,
        "c",
        "<b>c</b>all procedure",
        (parent: Parent) => this.factory.newCall(parent, ""),
      ],
      [tryKeyword, "y", "tr<b>y</b>", (parent: Parent) => this.factory.newTryCatch(parent)],
      // [catchKeyword, (parent: Parent) => this.factory.newCatch(parent)], // add back when multiple catches permitted
      [throwKeyword, "t", "<b>t</b>hrow", (parent: Parent) => this.factory.newThrow(parent)],
      [
        this.getCommentMarker(),
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        (parent: Parent) => this.factory.newComment(parent),
      ],
    ];
  }

  profileAllows(_keyword: string): boolean {
    return true;
  }

  validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
    const parent = this.getParent();
    let result = true;
    // First apply universal instruction-specific rules
    if (keyword === elseKeyword || keyword === elifKeyword) {
      result = parent.getIdPrefix().includes(`_${ifKeyword}`);
    } else if (keyword === catchKeyword) {
      result = parent.getIdPrefix().includes(`_${tryKeyword}`);
    } else if (keyword === callKeyword || keyword === "print") {
      result = !(this.isWithinAFunction() || this.isWithinATest() || this.isWithinAConstructor());
    } else if (keyword === letKeyword) {
      result = !userEntry && (this.isWithinAFunction() || this.isWithinATest());
    } else if (keyword === assertKeyword) {
      result = this.isWithinATest();
    }
    //Then apply context-specific rules
    if (this.isWithinATest()) {
      result =
        keyword === assertKeyword ||
        keyword === variableKeyword ||
        keyword === letKeyword ||
        keyword === commentMarker;
    }
    // Then apply profile rules
    if (this.profile.isFunctional() && userEntry) {
      if (this.isWithinAFunction()) {
        result = keyword === letKeyword || keyword === commentMarker;
      } else if (this.isWithinATest()) {
        result = keyword === assertKeyword || keyword === letKeyword || keyword === commentMarker;
      }
    }
    return result;
  }

  private isWithinAFunction(): boolean {
    return this.isWithinContext(this.getParent(), "func");
  }

  private isWithinATest(): boolean {
    return this.getParent().getIdPrefix().includes("_test");
  }

  private isWithinAConstructor(): boolean {
    return this.isWithinContext(this.getParent(), "constructor");
  }

  private isWithinContext(parent: Parent, parentPrefix: string): boolean {
    return parent.getIdPrefix().includes(`_${parentPrefix}`)
      ? true
      : parent.hasParent() && this.isWithinContext(parent.getParent(), parentPrefix);
  }
  outerHtmlTag: string = "el-statement";
}

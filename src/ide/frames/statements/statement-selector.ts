import {
  assertKeyword,
  assignKeyword,
  callKeyword,
  catchKeyword,
  commentMarker,
  elifKeyword,
  elseKeyword,
  forKeyword,
  ifKeyword,
  throwKeyword,
  tryKeyword,
  variableKeyword,
  whileKeyword,
} from "../../../compiler/elan-keywords";
import { AbstractSelector } from "../abstract-selector";
import { ClauseOfIf } from "../clause-of-if";
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

  defaultOptions(): [string, string, string, (parent: Parent) => Frame, boolean][] {
    return [
      [
        assertKeyword,
        "a",
        "<b>a</b>ssert",
        (parent: Parent) => this.factory.newAssert(parent),
        true,
      ],
      [
        variableKeyword,
        "v",
        "<b>v</b>ariable definition",
        (parent: Parent) => this.factory.newVar(parent),
        true,
      ],
      [
        assignKeyword,
        "a",
        "<b>a</b>ssignment",
        (parent: Parent) => this.factory.newSet(parent),
        true,
      ],
      [ifKeyword, "i", "<b>i</b>f statement", (parent: Parent) => this.factory.newIf(parent), true],
      [
        elifKeyword,
        "s",
        "el<b>s</b>e if clause",
        (parent: Parent) => this.factory.newElseIf(parent.getParent()),
        false,
      ],
      [
        elseKeyword,
        "e",
        "<b>e</b>lse clause",
        (parent: Parent) => this.factory.newElse(parent.getParent()),
        false,
      ],
      [
        whileKeyword,
        "w",
        "<b>w</b>hile loop",
        (parent: Parent) => this.factory.newWhile(parent),
        true,
      ],
      [forKeyword, "f", "<b>f</b>or loop", (parent: Parent) => this.factory.newFor(parent), true],
      [
        callKeyword,
        "c",
        "procedure <b>c</b>all",
        (parent: Parent) => this.factory.newCall(parent, ""),
        true,
      ],
      [
        tryKeyword,
        "y",
        "tr<b>y</b> statement",
        (parent: Parent) => this.factory.newTryCatch(parent),
        true,
      ],
      // [catchKeyword, (parent: Parent) => this.factory.newCatch(parent)], // add back when multiple catches permitted
      [
        throwKeyword,
        "t",
        "<b>t</b>hrow statement",
        (parent: Parent) => this.factory.newThrow(parent),
        true,
      ],
      [
        this.getCommentMarker(),
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        (parent: Parent) => this.factory.newComment(parent),
        true,
      ],
    ];
  }

  paradigmAllows(_keyword: string): boolean {
    return true;
  }

  validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
    const parent = this.getParent();
    let result = true;
    // First apply universal instruction-specific rules
    if (keyword === elifKeyword) {
      result = this.isWithinThenOrElseIfClause() && parent.getLastChild() === this;
    } else if (keyword === elseKeyword) {
      const elseExists =
        "elseClauseAlreadyExists" in parent &&
        (parent as unknown as ClauseOfIf).elseClauseAlreadyExists();
      result =
        this.isWithinThenOrElseIfClause() &&
        !(elseExists && parent.getLastChild() === this) &&
        parent.getParent().getLastChild() === (parent as unknown as Frame);
    } else if (keyword === catchKeyword) {
      result = parent.getIdPrefix().includes(`_${tryKeyword}`);
    } else if (keyword === callKeyword) {
      result = !(this.isWithinAFunction() || this.isWithinATest() || this.isWithinAConstructor());
    } else if (keyword === assertKeyword) {
      result = this.isWithinATest();
    }
    //Then apply context-specific rules
    if (this.isWithinATest()) {
      result =
        keyword === assertKeyword || keyword === variableKeyword || keyword === commentMarker;
    }
    // Then apply paradigm rules
    if (this.getParadigm().isFunctional() && userEntry) {
      if (this.isWithinAFunction()) {
        result = keyword === variableKeyword || keyword === commentMarker;
      } else if (this.isWithinATest()) {
        result =
          keyword === assertKeyword || keyword === variableKeyword || keyword === commentMarker;
      }
    }
    return result;
  }

  private isWithinThenOrElseIfClause() {
    const prefix = this.getParent().getIdPrefix();
    return prefix.endsWith("_then") || prefix.endsWith("_elseIf");
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

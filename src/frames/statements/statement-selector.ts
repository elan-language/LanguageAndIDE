import { AbstractSelector } from "../abstract-selector";
import { FrameWithStatements } from "../frame-with-statements";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { StatementFactory } from "../interfaces/statement-factory";
import {
  assertKeyword,
  callKeyword,
  catchKeyword,
  commentMarker,
  eachKeyword,
  elseKeyword,
  forKeyword,
  ifKeyword,
  letKeyword,
  matchKeyword,
  otherwiseKeyword,
  printKeyword,
  repeatKeyword,
  setKeyword,
  switchKeyword,
  throwKeyword,
  tryKeyword,
  variableKeyword,
  whileKeyword,
} from "../keywords";

export class StatementSelector extends AbstractSelector {
  isStatement = true;
  private factory: StatementFactory;

  constructor(parent: FrameWithStatements) {
    super(parent);
    this.factory = parent.getFactory();
  }

  defaultOptions(): [string, (parent: Parent) => Frame][] {
    return [
      [assertKeyword, (parent: Parent) => this.factory.newAssert(parent)],
      [callKeyword, (parent: Parent) => this.factory.newCall(parent)],
      [catchKeyword, (parent: Parent) => this.factory.newCatch(parent)],
      [eachKeyword, (parent: Parent) => this.factory.newEach(parent)],
      [elseKeyword, (parent: Parent) => this.factory.newElse(parent)],
      [forKeyword, (parent: Parent) => this.factory.newFor(parent)],
      [ifKeyword, (parent: Parent) => this.factory.newIf(parent)],
      [letKeyword, (parent: Parent) => this.factory.newLet(parent)],
      [matchKeyword, (parent: Parent) => this.factory.newMatch(parent)],
      [otherwiseKeyword, (parent: Parent) => this.factory.newOtherwise(parent)],
      [printKeyword, (parent: Parent) => this.factory.newPrint(parent)],
      [repeatKeyword, (parent: Parent) => this.factory.newRepeat(parent)],
      [setKeyword, (parent: Parent) => this.factory.newSet(parent)],
      [switchKeyword, (parent: Parent) => this.factory.newSwitch(parent)],
      [throwKeyword, (parent: Parent) => this.factory.newThrow(parent)],
      [tryKeyword, (parent: Parent) => this.factory.newTryCatch(parent)],
      [variableKeyword, (parent: Parent) => this.factory.newVar(parent)],
      [whileKeyword, (parent: Parent) => this.factory.newWhile(parent)],
      [commentMarker, (parent: Parent) => this.factory.newComment(parent)],
    ];
  }

  profileAllows(keyword: string): boolean {
    return this.profile.statements.includes(keyword);
  }

  otherwiseMaybeAdded(): boolean {
    const peers = this.getParent().getChildren();
    const noExistingOtherwise = peers.filter((p) => "isOtherwise" in p).length === 0;
    const isLastInSwitch = this.getParent().getLastChild() === this;
    return noExistingOtherwise && isLastInSwitch;
  }

  isAboveOtherwiseIfPresent(): boolean {
    const peers = this.getParent().getChildren();
    const existingOtherwise = peers.filter((p) => "isOtherwise" in p)[0];
    return !existingOtherwise || peers.indexOf(this) < peers.indexOf(existingOtherwise);
  }

  canAddCatch(): boolean {
    const isInTry = this.getParent().getIdPrefix() === tryKeyword;
    const noExistingCatch =
      this.getParent()
        .getChildren()
        .filter((p) => "isCatch" in p).length === 0;
    return isInTry && noExistingCatch;
  }

  validWithinCurrentContext(keyword: string, _userEntry: boolean): boolean {
    const parent = this.getParent();
    let result = false;
    if (keyword === matchKeyword && parent.getIdPrefix() === switchKeyword) {
      return this.isAboveOtherwiseIfPresent();
    } else if (keyword === otherwiseKeyword && this.otherwiseMaybeAdded()) {
      result = parent.getIdPrefix() === switchKeyword;
    } else if (keyword === matchKeyword || keyword === otherwiseKeyword) {
      result = false;
    } else if (keyword === elseKeyword) {
      result = parent.getIdPrefix() === ifKeyword;
    } else if (keyword === assertKeyword) {
      return this.isWithinATest();
    } else if (keyword === printKeyword || keyword === callKeyword) {
      result = !(this.isWithinAFunction() || this.isWithinATest() || this.isWithinAConstructor());
    } else if (keyword === catchKeyword) {
      result = this.canAddCatch();
    } else {
      result = true;
    }
    return result;
  }

  private isWithinAFunction(): boolean {
    return this.isWithinContext(this.getParent(), "func");
  }

  private isWithinATest(): boolean {
    return this.isWithinContext(this.getParent(), "test");
  }

  private isWithinAConstructor(): boolean {
    return this.isWithinContext(this.getParent(), "constructor");
  }

  private isWithinContext(parent: Parent, parentPrefix: string): boolean {
    return parent.getIdPrefix() === parentPrefix
      ? true
      : parent.hasParent() && this.isWithinContext(parent.getParent(), parentPrefix);
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplayAsHtml()}</el-statement>`;
  }
}

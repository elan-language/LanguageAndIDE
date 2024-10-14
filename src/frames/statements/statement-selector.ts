import { AbstractSelector } from "../abstract-selector";
import { FrameWithStatements } from "../frame-with-statements";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { StatementFactory } from "../interfaces/statement-factory";
import {
  assertKeyword,
  callKeyword,
  caseKeyword,
  catchKeyword,
  commentMarker,
  defaultKeyword,
  eachKeyword,
  elseKeyword,
  forKeyword,
  ifKeyword,
  letKeyword,
  printKeyword,
  repeatKeyword,
  returnKeyword,
  setKeyword,
  switchKeyword,
  throwKeyword,
  tryKeyword,
  varKeyword,
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
      [caseKeyword, (parent: Parent) => this.factory.newCase(parent)],
      [catchKeyword, (parent: Parent) => this.factory.newCatch(parent)],
      [defaultKeyword, (parent: Parent) => this.factory.newDefault(parent)],
      [eachKeyword, (parent: Parent) => this.factory.newEach(parent)],
      [elseKeyword, (parent: Parent) => this.factory.newElse(parent)],
      [forKeyword, (parent: Parent) => this.factory.newFor(parent)],
      [ifKeyword, (parent: Parent) => this.factory.newIf(parent)],
      [letKeyword, (parent: Parent) => this.factory.newLet(parent)],
      [printKeyword, (parent: Parent) => this.factory.newPrint(parent)],
      [repeatKeyword, (parent: Parent) => this.factory.newRepeat(parent)],
      [returnKeyword, (parent: Parent) => this.factory.newReturn(parent)],
      [setKeyword, (parent: Parent) => this.factory.newSet(parent)],
      [switchKeyword, (parent: Parent) => this.factory.newSwitch(parent)],
      [throwKeyword, (parent: Parent) => this.factory.newThrow(parent)],
      [tryKeyword, (parent: Parent) => this.factory.newTryCatch(parent)],
      [varKeyword, (parent: Parent) => this.factory.newVar(parent)],
      [whileKeyword, (parent: Parent) => this.factory.newWhile(parent)],
      [commentMarker, (parent: Parent) => this.factory.newComment(parent)],
    ];
  }

  profileAllows(keyword: string): boolean {
    return this.profile.statements.includes(keyword);
  }

  noPeerLevelDefault(): boolean {
    const peers = this.getParent().getChildren();
    return peers.filter((p) => "isDefault" in p).length === 0;
  }

  validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
    const parent = this.getParent();
    let result = false;
    if (parent.getIdPrefix() === switchKeyword) {
      result = keyword === caseKeyword || (keyword === defaultKeyword && this.noPeerLevelDefault());
    } else if (parent.getIdPrefix() === ifKeyword) {
      result = keyword === elseKeyword;
    } else if (keyword === caseKeyword || keyword === defaultKeyword || keyword === elseKeyword) {
      result = false;
    } else if (keyword === assertKeyword) {
      return this.isWithinATest();
    } else if (keyword === returnKeyword || keyword === catchKeyword) {
      result = !userEntry;
    } else if (keyword === printKeyword || keyword === callKeyword) {
      result = !(this.isWithinAFunction() || this.isWithinATest() || this.isWithinAConstructor());
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
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplayAsHtml()}</statement>`;
  }
}

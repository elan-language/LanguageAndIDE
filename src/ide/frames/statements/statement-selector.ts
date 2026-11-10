import { AbstractSelector } from "../abstract-selector";
import { Frame } from "../frame-interfaces/frame";
import { Parent } from "../frame-interfaces/parent";
import { StatementFactory } from "../frame-interfaces/statement-factory";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";
import { IfStatement } from "./if-statement";

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

  defaultOptions(): [FrameType, string, string, boolean][] {
    const options: [FrameType, string, string, boolean][] = [
      [FrameType.assertStatement, "a", "<b>a</b>ssert", true],
      [FrameType.variableDefinition, "v", "<b>v</b>ariable definition", true],
      [FrameType.assignment, "a", "<b>a</b>ssignment", true],
      [FrameType.catchClause, "h", "catc<b>h</b>", false],
      [FrameType.ifStatement, "i", "<b>i</b>f statement", true],
      [FrameType.elseIfClause, "l", "e<b>l</b>se if clause", false],
      [FrameType.elseClause, "e", "<b>e</b>lse clause", false],
      [FrameType.whileLoop, "w", "<b>w</b>hile loop", true],
      [FrameType.forLoop, "f", "<b>f</b>or loop", true],
      [FrameType.procedureCall, "c", "procedure <b>c</b>all", true],
      [FrameType.tryStatement, "y", "tr<b>y</b> statement", true],
      [FrameType.throwStatement, "t", "<b>t</b>hrow statement", true],
      [
        FrameType.commentFrame,
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        true,
      ],
    ];
    this.language().customiseStatementOptions(options);
    return options;
  }

  validWithinCurrentContext(type: FrameType, userEntry: boolean): boolean {
    const parent = this.getParent();
    let result = true;
    // First apply universal instruction-specific rules
    if (type === FrameType.elseIfClause) {
      result = this.isWithinThenOrElseIfClause() && parent.getLastChild() === this;
    } else if (type === FrameType.elseClause) {
      result =
        this.isWithinThenOrElseIfClause() &&
        parent.getLastChild() === this &&
        parent.getParent().getLastChild() === (parent as unknown as Frame) &&
        !(parent.getParent() as unknown as IfStatement).hasElseClause();
    } else if (type === FrameType.catchClause) {
      result =
        parent.frameType === FrameType.tryStatement || parent.frameType === FrameType.catchClause;
    } else if (type === FrameType.procedureCall) {
      result = !(
        this.isWithinAFunction(parent) ||
        this.isWithinATest() ||
        this.isWithinAConstructor()
      );
    } else if (type === FrameType.assertStatement) {
      result = this.isWithinATest();
    }
    //Then apply context-specific rules
    if (this.isWithinATest()) {
      result =
        type === FrameType.assertStatement ||
        type === FrameType.variableDefinition ||
        type === FrameType.commentFrame;
    }
    // Then apply paradigm rules
    if (this.getParadigm().isFunctional() && userEntry) {
      if (this.isWithinAFunction(parent)) {
        result = type === FrameType.variableDefinition || type === FrameType.commentFrame;
      } else if (this.isWithinATest()) {
        result =
          type === FrameType.assertStatement ||
          type === FrameType.variableDefinition ||
          type === FrameType.commentFrame;
      }
    }
    return result;
  }

  private isWithinThenOrElseIfClause() {
    const parentType = this.getParent().frameType;
    return parentType === FrameType.thenClause || parentType === FrameType.elseIfClause;
  }

  private isWithinAFunction(givenParent: Parent): boolean {
    const parentType = givenParent.frameType;
    const isDirectlyWithinFunction =
      parentType === FrameType.globalFunction || parentType === FrameType.functionMethod;
    return isDirectlyWithinFunction
      ? true
      : givenParent.hasParent() && this.isWithinAFunction(givenParent.getParent());
  }

  private isWithinATest(): boolean {
    return this.getParent().frameType === FrameType.test;
  }

  private isWithinAConstructor(): boolean {
    const parentType = this.getParent().frameType;
    return parentType === FrameType.constructor;
  }

  outerHtmlTag: string = "el-statement";

  createFrame(type: FrameType, parent: Parent): Frame {
    return this.factory.createFrame(type, parent);
  }
}

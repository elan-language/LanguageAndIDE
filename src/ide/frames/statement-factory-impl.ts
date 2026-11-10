import { CommentFrame } from "./comment-frame";
import { Frame } from "./frame-interfaces/frame";
import { Parent } from "./frame-interfaces/parent";
import { StatementFactory } from "./frame-interfaces/statement-factory";
import { FrameType } from "./frame-type";
import { AssertStatement } from "./statements/assert-statement";
import { Assignment } from "./statements/assignment";
import { CatchClause } from "./statements/catch-clause";
import { ElseClause } from "./statements/else-clause";
import { ElseIfClause } from "./statements/elseIf-clause";
import { ForLoop } from "./statements/forLoop";
import { IfStatement } from "./statements/if-statement";
import { ProcedureCall } from "./statements/procedureCall";
import { ThrowStatement } from "./statements/throw-statement";
import { TryStatement } from "./statements/try-statement";
import { VariableDefinition } from "./statements/variable-definition";
import { WhileLoop } from "./statements/whileLoop";

export class StatementFactoryImpl implements StatementFactory {
  createFrame(type: FrameType, parent: Parent): Frame {
    if (type === FrameType.assertStatement) {
      return new AssertStatement(parent);
    } else if (type === FrameType.procedureCall) {
      return new ProcedureCall(parent);
    } else if (type === FrameType.catchClause) {
      return new CatchClause(parent.getParent());
    } else if (type === FrameType.elseIfClause) {
      return new ElseIfClause(parent.getParent());
    } else if (type === FrameType.elseClause) {
      return new ElseClause(parent.getParent());
    } else if (type === FrameType.forLoop) {
      return new ForLoop(parent);
    } else if (type === FrameType.ifStatement) {
      return new IfStatement(parent);
    } else if (type === FrameType.assignment) {
      return new Assignment(parent);
    } else if (type === FrameType.throwStatement) {
      return new ThrowStatement(parent);
    } else if (type === FrameType.tryStatement) {
      return new TryStatement(parent);
    } else if (type === FrameType.variableDefinition) {
      return new VariableDefinition(parent);
    } else if (type === FrameType.whileLoop) {
      return new WhileLoop(parent);
    } else if (type === FrameType.commentFrame) {
      return new CommentFrame(parent);
    } else {
      throw new Error(`FrameType: ${type.toString()} not supported`);
    }
  }
}

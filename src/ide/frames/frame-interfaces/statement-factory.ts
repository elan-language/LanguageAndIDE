import { Frame } from "./frame";
import { Parent } from "./parent";

export interface StatementFactory {
  newAssert(parent: Parent): Frame;
  newCall(parent: Parent, procName: string): Frame;
  newCatch(parent: Parent): Frame;
  newElif(parent: Parent): Frame;
  newElse(parent: Parent): Frame;
  newFor(parent: Parent): Frame;
  newIf(parent: Parent): Frame;
  newLetStatement(parent: Parent): Frame;
  newSet(parent: Parent): Frame;
  newThrow(parent: Parent): Frame;
  newTryCatch(parent: Parent): Frame;
  newVar(parent: Parent): Frame;
  newWhile(parent: Parent): Frame;
  newWithPropertyUpdate(parent: Parent): Frame;
  newComment(parent: Parent): Frame;
}

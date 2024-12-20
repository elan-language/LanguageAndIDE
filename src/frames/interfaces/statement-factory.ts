import { Frame } from "./frame";
import { Parent } from "./parent";

export interface StatementFactory {
  newAssert(parent: Parent): Frame;
  newCall(parent: Parent): Frame;
  newCase(parent: Parent): Frame;
  newEach(parent: Parent): Frame;
  newElse(parent: Parent): Frame;
  newFor(parent: Parent): Frame;
  newIf(parent: Parent): Frame;
  newLet(parent: Parent): Frame;
  newOtherwise(parent: Parent): Frame;
  newPrint(parent: Parent): Frame;
  newRepeat(parent: Parent): Frame;
  newSet(parent: Parent): Frame;
  newSwitch(parent: Parent): Frame;
  newThrow(parent: Parent): Frame;
  newTryCatch(parent: Parent): Frame;
  newVar(parent: Parent): Frame;
  newWhile(parent: Parent): Frame;
  newComment(parent: Parent): Frame;
}

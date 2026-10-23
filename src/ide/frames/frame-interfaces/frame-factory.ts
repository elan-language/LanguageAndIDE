import { Frame } from "./frame";
import { Parent } from "./parent";

export interface FrameFactory {
  // Globals
  createMain(parent: Parent): Frame;
  createFunction(parent: Parent): Frame;
  createProcedure(parent: Parent): Frame;
  createEnum(parent: Parent): Frame;
  createConcreteClass(parent: Parent): Frame;
  createAbstractClass(parent: Parent): Frame;
  createComment(parent: Parent): Frame;
  createConstant(parent: Parent): Frame;
  createTest(parent: Parent): Frame;

  // Statements
  createAssert(parent: Parent): Frame;
  createCall(parent: Parent, procName: string): Frame;
  createCatch(parent: Parent): Frame;
  createElseIf(parent: Parent): Frame;
  createElse(parent: Parent): Frame;
  createFor(parent: Parent): Frame;
  createIf(parent: Parent): Frame;
  createSet(parent: Parent): Frame;
  createThrow(parent: Parent): Frame;
  createTryCatch(parent: Parent): Frame;
  createVar(parent: Parent): Frame;
  createWhile(parent: Parent): Frame;
  createComment(parent: Parent): Frame;

  // Members
  createConstructor(parent: Parent): Frame;
  createFunctionMethod(parent: Parent, priv: boolean): Frame;
  createProperty(parent: Parent, priv: boolean): Frame;
  createProcedureMethod(parent: Parent, priv: boolean): Frame;
  createAbstractFunction(parent: Parent): Frame;
  createAbstractProcedure(parent: Parent): Frame;
}

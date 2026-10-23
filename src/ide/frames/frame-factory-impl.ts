import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { CommentFrame } from "./comment-frame";
import { Frame } from "./frame-interfaces/frame";
import { FrameFactory } from "./frame-interfaces/frame-factory";
import { Parent } from "./frame-interfaces/parent";
import { AbstractClass } from "./globals/abstract-class";
import { ConcreteClass } from "./globals/concrete-class";
import { ConstantGlobal } from "./globals/constant-global";
import { Enum } from "./globals/enum";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { MainRoutine } from "./globals/main-routine";
import { TestFrame } from "./globals/test-frame";
import { AssertStatement } from "./statements/assert-statement";
import { Assignment } from "./statements/assignment";
import { CatchStatement } from "./statements/catch-statement";
import { ElseClause } from "./statements/else-clause";
import { ElseIfClause } from "./statements/elseIf-clause";
import { ForLoop } from "./statements/forLoop";
import { IfStatement } from "./statements/if-statement";
import { ProcedureCall } from "./statements/procedureCall";
import { ThrowStatement } from "./statements/throw-statement";
import { TryStatement } from "./statements/try-statement";
import { VariableStatement } from "./statements/variable-statement";
import { WhileLoop } from "./statements/whileLoop";

export class FrameFactoryImpl implements FrameFactory {
  // Globals
  createMain(parent: Parent): Frame {
    return new MainRoutine(parent);
  }
  createFunction(parent: Parent): Frame {
    return new GlobalFunction(parent);
  }
  createProcedure(parent: Parent): Frame {
    return new GlobalProcedure(parent);
  }
  createEnum(parent: Parent): Frame {
    return new Enum(parent);
  }
  createConcreteClass(parent: Parent): Frame {
    return new ConcreteClass(parent);
  }
  createAbstractClass(parent: Parent): Frame {
    return new AbstractClass(parent);
  }
  createComment(parent: Parent): Frame {
    return new CommentFrame(parent);
  }
  createConstant(parent: Parent): Frame {
    return new ConstantGlobal(parent);
  }
  createTest(parent: Parent): Frame {
    return new TestFrame(parent);
  }

  // Statements
  public createAssert(parent: Parent): Frame {
    return new AssertStatement(parent);
  }
  public createCall(parent: Parent, procName = ""): Frame {
    const call = new ProcedureCall(parent);
    if (procName !== "") {
      call.proc.setFieldToKnownValidText(procName);
    }
    return call;
  }
  public createCatch(parent: Parent): Frame {
    return new CatchStatement(parent);
  }
  public createElseIf(parent: Parent): Frame {
    return new ElseIfClause(parent);
  }
  public createElse(parent: Parent): Frame {
    return new ElseClause(parent);
  }
  public createFor(parent: Parent): Frame {
    return new ForLoop(parent);
  }
  public createIf(parent: Parent): Frame {
    return new IfStatement(parent);
  }
  public createSet(parent: Parent): Frame {
    return new Assignment(parent);
  }
  public createThrow(parent: Parent): Frame {
    return new ThrowStatement(parent);
  }
  public createTryCatch(parent: Parent): Frame {
    return new TryStatement(parent);
  }
  public createVar(parent: Parent): Frame {
    return new VariableStatement(parent);
  }
  public createWhile(parent: Parent): Frame {
    return new WhileLoop(parent);
  }

  // Members
  createConstructor(parent: Parent): Frame {
    return new Constructor(parent);
  }
  createFunctionMethod(parent: Parent, priv: boolean): Frame {
    return new FunctionMethod(parent, priv);
  }
  createProperty(parent: Parent, priv: boolean): Frame {
    return new Property(parent, priv);
  }
  createProcedureMethod(parent: Parent, priv: boolean): Frame {
    return new ProcedureMethod(parent, priv);
  }
  createAbstractFunction(parent: Parent): Frame {
    return new AbstractFunction(parent);
  }
  createAbstractProcedure(parent: Parent): Frame {
    return new AbstractProcedure(parent);
  }
}

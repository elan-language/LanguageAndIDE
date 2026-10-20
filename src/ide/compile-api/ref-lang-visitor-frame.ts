import {
  AbstractClassContext,
  AbstractFunctionContext,
  AbstractProcedureContext,
  AssignmentContext,
  CommentContext,
  ConcreteClassContext,
  ConstantContext,
  ConstructorMemberContext,
  EnumContext,
  FileContext,
  ForLoopContext,
  FunctionContext,
  FunctionMethodContext,
  IfStatementContext,
  MainContext,
  ProcedureCallContext,
  ProcedureContext,
  ProcedureMethodContext,
  PropertyContext,
  TestContext,
  ThrowStatementContext,
  TryStatementContext,
  VariableDefinitionContext,
  WhileLoopContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { AbstractFunction } from "../frames/class-members/abstract-function";
import { Constructor } from "../frames/class-members/constructor";
import { FunctionMethod } from "../frames/class-members/function-method";
import { Property } from "../frames/class-members/property";
import { CommentFrame } from "../frames/comment-frame";
import { File } from "../frames/frame-interfaces/file";
import { Frame } from "../frames/frame-interfaces/frame";
import { ConcreteClass } from "../frames/globals/concrete-class";
import { ConstantGlobal } from "../frames/globals/constant-global";
import { Enum } from "../frames/globals/enum";
import { GlobalFunction } from "../frames/globals/global-function";
import { GlobalProcedure } from "../frames/globals/global-procedure";
import { MainRoutine } from "../frames/globals/main-routine";
import { TestFrame } from "../frames/globals/test-frame";
import { Assignment } from "../frames/statements/assignment";
import { ForLoop } from "../frames/statements/forLoop";
import { IfStatement } from "../frames/statements/if-statement";
import { ProcedureCall } from "../frames/statements/procedureCall";
import { ThrowStatement } from "../frames/statements/throw-statement";
import { TryStatement } from "../frames/statements/try-statement";
import { VariableStatement } from "../frames/statements/variable-statement";
import { WhileLoop } from "../frames/statements/whileLoop";

export class RefLangVisitorFrame extends RefLangVisitor<File | Frame> {
  constructor(private readonly file: File) {
    super();
  }

  override visitFile = (ctx: FileContext) => {
    const globals = ctx.global().map((g) => this.visit(g)) as Frame[];

    for (const g of globals) {
      this.file.addChild(g);
    }
    return this.file!;
  };

  override visitComment? = (ctx: CommentContext) => {
    const com = new CommentFrame(this.file);
    com.textIncludingMarkerSymboAndSpace.setFieldToKnownValidText(ctx.commentText().getText());
    return com;
  };

  // Globals

  override visitMain = (ctx: MainContext) => {
    const main = new MainRoutine(this.file);
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      main.getChildren().push(s);
    }
    return main;
  };

  override visitConstant = (ctx: ConstantContext) => {
    const name = ctx.identifierDef().getText();
    const value = ctx.constantValue().getText();
    const gc = new ConstantGlobal(this.file!);
    gc.name.setFieldToKnownValidText(name);
    gc.value.setFieldToKnownValidText(value);
    return gc;
  };

  override visitProcedure = (ctx: ProcedureContext) => {
    const proc = new GlobalProcedure(this.file);
    proc.name.setFieldToKnownValidText(ctx.methodName().getText());
    proc.params.setFieldToKnownValidText(ctx.paramList() ? ctx.paramList()!.getText() : "");
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      proc.getChildren().push(s);
    }
    return proc;
  };

  override visitFunction = (ctx: FunctionContext) => {
    const func = new GlobalFunction(this.file);
    func.name.setFieldToKnownValidText(ctx.methodName().getText());
    func.params.setFieldToKnownValidText(ctx.paramList() ? ctx.paramList()!.getText() : "");
    func.returnType.setFieldToKnownValidText(ctx.type().getText());
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      func.getChildren().push(s);
    }
    return func;
  };

  override visitTest = (ctx: TestContext) => {
    const test = new TestFrame(this.file);
    test.testName.setFieldToKnownValidText(ctx.testName().getText());
    // TODO
    // const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    // for (const s of statements) {
    //   test.getChildren().push(s);
    // }
    return test;
  };

  override visitEnum = (ctx: EnumContext) => {
    const enum_ = new Enum(this.file);
    enum_.name.setFieldToKnownValidText(ctx.typeName().getText());
    enum_.values.setFieldToKnownValidText(ctx.identifierList().getText());
    return enum_;
  };

  override visitConcreteClass = (ctx: ConcreteClassContext) => {
    const cls = new ConcreteClass(this.file);
    cls.name.setFieldToKnownValidText(ctx._classTypeName!.getText());
    cls.inheritance.setFieldToKnownValidText(
      ctx._inheritsTypeName ? ctx._inheritsTypeName!.getText() : "",
    );
    const members = ctx.concreteClassMember().map((s) => this.visit(s)) as Frame[];
    for (const s of members) {
      cls.getChildren().push(s);
    }
    return cls;
  };

  override visitAbstractClass = (ctx: AbstractClassContext) => {
    const cls = new ConcreteClass(this.file);
    cls.name.setFieldToKnownValidText(ctx._classTypeName!.getText());
    cls.inheritance.setFieldToKnownValidText(
      ctx._inheritsTypeName ? ctx._inheritsTypeName!.getText() : "",
    );
    const members = ctx.abstractClassMember().map((s) => this.visit(s)) as Frame[];
    for (const s of members) {
      cls.getChildren().push(s);
    }
    return cls;
  };

  // Statements
  override visitVariableDefinition = (ctx: VariableDefinitionContext) => {
    const varDef = new VariableStatement(this.file);
    varDef.name.setFieldToKnownValidText(ctx.identifierDef().getText());
    varDef.expr.setFieldToKnownValidText(ctx.expression().getText());
    return varDef;
  };

  override visitAssignment = (ctx: AssignmentContext) => {
    const assignment = new Assignment(this.file);
    assignment.assignable.setFieldToKnownValidText(ctx.assignable().getText());
    assignment.expr.setFieldToKnownValidText(ctx.expression().getText());
    return assignment;
  };

  override visitIfStatement = (ctx: IfStatementContext) => {
    const if_ = new IfStatement(this.file);
    if_.condition.setFieldToKnownValidText(ctx.expression().getText());
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      if_.getChildren().push(s);
    }
    return if_;
  };

  override visitWhileLoop = (ctx: WhileLoopContext) => {
    const whileLoop = new WhileLoop(this.file);
    whileLoop.condition.setFieldToKnownValidText(ctx.expression().getText());
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      whileLoop.getChildren().push(s);
    }
    return whileLoop;
  };

  override visitForLoop = (ctx: ForLoopContext) => {
    const forLoop = new ForLoop(this.file);
    forLoop.variable.setFieldToKnownValidText(ctx.identifierDef().getText());
    forLoop.iter.setFieldToKnownValidText(ctx.expression().getText());
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      forLoop.getChildren().push(s);
    }
    return forLoop;
  };

  override visitProcedureCall = (ctx: ProcedureCallContext) => {
    const procRef = ctx.procRef().getText();
    const argList = ctx.argList().getText();
    const procedureCall = new ProcedureCall(this.file);
    procedureCall.proc.setFieldToKnownValidText(procRef);
    procedureCall.args.setFieldToKnownValidText(argList);
    return procedureCall;
  };

  override visitTryStatement = (ctx: TryStatementContext) => {
    const trySt = new TryStatement(this.file);
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      trySt.getChildren().push(s);
    }
    return trySt;
  };

  override visitThrowStatement = (ctx: ThrowStatementContext) => {
    const thrw = new ThrowStatement(this.file);
    thrw.type.setFieldToKnownValidText(ctx.typeName().getText());
    thrw.text.setFieldToKnownValidText(ctx.errorMessage().getText());
    return thrw;
  };

  // Members

  override visitConstructorMember = (ctx: ConstructorMemberContext) => {
    const ctor = new Constructor(this.file);
    ctor.params.setFieldToKnownValidText(ctx.paramList() ? ctx.paramList()!.getText() : "");
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      ctor.getChildren().push(s);
    }
    return ctor;
  };

  override visitProperty = (ctx: PropertyContext) => {
    const prop = new Property(this.file);
    prop.name.setFieldToKnownValidText(ctx.identifierDef().getText());
    prop.type.setFieldToKnownValidText(ctx.type().getText());
    return prop;
  };

  override visitFunctionMethod = (ctx: FunctionMethodContext) => {
    const func = new FunctionMethod(this.file);
    func.name.setFieldToKnownValidText(ctx.methodName().getText());
    func.params.setFieldToKnownValidText(ctx.paramList() ? ctx.paramList()!.getText() : "");
    func.returnType.setFieldToKnownValidText(ctx.type().getText());
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      func.getChildren().push(s);
    }
    return func;
  };

  override visitProcedureMethod = (ctx: ProcedureMethodContext) => {
    const proc = new FunctionMethod(this.file);
    proc.name.setFieldToKnownValidText(ctx.methodName().getText());
    proc.params.setFieldToKnownValidText(ctx.paramList() ? ctx.paramList()!.getText() : "");
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      proc.getChildren().push(s);
    }
    return proc;
  };

  override visitAbstractFunction = (ctx: AbstractFunctionContext) => {
    const func = new AbstractFunction(this.file);
    func.name.setFieldToKnownValidText(ctx.methodName().getText());
    func.params.setFieldToKnownValidText(ctx.paramList() ? ctx.paramList()!.getText() : "");
    func.returnType.setFieldToKnownValidText(ctx.type().getText());
    return func;
  };

  override visitAbstractProcedure = (ctx: AbstractProcedureContext) => {
    const func = new AbstractFunction(this.file);
    func.name.setFieldToKnownValidText(ctx.methodName().getText());
    func.params.setFieldToKnownValidText(ctx.paramList() ? ctx.paramList()!.getText() : "");
    return func;
  };
}

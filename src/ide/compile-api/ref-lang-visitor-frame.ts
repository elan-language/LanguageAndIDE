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
  ReturnStatementContext,
  TestContext,
  ThrowStatementContext,
  TryStatementContext,
  VariableDefinitionContext,
  WhileLoopContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { AbstractFunction } from "../frames/class-members/abstract-function";
import { AbstractProcedure } from "../frames/class-members/abstract-procedure";
import { Constructor } from "../frames/class-members/constructor";
import { FunctionMethod } from "../frames/class-members/function-method";
import { ProcedureMethod } from "../frames/class-members/procedure-method";
import { Property } from "../frames/class-members/property";
import { CommentFrame } from "../frames/comment-frame";
import { File } from "../frames/frame-interfaces/file";
import { Frame } from "../frames/frame-interfaces/frame";
import { AbstractClass } from "../frames/globals/abstract-class";
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
import { ReturnStatement } from "../frames/statements/return-statement";
import { ThrowStatement } from "../frames/statements/throw-statement";
import { TryStatement } from "../frames/statements/try-statement";
import { VariableStatement } from "../frames/statements/variable-statement";
import { WhileLoop } from "../frames/statements/whileLoop";
import { RefLangVisitorSource } from "./ref-lang-visitor-source";

export class RefLangVisitorFrame extends RefLangVisitor<File | Frame> {
  constructor(private readonly file: File) {
    super();
    this.sourceVisitor = new RefLangVisitorSource(file.language());
  }

  private sourceVisitor;

  override visitFile = (ctx: FileContext) => {
    const globals = ctx.global().map((g) => this.visit(g)) as Frame[];

    for (const g of globals) {
      this.file.addChild(g);
    }
    this.file.updateAllParseStatus();
    return this.file!;
  };

  override visitComment? = (ctx: CommentContext) => {
    const com = new CommentFrame(this.file);
    const text = this.sourceVisitor.visit(ctx.commentText())!;
    com.text.setFieldToKnownValidText(text);
    com.updateParseStatus();
    return com;
  };

  // Globals

  override visitMain = (ctx: MainContext) => {
    const main = new MainRoutine(this.file);
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      main.getChildren().push(s);
    }
    main.updateParseStatus();
    return main;
  };

  override visitConstant = (ctx: ConstantContext) => {
    const name = this.sourceVisitor.visit(ctx.identifierDef()!)!;
    const value = this.sourceVisitor.visit(ctx.constantValue()!)!;
    const gc = new ConstantGlobal(this.file!);
    gc.name.setFieldToKnownValidText(name);
    gc.value.setFieldToKnownValidText(value);
    gc.updateParseStatus();
    return gc;
  };

  override visitProcedure = (ctx: ProcedureContext) => {
    const proc = new GlobalProcedure(this.file);
    proc.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    proc.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      proc.getChildren().push(s);
    }
    proc.updateParseStatus();
    return proc;
  };

  override visitFunction = (ctx: FunctionContext) => {
    const func = new GlobalFunction(this.file);
    func.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    func.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    func.returnType.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.type()!)!);

    func.getChildren().pop();

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      func.getChildren().push(s);
    }

    const returnStatement = this.visit(ctx.returnStatement()!) as Frame;
    func.getChildren().push(returnStatement);
    func.updateParseStatus();
    return func;
  };

  override visitTest = (ctx: TestContext) => {
    const test = new TestFrame(this.file);
    test.testName.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.testName()!)!);
    // TODO
    // const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    // for (const s of statements) {
    //   test.getChildren().push(s);
    // }
    test.updateParseStatus();
    return test;
  };

  override visitEnum = (ctx: EnumContext) => {
    const enum_ = new Enum(this.file);
    enum_.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.typeName()!)!);
    enum_.values.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.identifierList()!)!);
    enum_.updateParseStatus();
    return enum_;
  };

  override visitConcreteClass = (ctx: ConcreteClassContext) => {
    const cls = new ConcreteClass(this.file);

    cls.getChildren().length = 0;

    cls.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx._classTypeName!)!);
    cls.inheritance.setFieldToKnownValidText(
      ctx._inheritsTypeName ? this.sourceVisitor.visit(ctx._inheritsTypeName)! : "",
    );
    const members = ctx.concreteClassMember().map((s) => this.visit(s)) as Frame[];
    for (const s of members) {
      cls.getChildren().push(s);
    }
    cls.updateParseStatus();
    return cls;
  };

  override visitAbstractClass = (ctx: AbstractClassContext) => {
    const cls = new AbstractClass(this.file);
    cls.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx._classTypeName!)!);
    cls.inheritance.setFieldToKnownValidText(
      ctx._inheritsTypeName ? this.sourceVisitor.visit(ctx._inheritsTypeName)! : "",
    );
    const members = ctx.abstractClassMember().map((s) => this.visit(s)) as Frame[];
    for (const s of members) {
      cls.getChildren().push(s);
    }
    cls.updateParseStatus();
    return cls;
  };

  // Statements
  override visitVariableDefinition = (ctx: VariableDefinitionContext) => {
    const varDef = new VariableStatement(this.file);
    varDef.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.identifierDef()!)!);
    varDef.expr.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    varDef.updateParseStatus();
    return varDef;
  };

  override visitAssignment = (ctx: AssignmentContext) => {
    const assignment = new Assignment(this.file);
    assignment.assignable.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.assignable()!)!);
    assignment.expr.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    assignment.updateParseStatus();
    return assignment;
  };

  override visitIfStatement = (ctx: IfStatementContext) => {
    const if_ = new IfStatement(this.file);
    if_.condition.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    const children = if_.getChildren();
    const thenClause = this.visit(ctx.thenClause()) as Frame;
    children.push(thenClause);
    const elseClauses = ctx.elseIfClause().map((s) => this.visit(s)) as Frame[];
    for (const s of elseClauses) {
      children.push(s);
    }
    const elseClause = ctx.elseClause();
    if (elseClause) {
      children.push(this.visit(elseClause!) as Frame);
    }
    if_.updateParseStatus();
    return if_;
  };

  override visitWhileLoop = (ctx: WhileLoopContext) => {
    const whileLoop = new WhileLoop(this.file);
    whileLoop.condition.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      whileLoop.getChildren().push(s);
    }
    whileLoop.updateParseStatus();
    return whileLoop;
  };

  override visitForLoop = (ctx: ForLoopContext) => {
    const forLoop = new ForLoop(this.file);
    forLoop.variable.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.identifierDef()!)!);
    forLoop.iter.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      forLoop.getChildren().push(s);
    }
    forLoop.updateParseStatus();
    return forLoop;
  };

  override visitProcedureCall = (ctx: ProcedureCallContext) => {
    const procedureCall = new ProcedureCall(this.file);
    procedureCall.procRef.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.term())!);
    procedureCall.updateParseStatus();
    return procedureCall;
  };

  override visitTryStatement = (ctx: TryStatementContext) => {
    const trySt = new TryStatement(this.file);
    const children = trySt.getChildren();
    const tryClause = this.visit(ctx.tryClause()) as Frame;
    children.push(tryClause);
    const catchClauses = ctx.catchClause().map((s) => this.visit(s)) as Frame[];
    for (const s of catchClauses) {
      children.push(s);
    }
    trySt.updateParseStatus();
    return trySt;
  };

  override visitThrowStatement = (ctx: ThrowStatementContext) => {
    const thrw = new ThrowStatement(this.file);
    thrw.type.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.typeName()!)!);
    thrw.text.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.errorMessage()!)!);
    thrw.updateParseStatus();
    return thrw;
  };

  // Members

  override visitConstructorMember = (ctx: ConstructorMemberContext) => {
    const ctor = new Constructor(this.file);
    ctor.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      ctor.getChildren().push(s);
    }
    ctor.updateParseStatus();
    return ctor;
  };

  override visitProperty = (ctx: PropertyContext) => {
    const prop = new Property(this.file);
    prop.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.identifierDef()!)!);
    prop.type.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.type()!)!);
    prop.updateParseStatus();
    return prop;
  };

  override visitFunctionMethod = (ctx: FunctionMethodContext) => {
    const func = new FunctionMethod(this.file);
    func.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    func.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    func.returnType.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.type()!)!);

    func.getChildren().pop();

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      func.getChildren().push(s);
    }

    const returnStatement = this.visit(ctx.returnStatement()!) as Frame;
    func.getChildren().push(returnStatement);

    func.updateParseStatus();
    return func;
  };

  override visitProcedureMethod = (ctx: ProcedureMethodContext) => {
    const proc = new ProcedureMethod(this.file);
    proc.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    proc.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      proc.getChildren().push(s);
    }
    proc.updateParseStatus();
    return proc;
  };

  override visitAbstractFunction = (ctx: AbstractFunctionContext) => {
    const func = new AbstractFunction(this.file);
    func.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    func.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    func.returnType.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.type()!)!);
    func.updateParseStatus();
    return func;
  };

  override visitAbstractProcedure = (ctx: AbstractProcedureContext) => {
    const func = new AbstractProcedure(this.file);
    func.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    func.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    func.updateParseStatus();
    return func;
  };

  override visitReturnStatement = (ctx: ReturnStatementContext) => {
    const rt = new ReturnStatement(this.file);
    rt.expr.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    rt.updateParseStatus();
    return rt;
  };
}

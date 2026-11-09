import {
  AbstractClassContext,
  AbstractFunctionContext,
  AbstractProcedureContext,
  AssertContext,
  AssignmentContext,
  CatchClauseContext,
  CommentContext,
  ConcreteClassContext,
  ConstantContext,
  ConstructorMemberContext,
  ElseClauseContext,
  ElseIfClauseContext,
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
  ThenClauseContext,
  ThrowStatementContext,
  TryClauseContext,
  TryStatementContext,
  VariableDefinitionContext,
  WhileLoopContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
import { AbstractFunction } from "../frames/class-members/abstract-function";
import { AbstractProcedure } from "../frames/class-members/abstract-procedure";
import { Constructor } from "../frames/class-members/constructor";
import { FunctionMethod } from "../frames/class-members/function-method";
import { ProcedureMethod } from "../frames/class-members/procedure-method";
import { Property } from "../frames/class-members/property";
import { CommentFrame } from "../frames/comment-frame";
import { File } from "../frames/frame-interfaces/file";
import { Frame } from "../frames/frame-interfaces/frame";
import { Parent } from "../frames/frame-interfaces/parent";
import { AbstractClass } from "../frames/globals/abstract-class";
import { ConcreteClass } from "../frames/globals/concrete-class";
import { ConstantGlobal } from "../frames/globals/constant-global";
import { Enum } from "../frames/globals/enum";
import { GlobalFunction } from "../frames/globals/global-function";
import { GlobalProcedure } from "../frames/globals/global-procedure";
import { MainRoutine } from "../frames/globals/main-routine";
import { TestFrame } from "../frames/globals/test-frame";
import { AssertStatement } from "../frames/statements/assert-statement";
import { Assignment } from "../frames/statements/assignment";
import { CatchClause } from "../frames/statements/catch-clause";
import { ElseClause } from "../frames/statements/else-clause";
import { ElseIfClause } from "../frames/statements/elseIf-clause";
import { ForLoop } from "../frames/statements/forLoop";
import { IfStatement } from "../frames/statements/if-statement";
import { ProcedureCall } from "../frames/statements/procedureCall";
import { ReturnStatement } from "../frames/statements/return-statement";
import { ThenClause } from "../frames/statements/then-clause";
import { ThrowStatement } from "../frames/statements/throw-statement";
import { TryClause } from "../frames/statements/try-clause";
import { TryStatement } from "../frames/statements/try-statement";
import { VariableDefinition } from "../frames/statements/variable-definition";
import { WhileLoop } from "../frames/statements/whileLoop";
import { PythonVisitorSource } from "./python-visitor-source";

export class PythonVisitorFrame extends PythonVisitor<File | Frame> {
  constructor(private readonly file: File) {
    super();
    this.sourceVisitor = new PythonVisitorSource(file.language());
    this.parent = file;
  }

  private parent: Parent;

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
    const com = new CommentFrame(this.parent);
    if (ctx.GHOSTED_LINE()) {
      com.setGhosted(true);
    }
    const text = this.sourceVisitor.visit(ctx.commentText())!;
    com.text.setFieldToKnownValidText(text);
    com.updateParseStatus();
    return com;
  };

  // Globals

  override visitMain = (ctx: MainContext) => {
    const main = new MainRoutine(this.file);
    if (ctx.GHOSTED_BLOCK_START()) {
      main.setGhosted(true);
    }
    const previousParent = this.parent;
    this.parent = main;
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      main.getChildren().push(s);
    }
    this.parent = previousParent;
    main.updateParseStatus();
    return main;
  };

  override visitConstant = (ctx: ConstantContext) => {
    const name = this.sourceVisitor.visit(ctx.identifierDef()!)!;
    const value = this.sourceVisitor.visit(ctx.constantValue()!)!;
    const gc = new ConstantGlobal(this.file);
    if (ctx.GHOSTED_LINE()) {
      gc.setGhosted(true);
    }
    gc.name.setFieldToKnownValidText(name);
    gc.value.setFieldToKnownValidText(value);
    gc.updateParseStatus();
    return gc;
  };

  override visitProcedure = (ctx: ProcedureContext) => {
    const proc = new GlobalProcedure(this.file);
    if (ctx.GHOSTED_BLOCK_START()) {
      proc.setGhosted(true);
    }
    proc.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    proc.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    this.parent = proc;
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      proc.getChildren().push(s);
    }
    proc.updateParseStatus();
    return proc;
  };

  override visitFunction = (ctx: FunctionContext) => {
    const func = new GlobalFunction(this.file);
    if (ctx.GHOSTED_BLOCK_START()) {
      func.setGhosted(true);
    }
    func.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    func.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    func.returnType.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.type()!)!);

    func.getChildren().pop();

    this.parent = func;
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
    if (ctx.GHOSTED_BLOCK_START()) {
      test.setGhosted(true);
    }
    test.testName.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.testName()!)!);
    this.parent = test;
    const statements = ctx.testStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      test.getChildren().push(s);
    }
    test.updateParseStatus();
    return test;
  };

  override visitEnum = (ctx: EnumContext) => {
    const enum_ = new Enum(this.file);
    if (ctx.GHOSTED_BLOCK_START()) {
      enum_.setGhosted(true);
    }
    enum_.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.typeName()!)!);
    enum_.values.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.enumList()!)!);
    enum_.updateParseStatus();
    return enum_;
  };

  override visitConcreteClass = (ctx: ConcreteClassContext) => {
    const cls = new ConcreteClass(this.file);
    if (ctx.GHOSTED_BLOCK_START()) {
      cls.setGhosted(true);
    }
    cls.getChildren().length = 0;

    cls.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx._classTypeName!)!);
    cls.inheritance.setFieldToKnownValidText(
      ctx._inheritsTypeName ? this.sourceVisitor.visit(ctx._inheritsTypeName)! : "",
    );
    this.parent = cls;

    const ctor = ctx.constructorMember() ? this.visit(ctx.constructorMember()) : undefined;

    if (ctor) {
      cls.getChildren().push(ctor as Frame);
    }

    const members = ctx.concreteClassMember().map((s) => this.visit(s)) as Frame[];
    for (const s of members) {
      cls.getChildren().push(s);
    }
    cls.updateParseStatus();
    return cls;
  };

  override visitAbstractClass = (ctx: AbstractClassContext) => {
    const cls = new AbstractClass(this.file);
    if (ctx.GHOSTED_BLOCK_START()) {
      cls.setGhosted(true);
    }
    cls.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx._classTypeName!)!);
    cls.inheritance.setFieldToKnownValidText(
      ctx._inheritsTypeName ? this.sourceVisitor.visit(ctx._inheritsTypeName)! : "",
    );
    const previousParent = this.parent;
    this.parent = cls;

    const members = ctx.abstractClassMember().map((s) => this.visit(s)) as Frame[];
    for (const s of members) {
      cls.getChildren().push(s);
    }
    cls.updateParseStatus();
    this.parent = previousParent;
    return cls;
  };

  // Statements
  override visitVariableDefinition = (ctx: VariableDefinitionContext) => {
    const varDef = new VariableDefinition(this.parent);
    if (ctx.GHOSTED_LINE()) {
      varDef.setGhosted(true);
    }
    varDef.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.identifierDef()!)!);
    varDef.expr.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    varDef.updateParseStatus();
    return varDef;
  };

  override visitAssert = (ctx: AssertContext) => {
    const assert = new AssertStatement(this.parent);
    if (ctx.GHOSTED_LINE()) {
      assert.setGhosted(true);
    }
    assert.actual.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.assertActual()!)!);
    assert.expected.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.assertExpected()!)!);
    assert.updateParseStatus();
    return assert;
  };

  override visitAssignment = (ctx: AssignmentContext) => {
    const assignment = new Assignment(this.parent);
    if (ctx.GHOSTED_LINE()) {
      assignment.setGhosted(true);
    }
    assignment.assignable.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.assignable()!)!);
    assignment.expr.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    assignment.updateParseStatus();
    return assignment;
  };

  override visitIfStatement = (ctx: IfStatementContext) => {
    const if_ = new IfStatement(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      if_.setGhosted(true);
    }
    if_.getChildren().length = 0;
    if_.condition.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);

    const previousParent = this.parent;
    this.parent = if_;

    const children = if_.getChildren();
    const thenClause = this.visit(ctx.thenClause()) as Frame;
    children.push(thenClause);
    const elseIfClauses = ctx.elseIfClause().map((s) => this.visit(s)) as Frame[];
    for (const s of elseIfClauses) {
      children.push(s);
    }
    const elseClause = ctx.elseClause();
    if (elseClause) {
      children.push(this.visit(elseClause!) as Frame);
    }
    if_.updateParseStatus();
    this.parent = previousParent;
    return if_;
  };

  override visitWhileLoop = (ctx: WhileLoopContext) => {
    const whileLoop = new WhileLoop(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      whileLoop.setGhosted(true);
    }
    whileLoop.condition.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    const previousParent = this.parent;
    this.parent = whileLoop;

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      whileLoop.getChildren().push(s);
    }
    whileLoop.updateParseStatus();
    this.parent = previousParent;
    return whileLoop;
  };

  override visitForLoop = (ctx: ForLoopContext) => {
    const forLoop = new ForLoop(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      forLoop.setGhosted(true);
    }
    forLoop.variable.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.identifierDef()!)!);
    forLoop.iter.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    const previousParent = this.parent;
    this.parent = forLoop;

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      forLoop.getChildren().push(s);
    }
    forLoop.updateParseStatus();
    this.parent = previousParent;
    return forLoop;
  };

  override visitProcedureCall = (ctx: ProcedureCallContext) => {
    const procedureCall = new ProcedureCall(this.parent);
    if (ctx.GHOSTED_LINE()) {
      procedureCall.setGhosted(true);
    }
    procedureCall.procRef.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.term())!);
    procedureCall.updateParseStatus();
    return procedureCall;
  };

  override visitTryStatement = (ctx: TryStatementContext) => {
    const trySt = new TryStatement(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      trySt.setGhosted(true);
    }
    const children = trySt.getChildren();
    children.length = 0;

    const previousParent = this.parent;
    this.parent = trySt;

    const tryClause = this.visit(ctx.tryClause()) as Frame;
    children.push(tryClause);
    const catchClauses = ctx.catchClause().map((s) => this.visit(s)) as Frame[];
    for (const s of catchClauses) {
      children.push(s);
    }
    trySt.updateParseStatus();
    this.parent = previousParent;
    return trySt;
  };

  override visitThrowStatement = (ctx: ThrowStatementContext) => {
    const thrw = new ThrowStatement(this.parent);
    if (ctx.GHOSTED_LINE()) {
      thrw.setGhosted(true);
    }
    thrw.type.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.typeName()!)!);
    thrw.text.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.errorMessage()!)!);
    thrw.updateParseStatus();
    return thrw;
  };

  // Members

  override visitConstructorMember = (ctx: ConstructorMemberContext) => {
    const ctor = new Constructor(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      ctor.setGhosted(true);
    }
    ctor.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    const previousParent = this.parent;
    this.parent = ctor;

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      ctor.getChildren().push(s);
    }
    ctor.updateParseStatus();
    this.parent = previousParent;
    return ctor;
  };

  override visitProperty = (ctx: PropertyContext) => {
    const prop = new Property(this.parent);
    if (ctx.GHOSTED_LINE()) {
      prop.setGhosted(true);
    }
    prop.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.identifierDef()!)!);
    prop.type.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.type()!)!);
    prop.updateParseStatus();
    return prop;
  };

  override visitFunctionMethod = (ctx: FunctionMethodContext) => {
    const func = new FunctionMethod(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      func.setGhosted(true);
    }
    func.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    func.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    func.returnType.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.type()!)!);
    const previousParent = this.parent;
    this.parent = func;

    func.getChildren().length = 0;

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      func.getChildren().push(s);
    }

    const returnStatement = this.visit(ctx.returnStatement()!) as Frame;
    func.getChildren().push(returnStatement);

    func.updateParseStatus();
    this.parent = previousParent;
    return func;
  };

  override visitProcedureMethod = (ctx: ProcedureMethodContext) => {
    const proc = new ProcedureMethod(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      proc.setGhosted(true);
    }
    proc.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    proc.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    const previousParent = this.parent;
    this.parent = proc;

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      proc.getChildren().push(s);
    }
    proc.updateParseStatus();
    this.parent = previousParent;
    return proc;
  };

  override visitAbstractFunction = (ctx: AbstractFunctionContext) => {
    const func = new AbstractFunction(this.parent);
    if (ctx.GHOSTED_LINE()) {
      func.setGhosted(true);
    }
    func.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    func.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    func.returnType.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.type()!)!);
    func.updateParseStatus();
    return func;
  };

  override visitAbstractProcedure = (ctx: AbstractProcedureContext) => {
    const proc = new AbstractProcedure(this.parent);
    if (ctx.GHOSTED_LINE()) {
      proc.setGhosted(true);
    }
    proc.name.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.methodName()!)!);
    proc.params.setFieldToKnownValidText(
      ctx.paramList() ? this.sourceVisitor.visit(ctx.paramList()!)! : "",
    );
    proc.updateParseStatus();
    return proc;
  };

  override visitReturnStatement = (ctx: ReturnStatementContext) => {
    const rt = new ReturnStatement(this.parent);
    rt.expr.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    rt.updateParseStatus();
    return rt;
  };

  override visitThenClause = (ctx: ThenClauseContext) => {
    const thenClause = new ThenClause(this.parent);
    const previousParent = this.parent;
    this.parent = thenClause;
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      thenClause.getChildren().push(s);
    }
    thenClause.updateParseStatus();
    this.parent = previousParent;
    return thenClause;
  };

  override visitElseIfClause = (ctx: ElseIfClauseContext) => {
    const elseIfClause = new ElseIfClause(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      elseIfClause.setGhosted(true);
    }
    elseIfClause.condition.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.expression()!)!);
    const previousParent = this.parent;
    this.parent = elseIfClause;

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      elseIfClause.getChildren().push(s);
    }
    elseIfClause.updateParseStatus();
    this.parent = previousParent;
    return elseIfClause;
  };

  override visitElseClause = (ctx: ElseClauseContext) => {
    const elseClause = new ElseClause(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      elseClause.setGhosted(true);
    }
    const previousParent = this.parent;
    this.parent = elseClause;

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      elseClause.getChildren().push(s);
    }
    elseClause.updateParseStatus();
    this.parent = previousParent;
    return elseClause;
  };

  override visitTryClause = (ctx: TryClauseContext) => {
    const tryClause = new TryClause(this.parent);
    const previousParent = this.parent;
    this.parent = tryClause;

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      tryClause.getChildren().push(s);
    }
    tryClause.updateParseStatus();
    this.parent = previousParent;
    return tryClause;
  };

  override visitCatchClause = (ctx: CatchClauseContext) => {
    const catchClause = new CatchClause(this.parent);
    if (ctx.GHOSTED_BLOCK_START()) {
      catchClause.setGhosted(true);
    }
    catchClause.variable.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.identifierDef()!)!);
    catchClause.exceptionType.setFieldToKnownValidText(this.sourceVisitor.visit(ctx.typeName()!)!);
    const previousParent = this.parent;
    this.parent = catchClause;

    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      catchClause.getChildren().push(s);
    }
    catchClause.updateParseStatus();
    this.parent = previousParent;
    return catchClause;
  };
}

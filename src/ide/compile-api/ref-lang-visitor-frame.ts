import {
  AssignmentContext,
  ConstantContext,
  EnumContext,
  FileContext,
  ForLoopContext,
  IfStatementContext,
  InputStatementContext,
  MainContext,
  PrintContext,
  ProcedureCallContext,
  ProcedureContext,
  VariableDefinitionContext,
  WhileLoopContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { File } from "../frames/frame-interfaces/file";
import { Frame } from "../frames/frame-interfaces/frame";
import { ConstantGlobal } from "../frames/globals/constant-global";
import { Enum } from "../frames/globals/enum";
import { GlobalProcedure } from "../frames/globals/global-procedure";
import { MainRoutine } from "../frames/globals/main-routine";
import { Assignment } from "../frames/statements/assignment";
import { ForLoop } from "../frames/statements/forLoop";
import { IfStatement } from "../frames/statements/if-statement";
import { InputStatement } from "../frames/statements/input-statement";
import { PrintStatement } from "../frames/statements/print-statement";
import { ProcedureCall } from "../frames/statements/procedureCall";
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

  override visitMain = (ctx: MainContext) => {
    const main = new MainRoutine(this.file);
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];
    for (const s of statements) {
      main.getChildren().push(s);
    }
    return main;
  };

  override visitPrint = (ctx: PrintContext) => {
    const expression = ctx.expression()?.getText() ?? "";
    const printStatement = new PrintStatement(this.file);
    if (expression) {
      printStatement.arg.setFieldToKnownValidText(expression);
    }
    return printStatement;
  };

  override visitProcedureCall = (ctx: ProcedureCallContext) => {
    const procRef = ctx.procRef().getText();
    const argList = ctx.argList().getText();
    const procedureCall = new ProcedureCall(this.file);
    procedureCall.proc.setFieldToKnownValidText(procRef);
    procedureCall.args.setFieldToKnownValidText(argList);
    return procedureCall;
  };

  override visitConstant = (ctx: ConstantContext) => {
    const name = ctx.identifierDef().getText();
    const value = ctx.constantValue().getText();
    const gc = new ConstantGlobal(this.file!);
    gc.name.setFieldToKnownValidText(name);
    gc.value.setFieldToKnownValidText(value);
    return gc;
  };

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

  override visitEnum = (ctx: EnumContext) => {
    const name = ctx.typeName().getText();
    const values = ctx.identifierList().getText();
    const enum_ = new Enum(this.file);
    enum_.name.setFieldToKnownValidText(name);
    enum_.values.setFieldToKnownValidText(values);
    return enum_;
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

  override visitInputStatement = (ctx: InputStatementContext) => {
    const inp = new InputStatement(this.file);
    inp.name.setFieldToKnownValidText(ctx.identifierDef().getText());
    inp.prompt.setFieldToKnownValidText(ctx.expression().getText());
    return inp;
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
}

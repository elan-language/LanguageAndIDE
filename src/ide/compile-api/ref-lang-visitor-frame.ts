import {
  ConstantContext,
  FileContext,
  MainContext,
  PrintContext,
  ProcedureCallContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { File } from "../frames/frame-interfaces/file";
import { Frame } from "../frames/frame-interfaces/frame";
import { ConstantGlobal } from "../frames/globals/constant-global";
import { MainRoutine } from "../frames/globals/main-routine";
import { PrintStatement } from "../frames/statements/print-statement";
import { ProcedureCall } from "../frames/statements/procedureCall";

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
    const statements = ctx.ordinaryStatement().map((s) => this.visit(s)) as Frame[];

    const main = new MainRoutine(this.file);

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
}

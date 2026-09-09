import { TerminalNode } from "antlr4ng";
import {
  TypeTupleContext,
  TypeNameContext,
  TypeGenericContext,
  TypeContext,
  TypeFuncContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
import { PythonLexer } from "../../generated/python/PythonLexer";
import { filterTokens, getTokenText, visitType } from "./parser-helpers";

export class PythonVisitorSource extends PythonVisitor<string> {
  constructor() {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => {
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => filterTokens(s))
      .join(", ");
    return `tuple[${types}]`;
  };

  visitTypeName = (ctx: TypeNameContext) => {
    return this.visitChildren(ctx)!;
  };

  visitTypeGeneric = (ctx: TypeGenericContext) => {
    const typeName = this.visit(ctx.typeName());
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => filterTokens(s))
      .join(", ");

    return `${typeName}[${types}]`;
  };

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => filterTokens(s));

    const returnType = types[types.length - 1];
    const inTypes = types.slice(0, -1).join(", ");

    return `Callable[[${inTypes}]${returnType}]`;
  };

  override visitType = (context: TypeContext) => {
    return visitType<string>(this, context);
  };

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(PythonLexer.literalNames, ctx);
  }
}

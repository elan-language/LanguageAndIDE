import { TerminalNode } from "antlr4ng";
import {
  TypeTupleContext,
  TypeNameContext,
  TypeGenericContext,
  TypeContext,
  TypeFuncContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";

export class PythonVisitorSource extends PythonVisitor<string> {
  constructor() {
    super();
  }

  filterTokens(s: string | null) {
    return s && s.trim() && s !== "(" && s !== ")" && s !== ",";
  }

  visitTypeTuple = (ctx: TypeTupleContext) => {
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => this.filterTokens(s))
      .join(", ");
    return `(${types})`;
  };

  visitTypeName = (ctx: TypeNameContext) => {
    return this.visitChildren(ctx)!;
  };

  visitTypeGeneric = (ctx: TypeGenericContext) => {
    const typeName = this.visit(ctx.typeName());
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => this.filterTokens(s))
      .join(", ");

    return `${typeName}[${types}]`;
  };

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => this.filterTokens(s));

    const returnType = types[types.length - 1];
    const inTypes = types.slice(0, -1).join(", ");

    return `Callable[[${inTypes}]${returnType}]`;
  };

  override visitType = (context: TypeContext) => {
    const typeTuple = context.typeTuple();
    const typeName = context.typeName();
    const typeGeneric = context.typeGeneric();
    const typeFunc = context.typeFunc();

    if (typeTuple) {
      return this.visit(typeTuple)!;
    }

    if (typeName) {
      return this.visit(typeName)!;
    }

    if (typeGeneric) {
      return this.visit(typeGeneric)!;
    }

    if (typeFunc) {
      return this.visit(typeFunc)!;
    }

    throw new Error(context.getText());
  };

  visitTerminal(ctx: TerminalNode) {
    return ctx.symbol.text ?? "";
  }
}

import { TerminalNode } from "antlr4ng";
import {
  TypeTupleContext,
  TypeNameContext,
  TypeGenericContext,
  TypeContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";

export class PythonVisitorSource extends PythonVisitor<string> {
  constructor() {
    super();
  }

  filterTokens(s: string) {
    return s.trim() && s !== "(" && s !== ")" && s !== ",";
  }

  visitTypeTuple = (_ctx: TypeTupleContext) => {
    // const types = this.visitChildren(ctx) as string[])
    //   .filter((s) => this.filterTokens(s))
    //   .join(", ");
    return `(${""})`;
  };

  visitTypeName = (ctx: TypeNameContext) => {
    return this.visitChildren(ctx)!;
  };

  visitTypeGeneric = (ctx: TypeGenericContext) => {
    const typeName = this.visit(ctx.typeName()) as string;
    //const types = this.visit(ctx.type_())!;

    return `${typeName}<of ${""}>`;
  };

  override visitType = (context: TypeContext) => {
    const typeTuple = context.typeTuple();
    const typeName = context.typeName();
    const typeGeneric = context.typeGeneric();

    if (typeTuple) {
      return this.visit(typeTuple)!;
    }

    if (typeName) {
      return this.visit(typeName)!;
    }

    if (typeGeneric) {
      return this.visit(typeGeneric)!;
    }

    throw new Error(context.getText());
  };

  visitTerminal(ctx: TerminalNode) {
    return ctx.symbol.text ?? "";
  }
}

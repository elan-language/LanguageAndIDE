import { TerminalNode } from "antlr4ng";
import {
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { RefLangLexer } from "../../generated/ref-lang/RefLangLexer";
import { filterTokens, getTokenText, visitType } from "./parser-helpers";

export class RefLangVisitorSource extends RefLangVisitor<string> {
  constructor() {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => {
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => filterTokens(s))
      .join(", ");

    return `(${types})`;
  };

  visitTypeName = (ctx: TypeNameContext) => {
    return this.visitChildren(ctx)!;
  };

  visitTypeGeneric = (ctx: TypeGenericContext) => {
    const typeName = this.visit(ctx.typeName()) as string;
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => filterTokens(s))
      .join(", ");

    return `${typeName}<of ${types}>`;
  };

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => filterTokens(s));

    const returnType = types[types.length - 1];
    const inTypes = types.slice(0, -1).join(", ");

    return `Func<of ${inTypes} => ${returnType}>`;
  };

  override visitType = (context: TypeContext) => {
    return visitType<string>(this, context);
  };

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(RefLangLexer.literalNames, ctx);
  }
}

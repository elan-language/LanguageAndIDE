import { TerminalNode } from "antlr4ng";
import { RefLangLexer } from "../../generated/ref-lang/RefLangLexer";
import {
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { getFilteredTypes, getFuncTypes, getTokenText, visitType } from "./parser-helpers";

export class RefLangVisitorSource extends RefLangVisitor<string> {
  constructor() {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => `(${getFilteredTypes(this, ctx).join(", ")})`;

  visitTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}<of ${getFilteredTypes(this, ctx).join(", ")}>`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Func<of ${inTypes} => ${returnType}>`;
  };

  visitType = (context: TypeContext) => visitType<string>(this, context);

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(RefLangLexer.literalNames, ctx);
  }
}

import { TerminalNode } from "antlr4ng";
import {
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { Language } from "../frames/frame-interfaces/language";
import { RefLangLexer } from "../../generated/ref-lang/RefLangLexer";
import { filterTokens, getTokenText, visitType } from "./parser-helpers";

export class RefLangVisitorHtml extends RefLangVisitor<string> {
  constructor(private readonly language: Language) {
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
    const type = this.visitChildren(ctx) ?? "";
    return `<el-type>${type}</el-type>`;
  };

  visitTypeGeneric = (ctx: TypeGenericContext) => {
    const typeName = this.visit(ctx.typeName());
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => filterTokens(s))
      .join(", ");

    return `${typeName}&lt;<el-kw>of</el-kw> ${types}&gt;`;
  };

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((s) => filterTokens(s));

    const returnType = types[types.length - 1];
    const inTypes = types.slice(0, -1).join(", ");

    return `Func&lt;<el-kw>of</el-kw> ${inTypes} =&gt; ${returnType}&gt;`;
  };

  override visitType = (context: TypeContext) => {
    return visitType<string>(this, context);
  };

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(RefLangLexer.literalNames, ctx);
  }
}

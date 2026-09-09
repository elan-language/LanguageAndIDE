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
import { Language } from "../frames/frame-interfaces/language";
import { getFilteredTypes, getFuncTypes, getTokenText, visitType } from "./parser-helpers";

export class RefLangVisitorHtml extends RefLangVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => `(${getFilteredTypes(this, ctx).join(", ")})`;

  visitTypeName = (ctx: TypeNameContext) => `<el-type>${this.visitChildren(ctx) ?? ""}</el-type>`;

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}&lt;<el-kw>of</el-kw> ${getFilteredTypes(this, ctx).join(", ")}&gt;`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Func&lt;<el-kw>of</el-kw> ${inTypes} =&gt; ${returnType}&gt;`;
  };

  visitType = (context: TypeContext) => visitType<string>(this, context);

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(RefLangLexer.literalNames, ctx);
  }
}

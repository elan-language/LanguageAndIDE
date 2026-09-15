import { TerminalNode } from "antlr4ng";
import { RefLangLexer } from "../../generated/ref-lang/RefLangLexer";
import {
  ParamDefContext,
  ParamsListContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
  IdentifierContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import {
  getFilteredTypes,
  getFuncTypes,
  getParamDefs,
  getTokenText,
  visitTypeHelper,
} from "./parser-helpers";

export class RefLangVisitorHtml extends RefLangVisitor<string> {
  constructor() {
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

  visitType = (ctx: TypeContext) => visitTypeHelper<string>(this, ctx);

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(RefLangLexer.literalNames, ctx);
  }

  visitParamsList = (ctx: ParamsListContext) => {
    return `${getParamDefs<string>(this, ctx).join(", ")}`;
  };

  visitIdentifier = (ctx: IdentifierContext) =>
    `<el-id>${ctx.NAME_STARTING_LC().getText()}</el-id>`;

  visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifier())} <el-kw>as</el-kw> ${this.visit(ctx.type())}`;
}

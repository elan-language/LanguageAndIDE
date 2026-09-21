import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  CommentTextContext,
  IdentifierContext,
  ParamDefContext,
  ParamsListContext,
  TestNameContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { Language } from "../frames/frame-interfaces/language";
import {
  escapeMultipleSpaces,
  getFilteredTypes,
  getFuncTypes,
  getParamDefs,
  visitTypeHelper,
} from "./parser-helpers";
import { escapeHtmlChars } from "../frames/frame-helpers";

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

  visitType = (ctx: TypeContext) => visitTypeHelper<string>(this, ctx);

  visitTerminal(ctx: TerminalNode) {
    return getTokenTextByName(this.language, ctx.getText());
  }

  visitParamsList = (ctx: ParamsListContext) => {
    return `${getParamDefs<string>(this, ctx).join(", ")}`;
  };

  visitIdentifier = (ctx: IdentifierContext) =>
    `<el-id>${ctx.NAME_STARTING_LC().getText()}</el-id>`;

  visitMethodName = (ctx: IdentifierContext) =>
    `<el-method>${ctx.NAME_STARTING_LC().getText()}</el-method>`;

  visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifier())} <el-kw>as</el-kw> ${this.visit(ctx.type())}`;

  visitTestName = (ctx: TestNameContext) =>
    `<el-method>${ctx.NAME_STARTING_TEST_().getText()}</el-method>`;

  visitCommentText = (ctx: CommentTextContext) => {
    const txt = ctx.getText().replace("#", "");
    return escapeMultipleSpaces(escapeHtmlChars(txt));
  };
}

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
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
import { Language } from "../frames/frame-interfaces/language";
import { getFilteredTypes, getFuncTypes, getParamDefs, visitTypeHelper } from "./parser-helpers";

export class PythonVisitorHtml extends PythonVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) =>
    `<el-kw>tuple</el-kw>[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeName = (ctx: TypeNameContext) => `<el-type>${this.visitChildren(ctx) ?? ""}</el-type>`;

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `<el-type>Callable</el-type>[[${inTypes}], ${returnType}]`;
  };

  visitType = (ctx: TypeContext) => visitTypeHelper<string>(this, ctx);

  visitTerminal(ctx: TerminalNode) {
    return getTokenTextByName(this.language, ctx.getText());
  }

  visitParamsList = (ctx: ParamsListContext) => `${getParamDefs<string>(this, ctx).join(", ")}`;

  visitIdentifier = (ctx: IdentifierContext) =>
    `<el-id>${ctx.NAME_STARTING_LC().getText()}</el-id>`;

  visitMethodName = (ctx: IdentifierContext) =>
    `<el-method>${ctx.NAME_STARTING_LC().getText()}</el-method>`;

  visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifier())}: ${this.visit(ctx.type())}`;

  visitTestName = (ctx: TestNameContext) =>
    `<el-method>${ctx.NAME_STARTING_TEST_().getText()}</el-method>`;

  visitCommentText = (ctx: CommentTextContext) => `<el-comment>${ctx.getText()}</el-comment>`;
}

import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  CommentTextContext,
  IdentifierContext,
  LitIntContext,
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
import {
  escapeMultipleSpaces,
  getFilteredTypes,
  getFuncTypes,
  getParamDefs,
  id,
  kw,
  lit,
  method,
  type,
  visitTypeHelper,
} from "./parser-helpers";
import { escapeHtmlChars } from "../frames/frame-helpers";

export class PythonVisitorHtml extends PythonVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) =>
    `${kw("tuple")}[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `${type("Callable")}[[${inTypes}], ${returnType}]`;
  };

  visitType = (ctx: TypeContext) => visitTypeHelper<string>(this, ctx);

  visitTerminal(ctx: TerminalNode) {
    return getTokenTextByName(this.language, ctx.getText());
  }

  visitParamsList = (ctx: ParamsListContext) => `${getParamDefs<string>(this, ctx).join(", ")}`;

  visitIdentifier = (ctx: IdentifierContext) => id(ctx.NAME_STARTING_LC().getText());

  visitMethodName = (ctx: IdentifierContext) => method(ctx.NAME_STARTING_LC().getText());

  visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifier())}: ${this.visit(ctx.type())}`;

  visitTestName = (ctx: TestNameContext) => method(ctx.NAME_STARTING_TEST_().getText());

  visitCommentText = (ctx: CommentTextContext) =>
    escapeMultipleSpaces(escapeHtmlChars(ctx.getText()));

  visitLitInt = (ctx: LitIntContext) => lit(this.visitChildren(ctx) ?? "");
}

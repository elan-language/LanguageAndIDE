import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  ArgListContext,
  ChainableContext,
  CommentTextContext,
  IdentifierContext,
  IndexContext,
  LitFloatContext,
  LitIntContext,
  MethodCallContext,
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
  getArgs,
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

export class RefLangVisitorHtml extends RefLangVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => `(${getFilteredTypes(this, ctx).join(", ")})`;

  visitTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}&lt;${kw("of")} ${getFilteredTypes(this, ctx).join(", ")}&gt;`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Func&lt;${kw("of")} ${inTypes} =&gt; ${returnType}&gt;`;
  };

  visitType = (ctx: TypeContext) => visitTypeHelper<string>(this, ctx);

  visitTerminal(ctx: TerminalNode) {
    return getTokenTextByName(this.language, ctx.getText());
  }

  visitParamsList = (ctx: ParamsListContext) => `${getParamDefs<string>(this, ctx).join(", ")}`;

  visitIdentifier = (ctx: IdentifierContext) => id(ctx.NAME_STARTING_LC().getText());

  visitMethodName = (ctx: IdentifierContext) => method(ctx.NAME_STARTING_LC().getText());

  visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifier())} ${kw("as")} ${this.visit(ctx.type())}`;

  visitTestName = (ctx: TestNameContext) => method(ctx.NAME_STARTING_TEST_().getText());

  visitCommentText = (ctx: CommentTextContext) =>
    escapeMultipleSpaces(escapeHtmlChars(ctx.getText()));

  visitArgList = (ctx: ArgListContext) => `${getArgs<string>(this, ctx).join(", ")}`;

  visitMethodCall = (ctx: MethodCallContext) => {
    const argList = ctx.argList();
    const args = argList ? this.visit(argList) : "";
    const name = this.visit(ctx.methodName());

    return `${name}(${args})`;
  };

  visitIndex = (ctx: IndexContext) => {
    const expr = this.visit(ctx.expression()) ?? "";
    return `[${expr}]`;
  };

  visitChainable = (ctx: ChainableContext) => {
    const indices = ctx
      .index()
      .map((i) => this.visit(i))
      .join("");
    const methodCall = ctx.methodCall();
    const identifier = ctx.identifier();
    const prefix = methodCall ? this.visit(methodCall) : this.visit(identifier!);
    return `${prefix}${indices}`;
  };

  visitLitInt = (ctx: LitIntContext) => lit(this.visitChildren(ctx) ?? "");

  visitLitFloat = (ctx: LitFloatContext) => lit(this.visitChildren(ctx) ?? "");
}

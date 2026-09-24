import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  ArgListContext,
  BinaryExpressionContext,
  BinaryOperatorContext,
  ChainableContext,
  CommentTextContext,
  EnumValueContext,
  ExpressionContext,
  IdentifierContext,
  IndexContext,
  LitBooleanContext,
  LitFloatContext,
  LitIntContext,
  LitStringContext,
  MethodCallContext,
  ParamDefContext,
  ParamsListContext,
  TermContext,
  TestNameContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { escapeHtmlChars } from "../frames/frame-helpers";
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

  visitLitInt = (ctx: LitIntContext) =>
    this.visitChildren(ctx) ? lit(this.visitChildren(ctx)!.toLowerCase()) : "";

  visitLitFloat = (ctx: LitFloatContext) =>
    this.visitChildren(ctx) ? lit(this.visitChildren(ctx)!.toLowerCase()) : "";

  visitLitBoolean = (ctx: LitBooleanContext) => kw(this.visitChildren(ctx) ?? "");

  visitLitString = (ctx: LitStringContext) =>
    this.visitChildren(ctx) ? `"${lit(this.visitChildren(ctx)!.slice(1, -1))}"` : "";

  visitEnumValue = (ctx: EnumValueContext) =>
    `${this.visitTypeName(ctx.typeName())}.${this.visitIdentifier(ctx.identifier())}`;
   // `${type(ctx.typeName().getText())}.${id(ctx.identifier().getText())}`; // TODO: this solution won't work in general. How do I get the Html from the typeName and the identifier?

  visitBinaryOperator = (ctx: BinaryOperatorContext) => this.formatBinaryOp(ctx.getText());

  private formatBinaryOp(txt: string): string {
    let html = txt;
    if (/^[A-Za-z]+$/.test(txt)) { // a keyword
      html = kw(` ${txt} `);
    } else if (txt !== "*" && txt !== "/") {
        html = ` ${txt} `;
    } 
    return html;
  }  

  visitTerm = (ctx: TermContext) => this.visitChildren(ctx) ?? "";
  visitExpression = (ctx: ExpressionContext) => this.visitChildren(ctx) ?? "";

    visitBinaryExpression = (ctx: BinaryExpressionContext) => 
      `${this.visitTerm(ctx.term())}${this.visitBinaryOperator(ctx.binaryOperator())}${this.visitExpression(ctx.expression())}`;
}

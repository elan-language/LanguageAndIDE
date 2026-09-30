import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  ArgListContext,
  BinaryExpressionContext,
  BinaryOperatorContext,
  BracketedExpressionContext,
  ChainableContext,
  CommentTextContext,
  DictionaryContext,
  EnumValueContext,
  ExpressionContext,
  IdentifierContext,
  IndexContext,
  KvpContext,
  LambdaContext,
  ListContext,
  LitBooleanContext,
  LitFloatContext,
  LitIntContext,
  LitRegExpContext,
  LitStringContext,
  MethodCallContext,
  NegateLogicalContext,
  NegateNumericContext,
  NewInstanceContext,
  ParamDefContext,
  ParamsListContext,
  TermContext,
  TestNameContext,
  ThisInstanceContext,
  TupleContext,
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
  getExpressions,
  getFilteredTypes,
  getFuncTypes,
  getKVPs,
  getParamDefs,
  id,
  kw,
  lit,
  method,
  regex,
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
    // const indices = ctx.index()
    //   ? ctx
    //       .index()
    //       .map((i) => this.visit(i))
    //       .join("")
    //   : "";
    const methodCall = ctx.methodCall();
    const identifier = ctx.identifier();
    const prefix = methodCall ? this.visit(methodCall!) : this.visit(identifier!);
    return `${prefix}`;
  };

  visitLitInt = (ctx: LitIntContext) => lit((this.visitChildren(ctx) ?? "").toLowerCase());

  visitLitFloat = (ctx: LitFloatContext) => lit((this.visitChildren(ctx) ?? "").toLowerCase());

  visitLitBoolean = (ctx: LitBooleanContext) => kw(this.visitChildren(ctx) ?? "");

  visitLitString = (ctx: LitStringContext) =>
    this.visitChildren(ctx)
      ? `"${lit(escapeHtmlChars(this.visitChildren(ctx)!.slice(1, -1)))}"`
      : "";

  visitEnumValue = (ctx: EnumValueContext) =>
    `${this.visit(ctx.typeName())}.${this.visit(ctx.identifier())}`;

  visitBinaryOperator = (ctx: BinaryOperatorContext) => {
    const txt = ctx.getText();
    let html = txt;
    if (/^[A-Za-z]+$/.test(txt)) {
      html = kw(` ${txt} `);
    } else if (txt !== "*" && txt !== "/") {
      html = ` ${txt} `;
    }
    return html;
  };

  visitBinaryExpression = (ctx: BinaryExpressionContext) =>
    `${this.visit(ctx.term())}${this.visit(ctx.binaryOperator())}${this.visit(ctx.expression())}`;

  visitNegateNumeric = (ctx: NegateNumericContext) =>
    `${this.visit(ctx.MINUS())}${this.visit(ctx.term())}`;

  visitNegateLogical = (ctx: NegateLogicalContext) => {
    let not = ctx.NOT().getText();
    if (/^[A-Za-z]+$/.test(not)) {
      not = kw(`${not} `);
    }
    return `${not}${this.visit(ctx.term())}`;
  };

  visitBracketedExpression = (ctx: BracketedExpressionContext) =>
    `(${this.visit(ctx.expression())})`;

  visitLambda = (ctx: LambdaContext) => {
    const lambda = this.visit(ctx.LAMBDA()) ?? "";
    const arrow = this.visit(ctx.ARROW());
    const params = ctx.paramsList() ? this.visit(ctx.paramsList()!) : "";
    return `${kw(lambda)} ${params} ${arrow} ${this.visit(ctx.expression())}`;
  };

  visitExpression = (ctx: ExpressionContext) => {
    if (ctx.expression().length > 0) {
      const condition = ctx.expression(0) ? this.visit(ctx.expression(0)!) : "";
      const exprIfTrue = ctx.expression(1) ? this.visit(ctx.expression(1)!) : "";
      const exprIfFalse = ctx.expression(2) ? this.visit(ctx.expression(2)!) : "";
      return `${method("if_")}(${condition}, ${exprIfTrue}, ${exprIfFalse})`;
    } else {
      return this.visitChildren(ctx) ?? "";
    }
  };

  visitNewInstance = (ctx: NewInstanceContext) =>
    `${kw("new")} ${this.visit(ctx.type())}(${ctx.argList() ? this.visit(ctx.argList()!) : ""})`;

  visitList = (ctx: ListContext) =>
    `[${getExpressions<string>(this, ctx.expressionList()).join(", ")}]`;

  visitTuple = (ctx: TupleContext) =>
    `(${getExpressions<string>(this, ctx.tupleElementList()).join(", ")})`;

  visitDictionary = (ctx: DictionaryContext) =>
    `[${getKVPs<string>(this, ctx.kvpList()).join(", ")}]`;

  visitKvp = (ctx: KvpContext) =>
    `${this.visit(ctx.expression(0)!)}:${this.visit(ctx.expression(1)!)}`;

  visitTerm = (ctx: TermContext) =>
    ctx.DOT()
      ? `${this.visit(ctx.term()!)}.${this.visit(ctx.chainable()!)}`
      : ctx.term()
        ? `${this.visit(ctx.term()!)}${this.visit(ctx.index()!)}`
        : (this.visitChildren(ctx) ?? "");

  visitThisInstance = (ctx: ThisInstanceContext) =>
    `<el-kw>${this.visit(ctx.THIS_INSTANCE())}</el-kw>`;

  visitLitRegExp = (ctx: LitRegExpContext) =>
    this.visitChildren(ctx) ? regex(this.visitChildren(ctx)!) : "";
}

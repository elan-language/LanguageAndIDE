import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  ArgListContext,
  BinaryExpressionContext,
  BinaryOperatorContext,
  BracketedExpressionContext,
  CommentTextContext,
  DictionaryContext,
  EnumValueContext,
  ExpressionContext,
  IdentifierDefContext,
  IdentifierListContext,
  IdentifierUseContext,
  IndexContext,
  IndexedAssignableContext,
  InstanceProcRefContext,
  KvpContext,
  LambdaContext,
  ListContext,
  LitBooleanContext,
  LitFloatContext,
  LitIntContext,
  LitRegExpContext,
  LitStringContext,
  MethodCallContext,
  MethodNameContext,
  NegateLogicalContext,
  NegateNumericContext,
  NewInstanceContext,
  ParamDefContext,
  ParamListContext,
  TermContext,
  TestNameContext,
  ThisAssignableContext,
  ThisInstanceContext,
  ThisProcRefContext,
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

  override visitTypeTuple = (ctx: TypeTupleContext) =>
    `(${getFilteredTypes(this, ctx).join(", ")})`;

  // typeName
  override visitIntTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitFloatTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitBoolTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitStringTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitListTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitUdtTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");

  override visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}&lt;${kw("of")} ${getFilteredTypes(this, ctx).join(", ")}&gt;`;

  override visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Func&lt;${kw("of")} ${inTypes} =&gt; ${returnType}&gt;`;
  };

  override visitType = (ctx: TypeContext) => visitTypeHelper<string>(this, ctx);

  override visitTerminal(ctx: TerminalNode) {
    return getTokenTextByName(this.language, ctx.getText());
  }

  override visitParamList = (ctx: ParamListContext) =>
    `${getParamDefs<string>(this, ctx).join(", ")}`;

  override visitIdentifierDef = (ctx: IdentifierDefContext) => id(ctx.NAME_STARTING_LC().getText());

  override visitIdentifierUse = (ctx: IdentifierUseContext) => id(ctx.NAME_STARTING_LC().getText());

  override visitMethodName = (ctx: MethodNameContext) => method(ctx.NAME_STARTING_LC().getText());

  override visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifierDef())} ${kw("as")} ${this.visit(ctx.type())}`;

  override visitTestName = (ctx: TestNameContext) => method(ctx.NAME_STARTING_TEST_().getText());

  override visitCommentText = (ctx: CommentTextContext) =>
    escapeMultipleSpaces(escapeHtmlChars(ctx.getText()));

  override visitArgList = (ctx: ArgListContext) => `${getArgs<string>(this, ctx).join(", ")}`;

  override visitMethodCall = (ctx: MethodCallContext) => {
    const argList = ctx.argList();
    const args = argList ? this.visit(argList) : "";
    const name = this.visit(ctx.methodName());

    return `${name}(${args})`;
  };

  override visitIndex = (ctx: IndexContext) => {
    const expr = this.visit(ctx.expression()) ?? "";
    return `[${expr}]`;
  };

  override visitLitInteger = (ctx: LitIntContext) =>
    lit((this.visitChildren(ctx) ?? "").toLowerCase());
  override visitLitBinary = (ctx: LitIntContext) =>
    lit((this.visitChildren(ctx) ?? "").toLowerCase());
  override visitLitHex = (ctx: LitIntContext) => lit((this.visitChildren(ctx) ?? "").toLowerCase());

  override visitLitFloat = (ctx: LitFloatContext) =>
    lit((this.visitChildren(ctx) ?? "").toLowerCase());

  override visitLitBoolean = (ctx: LitBooleanContext) => kw(this.visitChildren(ctx) ?? "");

  override visitLitString = (ctx: LitStringContext) =>
    this.visitChildren(ctx)
      ? `"${lit(escapeHtmlChars(this.visitChildren(ctx)!.slice(1, -1)))}"`
      : "";

  override visitEnumValue = (ctx: EnumValueContext) =>
    `${this.visit(ctx.typeName())}.${this.visit(ctx.identifierUse())}`;

  override visitBinaryOperator = (ctx: BinaryOperatorContext) => {
    const txt = ctx.getText();
    let html = txt;
    if (/^[A-Za-z]+$/.test(txt)) {
      html = kw(` ${txt} `);
    } else if (txt !== "*" && txt !== "/") {
      html = ` ${txt} `;
    }
    return html;
  };

  override visitBinaryExpression = (ctx: BinaryExpressionContext) =>
    `${this.visit(ctx.term())}${this.visit(ctx.binaryOperator())}${this.visit(ctx.expression())}`;

  override visitNegateNumeric = (ctx: NegateNumericContext) =>
    `${this.visit(ctx.MINUS())}${this.visit(ctx.term())}`;

  override visitNegateLogical = (ctx: NegateLogicalContext) => {
    let not = ctx.NOT().getText();
    if (/^[A-Za-z]+$/.test(not)) {
      not = kw(`${not} `);
    }
    return `${not}${this.visit(ctx.term())}`;
  };

  override visitBracketedExpression = (ctx: BracketedExpressionContext) =>
    `(${this.visit(ctx.expression())})`;

  override visitLambda = (ctx: LambdaContext) => {
    const lambda = this.visit(ctx.LAMBDA()) ?? "";
    const arrow = this.visit(ctx.ARROW());
    const params = ctx.paramList() ? this.visit(ctx.paramList()!) : "";
    return `${kw(lambda)} ${params} ${arrow} ${this.visit(ctx.expression())}`;
  };

  override visitExpression = (ctx: ExpressionContext) => {
    if (ctx.expression().length > 0) {
      const condition = ctx.expression(0) ? this.visit(ctx.expression(0)!) : "";
      const exprIfTrue = ctx.expression(1) ? this.visit(ctx.expression(1)!) : "";
      const exprIfFalse = ctx.expression(2) ? this.visit(ctx.expression(2)!) : "";
      return `${method("if_")}(${condition}, ${exprIfTrue}, ${exprIfFalse})`;
    } else {
      return this.visitChildren(ctx) ?? "";
    }
  };

  override visitNewInstance = (ctx: NewInstanceContext) =>
    `${kw("new")} ${this.visit(ctx.type())}(${ctx.argList() ? this.visit(ctx.argList()!) : ""})`;

  override visitList = (ctx: ListContext) =>
    `[${getExpressions<string>(this, ctx.expressionList()).join(", ")}]`;

  override visitTuple = (ctx: TupleContext) =>
    `(${getExpressions<string>(this, ctx.expressionList()).join(", ")})`;

  override visitDictionary = (ctx: DictionaryContext) =>
    `[${getKVPs<string>(this, ctx.kvpList()).join(", ")}]`;

  override visitKvp = (ctx: KvpContext) =>
    `${this.visit(ctx.expression(0)!)}:${this.visit(ctx.expression(1)!)}`;

  override visitTerm = (ctx: TermContext) =>
    ctx.DOT()
      ? `${this.visit(ctx.term()!)}.${this.visit(ctx.chainable()!)}`
      : ctx.term()
        ? `${this.visit(ctx.term()!)}${this.visit(ctx.index()!)}`
        : (this.visitChildren(ctx) ?? "");

  override visitThisInstance = (ctx: ThisInstanceContext) =>
    `<el-kw>${this.visit(ctx.THIS_INSTANCE())}</el-kw>`;

  override visitLitRegExp = (ctx: LitRegExpContext) =>
    this.visitChildren(ctx) ? regex(this.visitChildren(ctx)!) : "";

  override visitThisAssignable = (ctx: ThisAssignableContext) =>
    `<el-kw>${this.visit(ctx.THIS_INSTANCE()!)}</el-kw>${this.visit(ctx.DOT()!)}${this.visit(ctx.identifierUse()!)}`;

  override visitIndexedAssignable = (ctx: IndexedAssignableContext) =>
    `${this.visit(ctx.assignable()!)}${this.visit(ctx.index()!)}`;

  override visitThisProcRef = (ctx: ThisProcRefContext) =>
    `${kw(this.visit(ctx.THIS_INSTANCE())!)}.${this.visit(ctx.methodName())}`;

  override visitInstanceProcRef = (ctx: InstanceProcRefContext) =>
    `${this.visit(ctx.identifierWithOptIndexes())}.${this.visit(ctx.methodName())}`;

  override visitIdentifierList = (ctx: IdentifierListContext) => {
    const ids = ctx.identifierDef().map((id) => this.visit(id)!);
    return ids.join(", ");
  };
}

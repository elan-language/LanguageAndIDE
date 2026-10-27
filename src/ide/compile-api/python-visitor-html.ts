import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  ArgListContext,
  AssignableContext,
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
  KvpContext,
  LambdaContext,
  ListContext,
  LitBooleanContext,
  LitFloatContext,
  LitIntContext,
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
  ThisInstanceContext,
  TupleContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
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
  type,
  visitTypeHelper,
} from "./parser-helpers";

export class PythonVisitorHtml extends PythonVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  override visitTypeTuple = (ctx: TypeTupleContext) =>
    `${kw("tuple")}[${getFilteredTypes(this, ctx).join(", ")}]`;

  override visitTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");

  override visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}[${getFilteredTypes(this, ctx).join(", ")}]`;

  override visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `${type("Callable")}[[${inTypes}], ${returnType}]`;
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
    `${this.visit(ctx.identifierDef())}: ${this.visit(ctx.type())}`;

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

  override visitLitInt = (ctx: LitIntContext) => lit((this.visitChildren(ctx) ?? "").toLowerCase());

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
    const arrow = this.visit(ctx.COLON());
    const params = ctx.paramList() ? this.visit(ctx.paramList()!) : "";
    return `${kw(lambda)} ${params} ${arrow} ${this.visit(ctx.expression())}`;
  };

  override visitExpression = (ctx: ExpressionContext) => {
    //does not currently cover 'elif' clauses
    if (ctx.expression().length > 0) {
      const exprIfTrue = ctx.expression(0) ? this.visit(ctx.expression(0)!) : "";
      const condition = ctx.expression(1) ? this.visit(ctx.expression(1)!) : "";
      const exprIfFalse = ctx.expression(2) ? this.visit(ctx.expression(2)!) : "";
      return `${exprIfTrue} ${kw("if")} ${condition} ${kw("else")} ${exprIfFalse}`;
    } else {
      return this.visitChildren(ctx) ?? "";
    }
  };

  override visitNewInstance = (ctx: NewInstanceContext) =>
    `${this.visit(ctx.type())}(${ctx.argList() ? this.visit(ctx.argList()!) : ""})`;

  override visitList = (ctx: ListContext) =>
    `[${getExpressions<string>(this, ctx.expressionList()).join(", ")}]`;

  override visitTuple = (ctx: TupleContext) =>
    `(${getExpressions<string>(this, ctx.expressionList()).join(", ")})`;

  override visitDictionary = (ctx: DictionaryContext) =>
    `{${getKVPs<string>(this, ctx.kvpList()).join(", ")}}`;

  override visitKvp = (ctx: KvpContext) =>
    `${this.visit(ctx.expression(0)!)}:${this.visit(ctx.expression(1)!)}`;

  override visitTerm = (ctx: TermContext) =>
    ctx.DOT()
      ? `${this.visit(ctx.term()!)}.${this.visit(ctx.chainable()!)}`
      : ctx.term()
        ? `${this.visit(ctx.term()!)}${this.visit(ctx.index()!)}`
        : (this.visitChildren(ctx) ?? "");

  override visitThisInstance = (ctx: ThisInstanceContext) =>
    `${kw(this.visit(ctx.THIS_INSTANCE())!)}`;

  override visitAssignable = (ctx: AssignableContext) => {
    if (ctx.THIS_INSTANCE()) {
      return `<el-kw>${this.visit(ctx.THIS_INSTANCE()!)}</el-kw>${this.visit(ctx.DOT()!)}${this.visit(ctx.identifierUse()!)}`;
    } else if (ctx.index()) {
      return `${this.visit(ctx.assignable()!)}${this.visit(ctx.index()!)}`;
    } else {
      return this.visitChildren(ctx)!;
    }
  };

  override visitIdentifierList = (ctx: IdentifierListContext) => {
    const ids = ctx.identifierDef().map((id) => this.visit(id)!);
    return ids.join(", ");
  };
}

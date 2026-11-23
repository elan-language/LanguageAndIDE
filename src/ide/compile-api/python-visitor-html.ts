import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import { OperationSymbol } from "../../compiler/syntax-nodes/operation-symbol";
import {
  ArgListContext,
  BinaryExpressionContext,
  BinaryOperatorContext,
  BracketedExpressionContext,
  ChainableTermContext,
  CommentTextContext,
  DictionaryContext,
  EnumValueContext,
  IdentifierDefContext,
  IdentifierListContext,
  IdentifierUseContext,
  IfExpressionContext,
  IndexContext,
  IndexedAssignableContext,
  IndexedTermContext,
  InterpolatedStringContext,
  InterpolatedStringExpressionContext,
  InterpolatedStringTextContext,
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
  TestNameContext,
  ThisAssignableContext,
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

  override visitIntTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitFloatTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitBoolTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitStringTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitListTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitDictTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");
  override visitUdtTypeName = (ctx: TypeNameContext) => type(this.visitChildren(ctx) ?? "");

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
    `${this.visit(ctx.identifierDef() ?? ctx.THIS_INSTANCE()!)}: ${this.visit(ctx.type())}`;

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

  override visitLitBooleanTrue = (_ctx: LitBooleanContext) => kw(this.language.TRUE);

  override visitLitBooleanFalse = (_ctx: LitBooleanContext) => kw(this.language.FALSE);

  override visitLitString = (ctx: LitStringContext) =>
    this.visitChildren(ctx)
      ? `"${lit(escapeHtmlChars(this.visitChildren(ctx)!.slice(1, -1)))}"`
      : "";

  override visitEnumValue = (ctx: EnumValueContext) =>
    `${this.visit(ctx.typeName())}.${this.visit(ctx.identifierUse())}`;

  handleKeyword(op: string): string {
    let html = op;
    if (/^[A-Za-z]+$/.test(op.trim())) {
      html = kw(`${op}`);
    }
    return html;
  }

  override visitOpEQUAL = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.Equals));
  override visitOpNOT_EQUAL = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.NotEquals));
  override visitOpREF_EQUAL = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.RefEquals));
  override visitOpREF_NOT_EQUAL = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.RefNotEquals));
  override visitOpGT = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.GT));
  override visitOpLT = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.LT));
  override visitOpGE = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.GTE));
  override visitOpLE = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.LTE));
  override visitOpMULT = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.Multiply));
  override visitOpDIVIDE = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.Divide));
  override visitOpPLUS = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.Add));
  override visitOpMINUS = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.Minus));
  override visitOpAND = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.And));
  override visitOpOR = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.Or));
  override visitOpMOD = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.Mod));
  override visitOpPOWER = (_ctx: BinaryOperatorContext) =>
    this.handleKeyword(this.language.mapOperationSymbol(OperationSymbol.Power));

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

  override visitIfExpression = (ctx: IfExpressionContext) => {
    const condition = this.visit(ctx._condition!);
    const exprIfTrue = this.visit(ctx._trueExpr!);
    const exprIfFalse = this.visit(ctx._falseExpr!);
    return `${exprIfTrue} ${kw("if")} ${condition} ${kw("else")} ${exprIfFalse}`;
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

  // override visitTerm = (ctx: TermContext) =>
  //   ctx.DOT()
  //     ? `${this.visit(ctx.term()!)}.${this.visit(ctx.chainable()!)}`
  //     : ctx.term()
  //       ? `${this.visit(ctx.term()!)}${this.visit(ctx.index()!)}`
  //       : (this.visitChildren(ctx) ?? "");

  // override visitThisInstance = (ctx: ThisInstanceContext) =>
  //   `${kw(this.visit(ctx.THIS_INSTANCE())!)}`;

  // override visitAssignable = (ctx: AssignableContext) => {
  //   if (ctx.THIS_INSTANCE()) {
  //     return `<el-kw>${this.visit(ctx.THIS_INSTANCE()!)}</el-kw>${this.visit(ctx.DOT()!)}${this.visit(ctx.identifierUse()!)}`;
  //   } else if (ctx.index()) {
  //     return `${this.visit(ctx.assignable()!)}${this.visit(ctx.index()!)}`;
  //   } else {
  //     return this.visitChildren(ctx)!;
  //   }
  // };

  // override visitIdentifierList = (ctx: IdentifierListContext) => {
  //   const ids = ctx.identifierDef().map((id) => this.visit(id)!);
  //   return ids.join(", ");
  // };

  override visitIndexedTerm = (ctx: IndexedTermContext) =>
    `${this.visit(ctx.term())}${this.visit(ctx.index())}`;

  override visitChainableTerm = (ctx: ChainableTermContext) =>
    `${this.visit(ctx.term())}.${this.visit(ctx.chainable())}`;

  override visitThisInstance = (ctx: ThisInstanceContext) =>
    `<el-kw>${this.visit(ctx.THIS_INSTANCE())}</el-kw>`;

  override visitThisAssignable = (ctx: ThisAssignableContext) =>
    `<el-kw>${this.visit(ctx.THIS_INSTANCE()!)}</el-kw>${this.visit(ctx.DOT()!)}${this.visit(ctx.identifierUse()!)}`;

  override visitIndexedAssignable = (ctx: IndexedAssignableContext) =>
    `${this.visit(ctx.assignable()!)}${this.visit(ctx.index()!)}`;

  override visitIdentifierList = (ctx: IdentifierListContext) => {
    const ids = ctx.identifierDef().map((id) => this.visit(id)!);
    return ids.join(", ");
  };

  override visitInterpolatedString = (ctx: InterpolatedStringContext) => {
    const s = ctx
      .segment()
      .map((s) => this.visit(s))
      .join("");
    return 'f"' + s + '"';
  };

  override visitInterpolatedStringExpression = (ctx: InterpolatedStringExpressionContext) => {
    return "{" + this.visit(ctx.expression())! + "}";
  };

  override visitInterpolatedStringText = (ctx: InterpolatedStringTextContext) => {
    const txt = ctx
      .Grapheme()
      .map((g) => this.visit(g))
      .join("");
    return txt !== null && txt.length > 0 ? lit(escapeHtmlChars(txt)) : "";
  };
}

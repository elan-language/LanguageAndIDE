import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  ArgListContext,
  BinaryExpressionContext,
  BinaryOperatorContext,
  BracketedExpressionContext,
  ChainableTermContext,
  CommentTextContext,
  DictionaryContext,
  EnumDefValueContext,
  EnumListContext,
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
  KvpContext,
  LambdaContext,
  ListContext,
  LitBooleanContext,
  LitFloatContext,
  LitIntContext,
  MethodCallContext,
  MethodNameContext,
  NegateLogicalContext,
  NegateNumericContext,
  NewInstanceContext,
  ParamDefContext,
  ParamListContext,
  TestNameContext,
  ThisAssignableContext,
  TupleContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
import { Language } from "../frames/frame-interfaces/language";
import {
  getArgs,
  getExpressions,
  getFilteredTypes,
  getFuncTypes,
  getKVPs,
  getParamDefs,
  visitTypeHelper,
} from "./parser-helpers";
import { OperationSymbol } from "../../compiler/syntax-nodes/operation-symbol";

export class PythonVisitorSource extends PythonVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  override visitTypeTuple = (ctx: TypeTupleContext) =>
    `tuple[${getFilteredTypes(this, ctx).join(", ")}]`;

  override visitIntTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;
  override visitFloatTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;
  override visitBoolTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;
  override visitStringTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;
  override visitListTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;
  override visitDictTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;
  override visitUdtTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;

  override visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}[${getFilteredTypes(this, ctx).join(", ")}]`;

  override visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Callable[[${inTypes}], ${returnType}]`;
  };

  override visitType = (context: TypeContext) => visitTypeHelper<string>(this, context);

  override visitTerminal(ctx: TerminalNode) {
    return getTokenTextByName(this.language, ctx.getText());
  }

  override visitParamList = (ctx: ParamListContext) =>
    `${getParamDefs<string>(this, ctx).join(", ")}`;

  override visitIdentifierDef = (ctx: IdentifierDefContext) => ctx.NAME_STARTING_LC().getText();

  override visitIdentifierUse = (ctx: IdentifierUseContext) => ctx.NAME_STARTING_LC().getText();

  override visitMethodName = (ctx: MethodNameContext) => ctx.NAME_STARTING_LC().getText();

  override visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifierDef() ?? ctx.THIS_INSTANCE()!)}: ${this.visit(ctx.type())}`;

  override visitTestName = (ctx: TestNameContext) => ctx.NAME_STARTING_TEST_().getText();

  override visitCommentText = (ctx: CommentTextContext) => ctx.getText();

  override visitLitInteger = (ctx: LitIntContext) => (this.visitChildren(ctx) ?? "").toLowerCase();
  override visitLitBinary = (ctx: LitIntContext) => (this.visitChildren(ctx) ?? "").toLowerCase();
  override visitLitHex = (ctx: LitIntContext) => (this.visitChildren(ctx) ?? "").toLowerCase();

  override visitLitFloat = (ctx: LitFloatContext) => (this.visitChildren(ctx) ?? "").toLowerCase();

  override visitLitBoolean = (ctx: LitBooleanContext) => this.visitChildren(ctx) ?? "";

  override visitEnumValue = (ctx: EnumValueContext) =>
    `${this.visit(ctx.typeName())}.${this.visit(ctx.identifierUse())}`;

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

  override visitOpEQUAL = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.Equals);
  override visitOpNOT_EQUAL = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.NotEquals);
  override visitOpGT = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.GT);
  override visitOpLT = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.LT);
  override visitOpGE = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.GTE);
  override visitOpLE = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.LTE);
  override visitOpMULT = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.Multiply);
  override visitOpDIVIDE = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.Divide);
  override visitOpPLUS = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.Add);
  override visitOpMINUS = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.Minus);
  override visitOpAND = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.And);
  override visitOpOR = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.Or);
  override visitOpMOD = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.Mod);
  override visitOpPOWER = (_ctx: BinaryOperatorContext) =>
    this.language.mapOperationSymbol(OperationSymbol.Power);

  override visitBinaryExpression = (ctx: BinaryExpressionContext) =>
    `${this.visit(ctx.term())}${this.visit(ctx.binaryOperator())}${this.visit(ctx.expression())}`;

  override visitNegateNumeric = (ctx: NegateNumericContext) =>
    `${this.visit(ctx.MINUS())}${this.visit(ctx.term())}`;

  override visitNegateLogical = (ctx: NegateLogicalContext) => {
    let not = ctx.NOT().getText();
    if (/^[A-Za-z]+$/.test(not)) {
      not = `${not} `;
    }
    return `${not}${this.visit(ctx.term())}`;
  };

  override visitBracketedExpression = (ctx: BracketedExpressionContext) =>
    `(${this.visit(ctx.expression())})`;

  override visitLambda = (ctx: LambdaContext) => {
    const lambda = this.visit(ctx.LAMBDA()) ?? "";
    const colon = this.visit(ctx.COLON());
    const params = ctx.paramList() ? this.visit(ctx.paramList()!) : "";
    return `${lambda} ${params} ${colon} ${this.visit(ctx.expression())}`;
  };

  // override visitExpression = (ctx: ExpressionContext) => {
  //   //TODO Not yet handling 'elif' clauses
  //   if (ctx.expression().length > 0) {
  //     const exprIfTrue = ctx.expression(0) ? this.visit(ctx.expression(1)!) : "";
  //     const condition = ctx.expression(1) ? this.visit(ctx.expression(0)!) : "";
  //     const exprIfFalse = ctx.expression(2) ? this.visit(ctx.expression(2)!) : "";
  //     return `${exprIfTrue} if ${condition} else ${exprIfFalse})`;
  //   } else {
  //     return this.visitChildren(ctx) ?? "";
  //   }
  // };

  override visitIfExpression = (ctx: IfExpressionContext) => {
    const condition = this.visit(ctx._condition!);
    const exprIfTrue = this.visit(ctx._trueExpr!);
    const exprIfFalse = this.visit(ctx._falseExpr!);
    return `${exprIfTrue} if ${condition} else ${exprIfFalse}`;
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

  // override visitAssignable = (ctx: AssignableContext) => {
  //   if (ctx.THIS_INSTANCE()) {
  //     return `${this.visit(ctx.THIS_INSTANCE()!)}${this.visit(ctx.DOT()!)}${this.visit(ctx.identifierUse()!)}`;
  //   } else if (ctx.index()) {
  //     return `${this.visit(ctx.assignable()!)}${this.visit(ctx.index()!)}`;
  //   } else {
  //     return this.visitChildren(ctx)!;
  //   }
  // };

  override visitIdentifierList = (ctx: IdentifierListContext) => {
    const ids = ctx.identifierDef().map((id) => this.visit(id)!);
    return ids.join(", ");
  };

  override visitEnumDefValue = (ctx: EnumDefValueContext) => {
    const id = this.visit(ctx.identifierDef());
    const val = this.visit(ctx.litInt());
    return `${id} = ${val}`;
  };

  override visitEnumList = (ctx: EnumListContext) => {
    const ids = ctx.enumDefValue().map((id) => this.visit(id)!);
    return ids.join("\n");
  };

  override visitIndexedTerm = (ctx: IndexedTermContext) =>
    `${this.visit(ctx.term())}${this.visit(ctx.index())}`;

  override visitChainableTerm = (ctx: ChainableTermContext) =>
    `${this.visit(ctx.term())}.${this.visit(ctx.chainable())}`;

  override visitThisAssignable = (ctx: ThisAssignableContext) =>
    `${this.visit(ctx.THIS_INSTANCE()!)}${this.visit(ctx.DOT()!)}${this.visit(ctx.identifierUse()!)}`;

  override visitIndexedAssignable = (ctx: IndexedAssignableContext) =>
    `${this.visit(ctx.assignable()!)}${this.visit(ctx.index()!)}`;

  override visitInterpolatedStringExpression = (ctx: InterpolatedStringExpressionContext) => {
    return "{" + this.visit(ctx.expression())! + "}";
  };

  override visitInterpolatedString = (ctx: InterpolatedStringContext) => {
    const s = ctx
      .segment()
      .map((s) => this.visit(s))
      .join("");
    return 'f"' + s + '"';
  };
}

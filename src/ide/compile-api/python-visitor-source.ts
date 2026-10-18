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
  InstanceProcRefContext,
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
  ThisProcRefContext,
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

export class PythonVisitorSource extends PythonVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  override visitTypeTuple = (ctx: TypeTupleContext) =>
    `tuple[${getFilteredTypes(this, ctx).join(", ")}]`;

  override visitTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;

  override visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}[${getFilteredTypes(this, ctx).join(", ")}]`;

  override visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Callable[[${inTypes}]${returnType}]`;
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
    `${this.visit(ctx.identifierDef())}: ${this.visit(ctx.type())}`;

  override visitTestName = (ctx: TestNameContext) => ctx.NAME_STARTING_TEST_().getText();

  override visitCommentText = (ctx: CommentTextContext) => ctx.getText();

  override visitLitInt = (ctx: LitIntContext) => (this.visitChildren(ctx) ?? "").toLowerCase();

  override visitLitFloat = (ctx: LitFloatContext) => (this.visitChildren(ctx) ?? "").toLowerCase();

  override visitLitBoolean = (ctx: LitBooleanContext) => this.visitChildren(ctx) ?? "";

  override visitLitString = (ctx: LitStringContext) =>
    this.visitChildren(ctx) ? this.visitChildren(ctx)!.slice(1, -1) : "";

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

  override visitBinaryOperator = (ctx: BinaryOperatorContext) => {
    const txt = ctx.getText();
    return txt !== "*" && txt !== "/" ? ` ${txt} ` : txt;
  };

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

  override visitExpression = (ctx: ExpressionContext) => {
    //TODO Not yet handling 'elif' clauses
    if (ctx.expression().length > 0) {
      const exprIfTrue = ctx.expression(0) ? this.visit(ctx.expression(1)!) : "";
      const condition = ctx.expression(1) ? this.visit(ctx.expression(0)!) : "";
      const exprIfFalse = ctx.expression(2) ? this.visit(ctx.expression(2)!) : "";
      return `${exprIfTrue} if ${condition} else ${exprIfFalse})`;
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

  override visitAssignable = (ctx: AssignableContext) => {
    if (ctx.THIS_INSTANCE()) {
      return `${this.visit(ctx.THIS_INSTANCE()!)}${this.visit(ctx.DOT()!)}${this.visit(ctx.identifierUse()!)}`;
    } else if (ctx.index()) {
      return `${this.visit(ctx.assignable()!)}${this.visit(ctx.index()!)}`;
    } else {
      return this.visitChildren(ctx)!;
    }
  };

  override visitThisProcRef = (ctx: ThisProcRefContext) =>
    `${this.visit(ctx.THIS_INSTANCE())}.${this.visit(ctx.methodName())}`;

  override visitInstanceProcRef = (ctx: InstanceProcRefContext) =>
    `${this.visit(ctx.identifierWithOptIndexes())}.${this.visit(ctx.methodName())}`;

  override visitIdentifierList = (ctx: IdentifierListContext) => {
    const ids = ctx.identifierDef().map((id) => this.visit(id)!);
    return ids.join(", ");
  };
}

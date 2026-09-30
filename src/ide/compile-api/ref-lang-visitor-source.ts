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
  IdentifierUseContext,
  IndexContext,
  KvpContext,
  LambdaContext,
  ListContext,
  LitFloatContext,
  LitIntContext,
  MethodCallContext,
  MethodNameContext,
  NegateLogicalContext,
  NegateNumericContext,
  NewInstanceContext,
  ParamDefContext,
  ParamsListContext,
  TermContext,
  TestNameContext,
  TupleContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
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

export class RefLangVisitorSource extends RefLangVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => `(${getFilteredTypes(this, ctx).join(", ")})`;

  visitTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}<of ${getFilteredTypes(this, ctx).join(", ")}>`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Func<of ${inTypes} => ${returnType}>`;
  };

  visitType = (context: TypeContext) => visitTypeHelper<string>(this, context);

  visitTerminal(ctx: TerminalNode) {
    return getTokenTextByName(this.language, ctx.getText());
  }

  visitParamsList = (ctx: ParamsListContext) => `${getParamDefs<string>(this, ctx).join(", ")}`;

  visitIdentifierDef = (ctx: IdentifierDefContext) => ctx.NAME_STARTING_LC().getText();

  visitIdentifierUse = (ctx: IdentifierUseContext) => ctx.NAME_STARTING_LC().getText();

  visitMethodName = (ctx: MethodNameContext) => ctx.NAME_STARTING_LC().getText();

  visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifierDef())} as ${this.visit(ctx.type())}`;

  visitTestName = (ctx: TestNameContext) => ctx.NAME_STARTING_TEST_().getText();

  visitCommentText = (ctx: CommentTextContext) => ctx.getText();

  visitLitInt = (ctx: LitIntContext) => (this.visitChildren(ctx) ?? "").toLowerCase();

  visitLitFloat = (ctx: LitFloatContext) => (this.visitChildren(ctx) ?? "").toLowerCase();

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

  visitEnumValue = (ctx: EnumValueContext) =>
    `${this.visit(ctx.typeName())}.${this.visit(ctx.identifierUse())}`;

  visitBinaryOperator = (ctx: BinaryOperatorContext) => {
    const txt = ctx.getText();
    return txt !== "*" && txt !== "/" ? ` ${txt} ` : txt;
  };

  visitBinaryExpression = (ctx: BinaryExpressionContext) =>
    `${this.visit(ctx.term())}${this.visit(ctx.binaryOperator())}${this.visit(ctx.expression())}`;

  visitNegateNumeric = (ctx: NegateNumericContext) =>
    `${this.visit(ctx.MINUS())}${this.visit(ctx.term())}`;

  visitNegateLogical = (ctx: NegateLogicalContext) => {
    let not = ctx.NOT().getText();
    if (/^[A-Za-z]+$/.test(not)) {
      not = `${not} `;
    }
    return `${not}${this.visit(ctx.term())}`;
  };

  visitBracketedExpression = (ctx: BracketedExpressionContext) =>
    `(${this.visit(ctx.expression())})`;

  visitLambda = (ctx: LambdaContext) => {
    const lambda = this.visit(ctx.LAMBDA()) ?? "";
    const arrow = this.visit(ctx.ARROW());
    const params = ctx.paramsList() ? this.visit(ctx.paramsList()!) : "";
    return `${lambda} ${params} ${arrow} ${this.visit(ctx.expression())}`;
  };

  visitExpression = (ctx: ExpressionContext) => {
    if (ctx.expression().length > 0) {
      const condition = ctx.expression(0) ? this.visit(ctx.expression(0)!) : "";
      const exprIfTrue = ctx.expression(1) ? this.visit(ctx.expression(1)!) : "";
      const exprIfFalse = ctx.expression(2) ? this.visit(ctx.expression(2)!) : "";
      return `if_(${condition}, ${exprIfTrue}, ${exprIfFalse})`;
    } else {
      return this.visitChildren(ctx) ?? "";
    }
  };

  visitNewInstance = (ctx: NewInstanceContext) =>
    `new ${this.visit(ctx.type())}(${ctx.argList() ? this.visit(ctx.argList()!) : ""})`;

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
}

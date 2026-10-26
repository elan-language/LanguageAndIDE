import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { EnumType } from "../../compiler/symbols/enum-type";
import { AssignableAsn } from "../../compiler/syntax-nodes/assignable-asn";
import { getTypeName } from "../../compiler/syntax-nodes/ast-helpers";
import { BinaryExprAsn as BinaryExpressionAsn } from "../../compiler/syntax-nodes/binary-expr-asn";
import { BoolTypeNameAsn } from "../../compiler/syntax-nodes/bool-type-name-asn";
import { BracketedAsn as BracketedExpressionAsn } from "../../compiler/syntax-nodes/bracketed-asn";
import { CsvAsn } from "../../compiler/syntax-nodes/csv-asn";
import { DictionaryAsn } from "../../compiler/syntax-nodes/dictionary-asn";
import { EmptyAsn } from "../../compiler/syntax-nodes/empty-asn";
import { EnumValueAsn } from "../../compiler/syntax-nodes/enum-value-asn";
import { IdentifierListAsn } from "../../compiler/syntax-nodes/fields/identifier-list-asn";
import { ParamListAsn } from "../../compiler/syntax-nodes/fields/param-list-asn";
import { FloatTypeNameAsn } from "../../compiler/syntax-nodes/float-type-name-asn";
import { IdentifierDefAsn } from "../../compiler/syntax-nodes/identifier-def-asn";
import { IdentifierUseAsn } from "../../compiler/syntax-nodes/identifier-use-asn";
import { IfExpressionAsn } from "../../compiler/syntax-nodes/if-expression-asn";
import { IndexAsn } from "../../compiler/syntax-nodes/index-asn";
import { IntTypeNameAsn } from "../../compiler/syntax-nodes/int-type-name-asn";
import { KvpAsn } from "../../compiler/syntax-nodes/kvp-asn";
import { LambdaAsn } from "../../compiler/syntax-nodes/lambda-asn";
import { LambdaSigAsn } from "../../compiler/syntax-nodes/lambda-sig-asn";
import { ListAsn } from "../../compiler/syntax-nodes/list-asn";
import { ListTypeNameAsn } from "../../compiler/syntax-nodes/list-type-name-asn";
import { LitBooleanAsn } from "../../compiler/syntax-nodes/lit-boolean-asn";
import { LitFloatAsn } from "../../compiler/syntax-nodes/lit-float-asn";
import { LitIntAsn } from "../../compiler/syntax-nodes/lit-int-asn";
import { LitStringAsn } from "../../compiler/syntax-nodes/lit-string-asn";
import { MethodCallAsn } from "../../compiler/syntax-nodes/method-call-asn";
import { NewInstanceAsn } from "../../compiler/syntax-nodes/new-instance-asn";
import { ParamDefAsn } from "../../compiler/syntax-nodes/param-def-asn";
import { ProcRefAsn } from "../../compiler/syntax-nodes/proc-ref-asn";
import { StringTypeNameAsn } from "../../compiler/syntax-nodes/string-type-name-asn";
import { ThisInstanceAsn } from "../../compiler/syntax-nodes/this-instance-asn";
import { TupleAsn } from "../../compiler/syntax-nodes/tuple-asn";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import { TypeNameAsn } from "../../compiler/syntax-nodes/type-name-asn";
import { UnaryExprAsn } from "../../compiler/syntax-nodes/unary-expr-asn";

import {
  ArgListContext,
  BinaryExpressionContext,
  BracketedExpressionContext,
  ChainableTermContext,
  DictionaryContext,
  EnumValueContext,
  ExpressionContext,
  IdentifierDefContext,
  IdentifierListContext,
  IdentifierUseContext,
  IdentifierWithOptIndexesContext,
  IfExpressionContext,
  IndexContext,
  IndexedAssignableContext,
  IndexedTermContext,
  InstanceProcRefContext,
  KvpContext,
  LambdaContext,
  ListContext,
  LitBinaryContext,
  LitBooleanContext,
  LitFloatContext,
  LitHexContext,
  LitIntegerContext,
  LitStringContext,
  MethodCallContext,
  MethodNameContext,
  NegateLogicalContext,
  NegateNumericContext,
  NewInstanceContext,
  ParamDefContext,
  ParamListContext,
  SimpleAssignableContext,
  TestNameContext,
  ThisAssignableContext,
  ThisInstanceContext,
  ThisProcRefContext,
  TupleContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { Language } from "../frames/frame-interfaces/language";
import { getArgs, getParamDefs, getTypes } from "./parser-helpers";

export class RefLangVisitorCompiler extends RefLangVisitor<AstNode> {
  constructor(
    private readonly language: Language,
    private scope: Scope,
    private readonly fieldId: string,
  ) {
    super();
  }

  precedingNode: AstNode = EmptyAsn.Instance;

  override visitIdentifierDef = (ctx: IdentifierDefContext) =>
    new IdentifierDefAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  override visitIdentifierUse = (ctx: IdentifierUseContext) =>
    new IdentifierUseAsn(
      ctx.NAME_STARTING_LC().getText(),
      this.precedingNode,
      this.fieldId,
      this.scope,
    );

  override visitSimpleAssignable = (ctx: SimpleAssignableContext) =>
    new AssignableAsn(
      this.visit(ctx.identifierUse())!,
      EmptyAsn.Instance,
      [],
      this.fieldId,
      this.scope,
    );

  override visitThisAssignable = (ctx: ThisAssignableContext) =>
    new AssignableAsn(
      this.visit(ctx.identifierUse())!,
      new ThisInstanceAsn(this.fieldId, this.scope),
      [],
      this.fieldId,
      this.scope,
    );

  override visitIndexedAssignable = (ctx: IndexedAssignableContext) => {
    const assignable = this.visit(ctx.assignable()) as AssignableAsn;
    assignable.indices.push(this.visit(ctx.index())!);
    return assignable;
  };

  override visitMethodName = (ctx: MethodNameContext) =>
    new IdentifierDefAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  override visitTestName = (ctx: TestNameContext) =>
    new IdentifierDefAsn(ctx.NAME_STARTING_TEST_().getText(), this.fieldId, this.scope);

  // typeName
  override visitIntTypeName = (_ctx: TypeNameContext) =>
    new IntTypeNameAsn(this.language, this.fieldId);

  override visitFloatTypeName = (_ctx: TypeNameContext) =>
    new FloatTypeNameAsn(this.language, this.fieldId);

  override visitBoolTypeName = (_ctx: TypeNameContext) =>
    new BoolTypeNameAsn(this.language, this.fieldId);

  override visitStringTypeName = (_ctx: TypeNameContext) =>
    new StringTypeNameAsn(this.language, this.fieldId);

  override visitListTypeName = (_ctx: TypeNameContext) =>
    new ListTypeNameAsn(this.language, this.fieldId, this.scope);

  override visitUdtTypeName = (ctx: TypeNameContext) =>
    new TypeNameAsn(ctx.getText(), this.fieldId, this.scope);

  // constantValue

  override visitLitBoolean = (ctx: LitBooleanContext) =>
    new LitBooleanAsn(ctx.TRUE() !== null, this.fieldId);

  override visitLitInteger = (ctx: LitIntegerContext) =>
    new LitIntAsn(ctx.LITERAL_INTEGER().getText(), false, false, this.fieldId);

  override visitLitBinary = (ctx: LitBinaryContext) =>
    new LitIntAsn(ctx.LITERAL_BINARY().getText().replace("0b", ""), true, false, this.fieldId);

  override visitLitHex = (ctx: LitHexContext) =>
    new LitIntAsn(ctx.LITERAL_HEX().getText().replace("0x", ""), false, true, this.fieldId);

  override visitLitFloat = (ctx: LitFloatContext) => new LitFloatAsn(ctx.getText(), this.fieldId);

  override visitLitString = (ctx: LitStringContext) =>
    new LitStringAsn(ctx.getText(), this.fieldId);

  override visitArgList = (ctx: ArgListContext) => new CsvAsn(getArgs(this, ctx), this.fieldId);

  override visitParamList = (ctx: ParamListContext) =>
    new ParamListAsn(getParamDefs(this, ctx), this.fieldId, this.scope);

  override visitIdentifierList = (ctx: IdentifierListContext) => {
    const identifierDefs = ctx.identifierDef().map((id) => this.visit(id)!);
    return new IdentifierListAsn(identifierDefs, this.fieldId, this.scope);
  };

  // type: typeTuple | typeName | typeGeneric | typeFunc;
  override visitTypeTuple = (ctx: TypeTupleContext) =>
    new TypeAsn(
      getTypeName(this.language, "Tuple", this.fieldId, this.scope),
      getTypes(this, ctx),
      this.fieldId,
      this.scope,
    );

  override visitTypeGeneric = (ctx: TypeGenericContext) =>
    new TypeAsn(this.visit(ctx.typeName())!, getTypes(this, ctx), this.fieldId, this.scope);

  override visitTypeFunc = (ctx: TypeFuncContext) =>
    new TypeAsn(
      getTypeName(this.language, "Func", this.fieldId, this.scope),
      getTypes(this, ctx),
      this.fieldId,
      this.scope,
    );

  override visitEnumValue = (ctx: EnumValueContext) =>
    new EnumValueAsn(
      this.visit(ctx.identifierUse())!,
      new EnumType(ctx.typeName().getText()),
      this.fieldId,
      this.scope,
    );

  override visitParamDef = (ctx: ParamDefContext) =>
    new ParamDefAsn(
      this.visit(ctx.identifierDef())!,
      this.visit(ctx.type())!,
      this.fieldId,
      this.scope,
    );

  override visitIndex = (ctx: IndexContext) => {
    const pn = this.precedingNode; // so not reset by expression

    return new IndexAsn(
      this.visit(ctx.expression()) ?? EmptyAsn.Instance,
      pn,
      this.fieldId,
      this.scope,
    );
  };

  // expression

  override visitNewInstanceExpression = (ctx: ExpressionContext) => {
    this.precedingNode = EmptyAsn.Instance;
    return this.visitChildren(ctx)!;
  };

  override visitUnaryExpressionLabel = (ctx: ExpressionContext) => {
    this.precedingNode = EmptyAsn.Instance;
    return this.visitChildren(ctx)!;
  };

  override visitTermExpression = (ctx: ExpressionContext) => {
    this.precedingNode = EmptyAsn.Instance;
    return this.visitChildren(ctx)!;
  };

  override visitBinaryExpressionLabel = (ctx: ExpressionContext) => {
    this.precedingNode = EmptyAsn.Instance;
    return this.visitChildren(ctx)!;
  };

  override visitIfExpression = (ctx: IfExpressionContext) => {
    const condition = this.visit(ctx._condition!)!;
    const trueExpression = this.visit(ctx._true_!)!;
    const falseExpression = this.visit(ctx._false_!)!;
    return new IfExpressionAsn(
      condition,
      trueExpression,
      falseExpression,
      this.fieldId,
      this.scope,
    );
  };

  override visitNewInstance = (ctx: NewInstanceContext) =>
    new NewInstanceAsn(
      this.visit(ctx.type())!,
      getArgs(this, ctx.argList()),
      this.fieldId,
      this.scope,
    );

  // unary expression
  override visitNegateLogical = (ctx: NegateLogicalContext) =>
    new UnaryExprAsn(this.language.NOT, this.visit(ctx.term())!, this.fieldId, this.scope);

  override visitNegateNumeric = (ctx: NegateNumericContext) =>
    new UnaryExprAsn("-", this.visit(ctx.term())!, this.fieldId, this.scope);

  override visitIndexedTerm = (ctx: IndexedTermContext) => {
    this.precedingNode = this.visit(ctx.term())!;
    return this.visit(ctx.index()!)!;
  };

  override visitChainableTerm = (ctx: ChainableTermContext) => {
    this.precedingNode = this.visit(ctx.term())!;
    return this.visit(ctx.chainable()!)!;
  };

  override visitThisInstance = (_ctx: ThisInstanceContext) =>
    new ThisInstanceAsn(this.fieldId, this.scope);

  override visitBracketedExpression = (ctx: BracketedExpressionContext) =>
    new BracketedExpressionAsn(this.visit(ctx.expression())!, this.fieldId);

  override visitBinaryExpression = (ctx: BinaryExpressionContext) =>
    new BinaryExpressionAsn(
      ctx.binaryOperator().getText(),
      this.visit(ctx.term())!,
      this.visit(ctx.expression())!,
      this.fieldId,
      this.scope,
    );

  override visitList = (ctx: ListContext) => {
    const items = ctx
      .expressionList()
      .expression()
      .map((e) => this.visit(e))
      .filter((e) => e) as AstNode[];
    return new ListAsn(items, this.fieldId, this.scope);
  };

  override visitTuple = (ctx: TupleContext) => {
    const items = ctx
      .expressionList()
      .expression()
      .map((e) => this.visit(e))
      .filter((e) => e) as AstNode[];
    return new TupleAsn(items, this.fieldId);
  };

  override visitDictionary = (ctx: DictionaryContext) => {
    const items = ctx
      .kvpList()
      .kvp()
      .map((e) => this.visit(e))
      .filter((e) => e) as KvpAsn[];
    return new DictionaryAsn(items, this.fieldId, this.scope);
  };

  override visitKvp = (ctx: KvpContext) =>
    new KvpAsn(this.visit(ctx._key!)!, this.visit(ctx._value!)!, this.fieldId);

  override visitMethodCall = (ctx: MethodCallContext) => {
    const pn = this.precedingNode;
    return new MethodCallAsn(
      this.visit(ctx.methodName())!,
      getArgs(this, ctx.argList()),
      pn,
      this.fieldId,
      this.scope,
    );
  };

  override visitIdentifierWithOptIndexes = (ctx: IdentifierWithOptIndexesContext) =>
    new ProcRefAsn(
      this.visit(ctx.identifierUse())!,
      EmptyAsn.Instance,
      ctx.index().map((idx) => this.visit(idx)!),
      this.fieldId,
      this.scope,
    );

  override visitThisProcRef = (ctx: ThisProcRefContext) =>
    new ProcRefAsn(
      this.visit(ctx.methodName())!,
      new ThisInstanceAsn(this.fieldId, this.scope),
      [],
      this.fieldId,
      this.scope,
    );

  override visitInstanceProcRef = (ctx: InstanceProcRefContext) =>
    new ProcRefAsn(
      this.visit(ctx.methodName())!,
      this.visit(ctx.identifierWithOptIndexes())!,
      [],
      this.fieldId,
      this.scope,
    );

  override visitLambda = (ctx: LambdaContext) => {
    const parameters = (ctx
      .paramList()
      ?.paramDef()
      .map((p) => this.visit(p)) ?? []) as ParamDefAsn[];

    const currentScope = this.scope;

    const signature = new LambdaSigAsn(parameters, this.fieldId, currentScope);

    this.scope = signature;

    const lambda = new LambdaAsn(signature, this.visit(ctx.expression())!, this.fieldId);

    this.scope = currentScope;
    return lambda;
  };
}

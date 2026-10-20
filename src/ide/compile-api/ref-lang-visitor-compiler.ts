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
import { IfExprAsn } from "../../compiler/syntax-nodes/if-expr-asn";
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
import { LitTupleAsn } from "../../compiler/syntax-nodes/lit-tuple-asn";
import { MethodCallAsn } from "../../compiler/syntax-nodes/method-call-asn";
import { NewInstanceAsn } from "../../compiler/syntax-nodes/new-instance-asn";
import { ParamDefAsn } from "../../compiler/syntax-nodes/param-def-asn";
import { ProcRefAsn } from "../../compiler/syntax-nodes/proc-ref-asn";
import { StringTypeNameAsn } from "../../compiler/syntax-nodes/string-type-name-asn";
import { TermAsn } from "../../compiler/syntax-nodes/term-asn";
import { ThisInstanceAsn } from "../../compiler/syntax-nodes/this-instance-asn";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import { TypeNameAsn } from "../../compiler/syntax-nodes/type-name-asn";
import { UnaryExprAsn } from "../../compiler/syntax-nodes/unary-expr-asn";
import {
  ArgListContext,
  BinaryExpressionContext,
  BracketedExpressionContext,
  DictionaryContext,
  EnumValueContext,
  ExpressionContext,
  IdentifierDefContext,
  IdentifierListContext,
  IdentifierUseContext,
  IdentifierWithOptIndexesContext,
  IndexContext,
  IndexedAssignableContext,
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
  TermContext,
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
    private readonly scope: Scope,
    private readonly fieldId: string,
  ) {
    super();
  }

  topLevelTerm = true;

  override visitIdentifierDef = (ctx: IdentifierDefContext) =>
    new IdentifierDefAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  override visitIdentifierUse = (ctx: IdentifierUseContext) =>
    new IdentifierUseAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

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

  override visitMethodCall = (ctx: MethodCallContext) => {
    const args = ctx.argList();
    const argList = args ? getArgs(this, args) : [];
    const name = ctx.methodName().getText();

    return new MethodCallAsn(name, argList, this.fieldId, this.scope);
  };

  override visitIndex = (ctx: IndexContext) =>
    new IndexAsn(this.visit(ctx.expression()) ?? EmptyAsn.Instance, this.fieldId, this.scope);

  override visitTerm = (ctx: TermContext) => {
    const hasDot = !!ctx.DOT();
    const index = ctx.index();
    let term: TermAsn;
    let tl = this.topLevelTerm;

    if (hasDot) {
      this.topLevelTerm = false;
      const lhs = this.visit(ctx.term()!)!;
      const rhs = this.visit(ctx.chainable()!)!;

      term = new TermAsn(lhs, rhs, undefined, this.fieldId, this.scope);
    } else if (index) {
      tl = false;
      const lhs = this.visit(ctx.term()!)!;
      const idx = this.visit(index)!;

      term = new TermAsn(lhs, undefined, idx, this.fieldId, this.scope);
    } else {
      term = new TermAsn(this.visitChildren(ctx)!, undefined, undefined, this.fieldId, this.scope);
    }

    term.topLevel = tl;

    return term;
  };

  override visitBracketedExpression = (ctx: BracketedExpressionContext) =>
    new BracketedExpressionAsn(this.visit(ctx.expression())!, this.fieldId);

  override visitList = (ctx: ListContext) => {
    const items = ctx
      .expressionList()
      .expression()
      .map((e) => this.visit(e))
      .filter((e) => e) as AstNode[];
    return new ListAsn(items, this.fieldId, this.scope);
  };

  override visitKvp = (ctx: KvpContext) =>
    new KvpAsn(this.visit(ctx.expression(0)!)!, this.visit(ctx.expression(1)!)!, this.fieldId);

  override visitDictionary = (ctx: DictionaryContext) => {
    const items = ctx
      .kvpList()
      .kvp()
      .map((e) => this.visit(e))
      .filter((e) => e) as KvpAsn[];
    return new DictionaryAsn(items, this.fieldId, this.scope);
  };

  override visitTuple = (ctx: TupleContext) => {
    const items = ctx
      .expressionList()
      .expression()
      .map((e) => this.visit(e))
      .filter((e) => e) as AstNode[];
    return new LitTupleAsn(items, this.fieldId);
  };

  override visitNegateLogical = (ctx: NegateLogicalContext) =>
    new UnaryExprAsn(this.language.NOT, this.visit(ctx.term())!, this.fieldId, this.scope);

  override visitNegateNumeric = (ctx: NegateNumericContext) =>
    new UnaryExprAsn("-", this.visit(ctx.term())!, this.fieldId, this.scope);

  override visitBinaryExpression = (ctx: BinaryExpressionContext) =>
    new BinaryExpressionAsn(
      ctx.binaryOperator().getText(),
      this.visit(ctx.term())!,
      this.visit(ctx.expression())!,
      this.fieldId,
      this.scope,
    );

  override visitExpression = (ctx: ExpressionContext) => {
    this.topLevelTerm = true;

    if (ctx.expression().length > 0) {
      const condition = this.visit(ctx.expression(0)!)!;
      const lhs = this.visit(ctx.expression(1)!)!;
      const rhs = this.visit(ctx.expression(2)!)!;
      return new IfExprAsn(condition, lhs, rhs, this.fieldId, this.scope);
    } else {
      return this.visitChildren(ctx)!;
    }
  };

  override visitNewInstance = (ctx: NewInstanceContext) => {
    const type = this.visit(ctx.type()) as TypeAsn;
    const argList = ctx.argList();
    const params = argList ? getArgs(this, argList) : [];
    return new NewInstanceAsn(type, params, this.fieldId, this.scope);
  };

  override visitThisInstance = (_ctx: ThisInstanceContext) => {
    return new ThisInstanceAsn(this.fieldId, this.scope);
  };

  override visitLambda = (ctx: LambdaContext) => {
    const parameters =
      ctx
        .paramList()
        ?.paramDef()
        .map((p) => this.visit(p)) ?? [];

    const sig = new LambdaSigAsn(parameters as ParamDefAsn[], this.fieldId, this.scope);

    const body = this.visit(ctx.expression())!;

    return new LambdaAsn(sig, body, this.fieldId);
  };

  override visitIdentifierWithOptIndexes = (ctx: IdentifierWithOptIndexesContext) => {
    const id = this.visit(ctx.identifierUse())!;
    const indices = ctx.index().map((idx) => this.visit(idx)!);

    return new ProcRefAsn(id, EmptyAsn.Instance, indices, this.fieldId, this.scope);
  };

  override visitThisProcRef = (ctx: ThisProcRefContext) => {
    const thisNode = new ThisInstanceAsn(this.fieldId, this.scope);
    const name = this.visit(ctx.methodName())!;
    return new ProcRefAsn(name, thisNode, [], this.fieldId, this.scope);
  };

  override visitInstanceProcRef = (ctx: InstanceProcRefContext) => {
    const node = this.visit(ctx.identifierWithOptIndexes())!;
    const name = this.visit(ctx.methodName())!;
    return new ProcRefAsn(name, node, [], this.fieldId, this.scope);
  };
}

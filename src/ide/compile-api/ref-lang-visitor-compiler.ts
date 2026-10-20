import { TerminalNode } from "antlr4ng";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { AstQualifierNode } from "../../compiler/compiler-interfaces/ast-qualifier-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { EnumType } from "../../compiler/symbols/enum-type";
import { AssignableAsn } from "../../compiler/syntax-nodes/assignable-asn";
import { getTypeName, getTypeNameById } from "../../compiler/syntax-nodes/ast-helpers";
import { BinaryExprAsn as BinaryExpressionAsn } from "../../compiler/syntax-nodes/binary-expr-asn";
import { BracketedAsn as BracketedExpressionAsn } from "../../compiler/syntax-nodes/bracketed-asn";
import { CsvAsn } from "../../compiler/syntax-nodes/csv-asn";
import { DictionaryAsn } from "../../compiler/syntax-nodes/dictionary-asn";
import { EmptyAsn } from "../../compiler/syntax-nodes/empty-asn";
import { EnumValueAsn } from "../../compiler/syntax-nodes/enum-value-asn";
import { IdentifierListAsn } from "../../compiler/syntax-nodes/fields/identifier-list-asn";
import { ParamListAsn } from "../../compiler/syntax-nodes/fields/param-list-asn";
import { IdentifierDefAsn } from "../../compiler/syntax-nodes/identifier-def-asn";
import { IdentifierUseAsn } from "../../compiler/syntax-nodes/identifier-use-asn";
import { IfExprAsn } from "../../compiler/syntax-nodes/if-expr-asn";
import { IndexAsn } from "../../compiler/syntax-nodes/index-asn";
import { KvpAsn } from "../../compiler/syntax-nodes/kvp-asn";
import { LambdaAsn } from "../../compiler/syntax-nodes/lambda-asn";
import { LambdaSigAsn } from "../../compiler/syntax-nodes/lambda-sig-asn";
import { ListAsn } from "../../compiler/syntax-nodes/list-asn";
import { LitBooleanAsn } from "../../compiler/syntax-nodes/lit-boolean-asn";
import { LitFloatAsn } from "../../compiler/syntax-nodes/lit-float-asn";
import { LitIntAsn } from "../../compiler/syntax-nodes/lit-int-asn";
import { LitRegExAsn } from "../../compiler/syntax-nodes/lit-regex-asn";
import { LitStringAsn } from "../../compiler/syntax-nodes/lit-string-asn";
import { LitTupleAsn } from "../../compiler/syntax-nodes/lit-tuple-asn";
import { MethodCallAsn } from "../../compiler/syntax-nodes/method-call-asn";
import { NewInstanceAsn } from "../../compiler/syntax-nodes/new-instance-asn";
import { ParamDefAsn } from "../../compiler/syntax-nodes/param-def-asn";
import { TermAsn } from "../../compiler/syntax-nodes/term-asn";
import { ThisInstanceAsn } from "../../compiler/syntax-nodes/this-instance-asn";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
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
  SimpleAssignableContext,
  TermContext,
  ThisAssignableContext,
  ThisInstanceContext,
  ThisProcRefContext,
  TupleContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { Language } from "../frames/frame-interfaces/language";
import { getArgs, getParamDefs, getTypes, visitTypeHelper } from "./parser-helpers";

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

  override visitSimpleAssignable = (ctx: SimpleAssignableContext) => {
    return new AssignableAsn(
      ctx.getText(),
      false,
      EmptyAsn.Instance,
      new CsvAsn([], this.fieldId),
      this.fieldId,
      this.scope,
    );
  };

  override visitThisAssignable = (ctx: ThisAssignableContext) => {
    const thisAsn = new ThisInstanceAsn(this.fieldId, this.scope);
    const id = ctx.identifierUse()?.getText() ?? "";
    return new AssignableAsn(
      id,
      true,
      thisAsn as unknown as AstQualifierNode,
      new CsvAsn([], this.fieldId),
      this.fieldId,
      this.scope,
    );
  };

  override visitIndexedAssignable = (ctx: IndexedAssignableContext) => {
    const assignable = this.visit(ctx.assignable()!) as AssignableAsn;
    const index = this.visit(ctx.index()!)!;
    const indexArr = [];

    for (const idx of assignable.indices.items) {
      indexArr.push(idx);
    }

    indexArr.push(index);

    assignable.indices = new CsvAsn(indexArr, this.fieldId);

    return assignable;
  };

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

  // type: typeTuple | typeName | typeGeneric | typeFunc;
  override visitType = (ctx: TypeContext) => visitTypeHelper<AstNode>(this, ctx);

  override visitTerminal(ctx: TerminalNode) {
    return getTypeNameById(this.language, ctx.symbol.type, ctx.getText(), this.fieldId, this.scope);
  }

  override visitMethodName = (ctx: MethodNameContext) =>
    new IdentifierDefAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  override visitParamList = (ctx: ParamListContext) => {
    const paramDefs = getParamDefs(this, ctx);
    const paramList = new ParamListAsn(this.fieldId, this.scope);
    paramList.parms = new CsvAsn(paramDefs, this.fieldId);
    return paramList;
  };

  override visitArgList = (ctx: ArgListContext) => {
    const argList = getArgs(this, ctx).filter((a) => a);
    return new CsvAsn(argList, this.fieldId);
  };

  override visitParamDef = (ctx: ParamDefContext) =>
    new ParamDefAsn(
      ctx.identifierDef().NAME_STARTING_LC().getText(),
      this.visit(ctx.type())!,
      this.fieldId,
      this.scope,
    );

  override visitMethodCall = (ctx: MethodCallContext) => {
    const args = ctx.argList();
    const argList = args ? getArgs(this, args).filter((a) => a) : [];
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

  override visitLitInt = (ctx: LitIntContext) => {
    const binary = ctx.LITERAL_BINARY();
    const hex = ctx.LITERAL_HEX();
    const int = ctx.LITERAL_INTEGER();

    const isBinary = binary !== null;
    const isHex = hex !== null;

    let value = (hex ?? binary ?? int!).getText();

    if (isBinary) {
      value = value.replace("0b", "");
    }

    if (isHex) {
      value = value.replace("0x", "");
    }

    return new LitIntAsn(value, isBinary, isHex, this.fieldId);
  };

  override visitLitFloat = (ctx: LitFloatContext) => new LitFloatAsn(ctx.getText(), this.fieldId);

  override visitLitBoolean = (ctx: LitBooleanContext) =>
    new LitBooleanAsn(ctx.TRUE() !== null, this.fieldId);

  override visitLitString = (ctx: LitStringContext) =>
    new LitStringAsn(ctx.getText(), this.fieldId);

  override visitLitRegExp = (ctx: LitRegExpContext) =>
    new LitRegExAsn(ctx.getText(), this.fieldId, this.scope);

  override visitEnumValue = (ctx: EnumValueContext) =>
    new EnumValueAsn(
      ctx.identifierUse().getText(),
      new EnumType(ctx.typeName().getText()),
      this.fieldId,
      this.scope,
    );

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
    const id = ctx.identifierUse().getText();
    const indices = new CsvAsn(
      ctx.index().map((idx) => this.visit(idx)!),
      this.fieldId,
    );

    return new AssignableAsn(id, false, EmptyAsn.Instance, indices, this.fieldId, this.scope);
  };

  override visitThisProcRef = (ctx: ThisProcRefContext) => {
    const thisNode = new ThisInstanceAsn(this.fieldId, this.scope);
    const name = ctx.methodName().getText();
    return new AssignableAsn(
      name,
      false,
      thisNode as unknown as AstQualifierNode,
      EmptyAsn.Instance,
      this.fieldId,
      this.scope,
    );
  };

  override visitInstanceProcRef = (ctx: InstanceProcRefContext) => {
    const node = this.visit(ctx.identifierWithOptIndexes());
    const name = ctx.methodName().getText();
    return new AssignableAsn(
      name,
      false,
      node as unknown as AstQualifierNode,
      EmptyAsn.Instance,
      this.fieldId,
      this.scope,
    );
  };

  override visitIdentifierList = (ctx: IdentifierListContext) => {
    const identifierDefs = ctx.identifierDef().map((id) => this.visit(id)!);
    const identifierList = new IdentifierListAsn(this.fieldId, this.scope);

    identifierList.values = new CsvAsn(identifierDefs, this.fieldId);

    return identifierList;
  };
}

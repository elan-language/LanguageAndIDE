import { TerminalNode } from "antlr4ng";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { EnumType } from "../../compiler/symbols/enum-type";
import { getTypeName, getTypeNameById } from "../../compiler/syntax-nodes/ast-helpers";
import { BinaryExprAsn } from "../../compiler/syntax-nodes/binary-expr-asn";
import { BracketedAsn } from "../../compiler/syntax-nodes/bracketed-asn";
import { CsvAsn } from "../../compiler/syntax-nodes/csv-asn";
import { EmptyAsn } from "../../compiler/syntax-nodes/empty-asn";
import { ParamListAsn } from "../../compiler/syntax-nodes/fields/param-list-asn";
import { FuncCallAsn } from "../../compiler/syntax-nodes/func-call-asn";
import { IdDefAsn } from "../../compiler/syntax-nodes/id-def-asn";
import { IfExprAsn } from "../../compiler/syntax-nodes/if-expr-asn";
import { IndexAsn } from "../../compiler/syntax-nodes/index-asn";
import { KvpAsn } from "../../compiler/syntax-nodes/kvp-asn";
import { LiteralBooleanAsn } from "../../compiler/syntax-nodes/literal-boolean-asn";
import { LiteralDictionaryAsn } from "../../compiler/syntax-nodes/literal-dictionay-asn";
import { LiteralEnumAsn } from "../../compiler/syntax-nodes/literal-enum-asn";
import { LiteralFloatAsn } from "../../compiler/syntax-nodes/literal-float-asn";
import { LiteralIntAsn } from "../../compiler/syntax-nodes/literal-int-asn";
import { LiteralListAsn } from "../../compiler/syntax-nodes/literal-list-asn";
import { LiteralStringAsn } from "../../compiler/syntax-nodes/literal-string-asn";
import { LiteralTupleAsn } from "../../compiler/syntax-nodes/literal-tuple-asn";
import { NewAsn } from "../../compiler/syntax-nodes/new-asn";
import { ParamDefAsn } from "../../compiler/syntax-nodes/param-def-asn";
import { TermAsn } from "../../compiler/syntax-nodes/term-asn";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import { UnaryExprAsn } from "../../compiler/syntax-nodes/unary-expr-asn";
import {
  BinaryExpressionContext,
  BracketedExpressionContext,
  DictionaryContext,
  EnumValueContext,
  ExpressionContext,
  IdentifierDefContext,
  IdentifierUseContext,
  IndexContext,
  KvpContext,
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
  ParamsListContext,
  TermContext,
  ThisInstanceContext,
  TupleContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { Language } from "../frames/frame-interfaces/language";
import { getArgs, getParamDefs, getTypes, visitTypeHelper } from "./parser-helpers";
import { IdAsn } from "../../compiler/syntax-nodes/id-asn";
import { ThisAsn } from "../../compiler/syntax-nodes/this-asn";

export class RefLangVisitorCompiler extends RefLangVisitor<AstNode> {
  constructor(
    private readonly language: Language,
    private readonly scope: Scope,
    private readonly fieldId: string,
  ) {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) =>
    new TypeAsn(
      getTypeName(this.language, "Tuple", this.fieldId, this.scope),
      getTypes(this, ctx),
      this.fieldId,
      this.scope,
    );

  visitTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    new TypeAsn(this.visit(ctx.typeName())!, getTypes(this, ctx), this.fieldId, this.scope);

  visitTypeFunc = (ctx: TypeFuncContext) =>
    new TypeAsn(
      getTypeName(this.language, "Func", this.fieldId, this.scope),
      getTypes(this, ctx),
      this.fieldId,
      this.scope,
    );

  visitType = (ctx: TypeContext) => visitTypeHelper<AstNode>(this, ctx);

  visitTerminal(ctx: TerminalNode) {
    return getTypeNameById(this.language, ctx.symbol.type, ctx.getText(), this.fieldId, this.scope);
  }

  visitIdentifierDef = (ctx: IdentifierDefContext) =>
    new IdDefAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  visitIdentifierUse = (ctx: IdentifierUseContext) =>
    new IdAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  visitMethodName = (ctx: MethodNameContext) =>
    new IdDefAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  visitParamsList = (ctx: ParamsListContext) => {
    const paramDefs = getParamDefs(this, ctx);
    const paramsList = new ParamListAsn(this.fieldId, this.scope);
    paramsList.parms = new CsvAsn(paramDefs, this.fieldId);
    return paramsList;
  };

  visitParamDef = (ctx: ParamDefContext) =>
    new ParamDefAsn(
      ctx.identifierDef().NAME_STARTING_LC().getText(),
      this.visit(ctx.type())!,
      this.fieldId,
      this.scope,
    );

  visitMethodCall = (ctx: MethodCallContext) => {
    const args = ctx.argList();
    const argList = args ? getArgs(this, args).filter((a) => a) : [];
    const name = ctx.methodName().getText();

    return new FuncCallAsn(name, argList, this.fieldId, this.scope);
  };

  visitIndex = (ctx: IndexContext) =>
    new IndexAsn(this.visit(ctx.expression()) ?? EmptyAsn.Instance, this.fieldId, this.scope);

  visitTerm = (ctx: TermContext) => {
    const hasDot = !!ctx.DOT();

    if (hasDot) {
      const lhs = this.visit(ctx.term()!)!;
      const rhs = this.visit(ctx.chainable()!)!;
      return new TermAsn(lhs, rhs, undefined, this.fieldId, this.scope);
    }

    const index = ctx.index();

    if (index) {
      const lhs = this.visit(ctx.term()!)!;
      const idx = this.visit(index)!;

      return new TermAsn(lhs, undefined, idx, this.fieldId, this.scope);
    }

    return new TermAsn(this.visitChildren(ctx)!, undefined, undefined, this.fieldId, this.scope);
  };

  visitBracketedExpression = (ctx: BracketedExpressionContext) =>
    new BracketedAsn(this.visit(ctx.expression())!, this.fieldId);

  visitList = (ctx: ListContext) => {
    const items = ctx
      .expressionList()
      .expression()
      .map((e) => this.visit(e))
      .filter((e) => e) as AstNode[];
    return new LiteralListAsn(items, this.fieldId, this.scope);
  };

  visitKvp = (ctx: KvpContext) =>
    new KvpAsn(this.visit(ctx.expression(0)!)!, this.visit(ctx.expression(1)!)!, this.fieldId);

  visitDictionary = (ctx: DictionaryContext) => {
    const items = ctx
      .kvpList()
      .kvp()
      .map((e) => this.visit(e))
      .filter((e) => e) as KvpAsn[];
    return new LiteralDictionaryAsn(items, this.fieldId, this.scope);
  };

  visitTuple = (ctx: TupleContext) => {
    const items = ctx
      .tupleElementList()
      .expression()
      .map((e) => this.visit(e))
      .filter((e) => e) as AstNode[];
    return new LiteralTupleAsn(items, this.fieldId);
  };

  visitLitInt = (ctx: LitIntContext) => {
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

    return new LiteralIntAsn(value, isBinary, isHex, this.fieldId);
  };

  visitLitFloat = (ctx: LitFloatContext) => new LiteralFloatAsn(ctx.getText(), this.fieldId);

  visitLitBoolean = (ctx: LitBooleanContext) =>
    new LiteralBooleanAsn(ctx.TRUE() !== null, this.fieldId);

  visitLitString = (ctx: LitStringContext) => new LiteralStringAsn(ctx.getText(), this.fieldId);

  visitEnumValue = (ctx: EnumValueContext) =>
    new LiteralEnumAsn(
      ctx.identifierUse().getText(),
      new EnumType(ctx.typeName().getText()),
      this.fieldId,
      this.scope,
    );

  visitNegateLogical = (ctx: NegateLogicalContext) =>
    new UnaryExprAsn("not", this.visit(ctx.term())!, this.fieldId, this.scope);

  visitNegateNumeric = (ctx: NegateNumericContext) =>
    new UnaryExprAsn("-", this.visit(ctx.term())!, this.fieldId, this.scope);

  visitBinaryExpression = (ctx: BinaryExpressionContext) =>
    new BinaryExprAsn(
      ctx.binaryOperator().getText(),
      this.visit(ctx.term())!,
      this.visit(ctx.expression())!,
      this.fieldId,
      this.scope,
    );

  visitExpression = (ctx: ExpressionContext) => {
    if (ctx.expression().length > 0) {
      const condition = this.visit(ctx.expression(0)!)!;
      const lhs = this.visit(ctx.expression(1)!)!;
      const rhs = this.visit(ctx.expression(2)!)!;
      return new IfExprAsn(condition, lhs, rhs, this.fieldId, this.scope);
    } else {
      return this.visitChildren(ctx)!;
    }
  };

  visitNewInstance = (ctx: NewInstanceContext) => {
    const type = this.visit(ctx.type()) as TypeAsn;
    const argList = ctx.argList();
    const params = argList ? getArgs(this, argList) : [];
    return new NewAsn(type, params, this.fieldId, this.scope);
  };

  visitThisInstance = (_ctx: ThisInstanceContext) => {
    return new ThisAsn(this.fieldId, this.scope);
  };
}

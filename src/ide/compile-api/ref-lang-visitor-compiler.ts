import { TerminalNode } from "antlr4ng";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getTypeName, getTypeNameById } from "../../compiler/syntax-nodes/ast-helpers";
import { BracketedAsn } from "../../compiler/syntax-nodes/bracketed-asn";
import { CsvAsn } from "../../compiler/syntax-nodes/csv-asn";
import { EmptyAsn } from "../../compiler/syntax-nodes/empty-asn";
import { ParamListAsn } from "../../compiler/syntax-nodes/fields/param-list-asn";
import { FuncCallAsn } from "../../compiler/syntax-nodes/func-call-asn";
import { IdDefAsn } from "../../compiler/syntax-nodes/id-def-asn";
import { IndexAsn } from "../../compiler/syntax-nodes/index-asn";
import { LiteralListAsn } from "../../compiler/syntax-nodes/literal-list-asn";
import { LiteralTupleAsn } from "../../compiler/syntax-nodes/literal-tuple-asn";
import { ParamDefAsn } from "../../compiler/syntax-nodes/param-def-asn";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import {
  BracketedExpressionContext,
  ChainableContext,
  IdentifierContext,
  IndexContext,
  ListContext,
  MethodCallContext,
  ParamDefContext,
  ParamsListContext,
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

  visitIdentifier = (ctx: IdentifierContext) =>
    new IdDefAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  visitMethodName = (ctx: IdentifierContext) =>
    new IdDefAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  visitParamsList = (ctx: ParamsListContext) => {
    const paramDefs = getParamDefs(this, ctx);
    const paramsList = new ParamListAsn(this.fieldId, this.scope);
    paramsList.parms = new CsvAsn(paramDefs, this.fieldId);
    return paramsList;
  };

  visitParamDef = (ctx: ParamDefContext) => {
    const identifier = ctx.identifier().NAME_STARTING_LC().getText();
    const type = this.visit(ctx.type())!;

    return new ParamDefAsn(identifier, type, this.fieldId, this.scope);
  };

  visitMethodCall = (ctx: MethodCallContext) => {
    const args = ctx.argList();
    const argList = args ? getArgs(this, args).filter((a) => a) : [];
    const name = ctx.methodName().getText();

    return new FuncCallAsn(name, argList, this.fieldId, this.scope);
  };

  visitIndex = (ctx: IndexContext) => {
    const expr = this.visit(ctx.expression()) ?? EmptyAsn.Instance;
    return new IndexAsn(expr, this.fieldId, this.scope);
  };

  visitChainable = (ctx: ChainableContext) => {
    const indices = ctx
      .index()
      .map((i) => this.visit(i))
      .filter((i) => i) as IndexAsn[];
    const methodCall = ctx.methodCall();
    const identifier = ctx.identifier();
    const prefix = methodCall ? this.visit(methodCall) : this.visit(identifier!);

    let precedingNode = prefix!;
    let lastNode = prefix;

    for (const index of indices) {
      index.updateScopeAndChain(this.scope, precedingNode);
      precedingNode = index;
      lastNode = index;
    }

    return lastNode!;
  };

  visitBracketedExpression = (ctx: BracketedExpressionContext) => {
    const expresssion = this.visit(ctx.expression())!;
    return new BracketedAsn(expresssion, this.fieldId);
  };

  visitList = (ctx: ListContext) => {
    const items = ctx
      .expressionList()
      .expression()
      .map((e) => this.visit(e))
      .filter((e) => e) as AstNode[];
    return new LiteralListAsn(items, this.fieldId, this.scope);
  };

  visitTuple = (ctx: TupleContext) => {
    const items = ctx
      .tupleElementList()
      .expression()
      .map((e) => this.visit(e))
      .filter((e) => e) as AstNode[];
    return new LiteralTupleAsn(items, this.fieldId);
  };
}

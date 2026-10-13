import { TerminalNode } from "antlr4ng";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { AstQualifierNode } from "../../compiler/compiler-interfaces/ast-qualifier-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { EnumType } from "../../compiler/symbols/enum-type";
import { getTypeName, getTypeNameById } from "../../compiler/syntax-nodes/ast-helpers";
import { BinaryExprAsn } from "../../compiler/syntax-nodes/binary-expr-asn";
import { BracketedAsn } from "../../compiler/syntax-nodes/bracketed-asn";
import { CsvAsn } from "../../compiler/syntax-nodes/csv-asn";
import { EmptyAsn } from "../../compiler/syntax-nodes/empty-asn";
import { ParamListAsn } from "../../compiler/syntax-nodes/fields/param-list-asn";
import { FuncCallAsn } from "../../compiler/syntax-nodes/func-call-asn";
import { IdAsn } from "../../compiler/syntax-nodes/id-asn";
import { IdDefAsn } from "../../compiler/syntax-nodes/id-def-asn";
import { IfExprAsn } from "../../compiler/syntax-nodes/if-expr-asn";
import { IndexAsn } from "../../compiler/syntax-nodes/index-asn";
import { KvpAsn } from "../../compiler/syntax-nodes/kvp-asn";
import { LambdaAsn } from "../../compiler/syntax-nodes/lambda-asn";
import { LambdaSigAsn } from "../../compiler/syntax-nodes/lambda-sig-asn";
import { LiteralBooleanAsn } from "../../compiler/syntax-nodes/literal-boolean-asn";
import { LiteralDictionaryAsn } from "../../compiler/syntax-nodes/literal-dictionay-asn";
import { LiteralEnumAsn } from "../../compiler/syntax-nodes/literal-enum-asn";
import { LiteralFloatAsn } from "../../compiler/syntax-nodes/literal-float-asn";
import { LiteralIntAsn } from "../../compiler/syntax-nodes/literal-int-asn";
import { LiteralListAsn } from "../../compiler/syntax-nodes/literal-list-asn";
import { LiteralRegExAsn } from "../../compiler/syntax-nodes/literal-regex-asn";
import { LiteralStringAsn } from "../../compiler/syntax-nodes/literal-string-asn";
import { LiteralTupleAsn } from "../../compiler/syntax-nodes/literal-tuple-asn";
import { NewAsn } from "../../compiler/syntax-nodes/new-asn";
import { ParamDefAsn } from "../../compiler/syntax-nodes/param-def-asn";
import { TermAsn } from "../../compiler/syntax-nodes/term-asn";
import { ThisAsn } from "../../compiler/syntax-nodes/this-asn";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import { UnaryExprAsn } from "../../compiler/syntax-nodes/unary-expr-asn";
import { VarAsn } from "../../compiler/syntax-nodes/var-asn";
import {
  AssignableContext,
  BinaryExpressionContext,
  BracketedExpressionContext,
  ConstantValueContext,
  DictionaryContext,
  EnumValueContext,
  ExpressionContext,
  IdentifierDefContext,
  IdentifierListContext,
  IdentifierUseContext,
  IdentifierWithOptIndexesContext,
  IndexContext,
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
  TermContext,
  ThisInstanceContext,
  ThisProcRefContext,
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
import { EnumValuesAsn } from "../../compiler/syntax-nodes/fields/enum-values-asn";

export class RefLangVisitorCompiler extends RefLangVisitor<AstNode> {
  constructor(
    private readonly language: Language,
    private readonly scope: Scope,
    private readonly fieldId: string,
  ) {
    super();
  }

  topLevelTerm = true;

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

  visitIdentifierUse = (ctx: IdentifierUseContext) => {
    const id = new IdAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);
    id.tempAntlrFlag = true;
    return id;
  };

  visitMethodName = (ctx: MethodNameContext) =>
    new IdDefAsn(ctx.NAME_STARTING_LC().getText(), this.fieldId, this.scope);

  visitParamList = (ctx: ParamListContext) => {
    const paramDefs = getParamDefs(this, ctx);
    const paramList = new ParamListAsn(this.fieldId, this.scope);
    paramList.parms = new CsvAsn(paramDefs, this.fieldId);
    return paramList;
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

    const fc = new FuncCallAsn(name, argList, this.fieldId, this.scope);
    // temp kludge fix TODO
    fc.tempAntlrFlag = true;
    return fc;
  };

  visitIndex = (ctx: IndexContext) =>
    new IndexAsn(this.visit(ctx.expression()) ?? EmptyAsn.Instance, this.fieldId, this.scope);

  visitTerm = (ctx: TermContext) => {
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
      .expressionList()
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

  visitLitRegExp = (ctx: LitRegExpContext) =>
    new LiteralRegExAsn(ctx.getText(), this.fieldId, this.scope);

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

  visitNewInstance = (ctx: NewInstanceContext) => {
    const type = this.visit(ctx.type()) as TypeAsn;
    const argList = ctx.argList();
    const params = argList ? getArgs(this, argList) : [];
    return new NewAsn(type, params, this.fieldId, this.scope);
  };

  visitThisInstance = (_ctx: ThisInstanceContext) => {
    return new ThisAsn(this.fieldId, this.scope);
  };

  visitLambda = (ctx: LambdaContext) => {
    const parameters =
      ctx
        .paramList()
        ?.paramDef()
        .map((p) => this.visit(p)) ?? [];

    const sig = new LambdaSigAsn(parameters as ParamDefAsn[], this.fieldId, this.scope);

    const body = this.visit(ctx.expression())!;

    return new LambdaAsn(sig, body, this.fieldId);
  };

  visitIdentifierWithOptIndexes = (ctx: IdentifierWithOptIndexesContext) => {
    const id = ctx.identifierUse().getText();
    const indices = new CsvAsn(
      ctx.index().map((idx) => this.visit(idx)!),
      this.fieldId,
    );

    return new VarAsn(id, false, EmptyAsn.Instance, indices, this.fieldId, this.scope);
  };

  visitThisProcRef = (ctx: ThisProcRefContext) => {
    const thisNode = new ThisAsn(this.fieldId, this.scope);
    const name = ctx.methodName().getText();
    return new VarAsn(
      name,
      false,
      thisNode as unknown as AstQualifierNode,
      EmptyAsn.Instance,
      this.fieldId,
      this.scope,
    );
  };

  visitInstanceProcRef = (ctx: InstanceProcRefContext) => {
    const node = this.visit(ctx.identifierWithOptIndexes());
    const name = ctx.methodName().getText();
    return new VarAsn(
      name,
      false,
      node as unknown as AstQualifierNode,
      EmptyAsn.Instance,
      this.fieldId,
      this.scope,
    );
  };

  visitAssignable = (ctx: AssignableContext) => {
    if (ctx.THIS_INSTANCE()) {
      const thisAsn = new ThisAsn(this.fieldId, this.scope);
      const id = ctx.identifierUse()?.getText() ?? "";
      return new VarAsn(
        id,
        true,
        thisAsn as unknown as AstQualifierNode,
        new CsvAsn([], this.fieldId),
        this.fieldId,
        this.scope,
      );
    } else if (ctx.index()) {
      const assignable = this.visit(ctx.assignable()!) as VarAsn;
      const index = this.visit(ctx.index()!)!;
      const indexArr = [];

      for (const idx of assignable.indices.items) {
        indexArr.push(idx);
      }

      indexArr.push(index);

      assignable.indices = new CsvAsn(indexArr, this.fieldId);

      return assignable;
    } else {
      return new VarAsn(
        ctx.getText(),
        false,
        EmptyAsn.Instance,
        new CsvAsn([], this.fieldId),
        this.fieldId,
        this.scope,
      );
    }
  };

  visitConstantValue = (ctx: ConstantValueContext) => {
    return this.visitChildren(ctx)!;
  };

  visitIdentifierList = (ctx: IdentifierListContext) => {
    const ids = ctx.identifierDef().map((id) => this.visit(id)!);
    const enumValues = new EnumValuesAsn(this.fieldId, this.scope);

    enumValues.values = new CsvAsn(ids, this.fieldId);

    return enumValues;
  };
}

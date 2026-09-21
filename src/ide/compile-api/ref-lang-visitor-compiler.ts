import { TerminalNode } from "antlr4ng";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getTypeName, getTypeNameById } from "../../compiler/syntax-nodes/ast-helpers";
import { CsvAsn } from "../../compiler/syntax-nodes/csv-asn";
import { ParamListAsn } from "../../compiler/syntax-nodes/fields/param-list-asn";
import { IdDefAsn } from "../../compiler/syntax-nodes/id-def-asn";
import { ParamDefAsn } from "../../compiler/syntax-nodes/param-def-asn";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import {
  IdentifierContext,
  ParamDefContext,
  ParamsListContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { Language } from "../frames/frame-interfaces/language";
import { getParamDefs, getTypes, visitTypeHelper } from "./parser-helpers";

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
}

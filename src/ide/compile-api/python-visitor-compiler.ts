import { TerminalNode } from "antlr4ng";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getTypeName, getTypeNameById } from "../../compiler/syntax-nodes/ast-helpers";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import {
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
import { Language } from "../frames/frame-interfaces/language";
import { getTypes, visitType } from "./parser-helpers";

export class PythonVisitorCompiler extends PythonVisitor<AstNode> {
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

  visitType = (context: TypeContext) => visitType<AstNode>(this, context);

  visitTerminal(ctx: TerminalNode) {
    return getTypeNameById(this.language, ctx.symbol.type, ctx.getText(), this.fieldId, this.scope);
  }
}

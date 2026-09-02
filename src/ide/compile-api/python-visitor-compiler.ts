import { TerminalNode } from "antlr4ng";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getTypeName } from "../../compiler/syntax-nodes/ast-helpers";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import {
  TypeContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
import { Language } from "../frames/frame-interfaces/language";

export class PythonVisitorCompiler extends PythonVisitor<AstNode> {
  constructor(
    private readonly language: Language,
    private readonly scope: Scope,
    private readonly fieldId: string,
  ) {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => {
    const typeName = getTypeName(this.language, "Tuple", this.fieldId, this.scope);
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((t) => t instanceof TypeAsn);
    return new TypeAsn(typeName, types, this.fieldId, this.scope);
  };

  visitTypeName = (ctx: TypeNameContext) => {
    const typeName = this.visitChildren(ctx)!;
    return typeName;
  };

  visitTypeGeneric = (ctx: TypeGenericContext) => {
    const typeName = this.visit(ctx.typeName())!;
    const types = ctx
      .type_()
      .map((t) => this.visit(t))
      .filter((t) => t instanceof TypeAsn);
    return new TypeAsn(typeName, types, this.fieldId, this.scope);
  };

  override visitType = (context: TypeContext) => {
    const typeTuple = context.typeTuple();
    const typeName = context.typeName();
    const typeGeneric = context.typeGeneric();

    if (typeTuple) {
      return this.visit(typeTuple)!;
    }

    if (typeName) {
      const tn = this.visit(typeName)!;
      return new TypeAsn(tn, [], this.fieldId, this.scope);
    }

    if (typeGeneric) {
      return this.visit(typeGeneric)!;
    }

    throw new Error(context.getText());
  };

  visitTerminal(ctx: TerminalNode) {
    return getTypeName(this.language, ctx.getText(), this.fieldId, this.scope);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getTypeName } from "../../compiler/syntax-nodes/ast-helpers";
import { IdAsn } from "../../compiler/syntax-nodes/id-asn";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
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

  visitTypeTuple = (ctx: any) => {
    const types = ((this as any).visitChildren(ctx) as (IdAsn | TypeAsn)[]).filter(
      (n) => n instanceof TypeAsn,
    );
    const typeName = getTypeName(this.language, "Tuple", this.fieldId, this.scope);
    return new TypeAsn(typeName, types, this.fieldId, this.scope);
  };

  visitTypeName = (ctx: any) => {
    const typeName = (this as any).visitChildren(ctx)[0] as AstNode;

    //return new TypeAsn(typeName, [], this.fieldId, this.scope);
    return typeName;
  };

  visitTypeGeneric = (ctx: any) => {
    const typeName = (this as any).visit(ctx.typeName()) as AstNode;
    const types = (this as any).visit(ctx.type()) as AstNode[];

    return new TypeAsn(typeName, types, this.fieldId, this.scope);
  };

  override visitType = (context: any) => {
    const typeTuple = context.typeTuple();
    const typeName = context.typeName();
    const typeGeneric = context.typeGeneric();

    if (typeTuple) {
      return (this as any).visit(typeTuple);
    }

    if (typeName) {
      const tn = (this as any).visit(typeName);
      return new TypeAsn(tn, [], this.fieldId, this.scope);
    }

    if (typeGeneric) {
      return (this as any).visit(typeGeneric);
    }

    throw new Error(context.children.First().GetText());
  };

  visitTerminal(ctx: any) {
    return getTypeName(this.language, ctx.getText(), this.fieldId, this.scope);
  }
}

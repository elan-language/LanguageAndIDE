/* eslint-disable @typescript-eslint/no-explicit-any */
import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node.js";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node.js";
import { Scope } from "../../compiler/compiler-interfaces/scope.js";
import { IdAsn } from "../../compiler/syntax-nodes/id-asn.js";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn.js";
import { ElanElanVisitor } from "./antlr4-parser.js";

export class ElanElanVisitorCompiler extends ElanElanVisitor {
  constructor(
    private readonly scope: Scope,
    private readonly fieldId: string,
  ) {
    super();
  }

  visitTypeTuple(ctx: any) {
    const types = ((this as any).visitChildren(ctx) as (IdAsn | TypeAsn)[]).filter(
      (n) => n instanceof TypeAsn,
    );
    const typeName = "Tuple";
    return new TypeAsn(typeName, types, this.fieldId, this.scope);
  }

  visitTypeName(ctx: any) {
    const typeName = (this as any).visitChildren(ctx)[0] as AstIdNode;
    return new TypeAsn(typeName.id, [], this.fieldId, this.scope);
  }

  visitTypeGeneric(ctx: any) {
    const typeName = (this as any).visit(ctx.typeName()) as AstIdNode;
    const types = (this as any).visit(ctx.type()) as AstNode[];

    return new TypeAsn(typeName.id, types, this.fieldId, this.scope);
  }

  override visitType(context: any) {
    const typeTuple = context.typeTuple();
    const typeName = context.typeName();
    const typeGeneric = context.typeGeneric();

    if (typeTuple) {
      return (this as any).visit(typeTuple);
    }

    if (typeName) {
      return (this as any).visit(typeName);
    }

    if (typeGeneric) {
      return (this as any).visit(typeGeneric);
    }

    throw new Error(context.children.First().GetText());
  }

  visitTerminal(ctx: any) {
    return new IdAsn(ctx.symbol.text, "", undefined as unknown as Scope);
  }
}

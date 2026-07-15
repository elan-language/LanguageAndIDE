/* eslint-disable @typescript-eslint/no-explicit-any */
import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node.js";
import { Scope } from "../../compiler/compiler-interfaces/scope.js";
import { IdAsn } from "../../compiler/syntax-nodes/id-asn.js";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn.js";
import { ElanElanVisitor } from "./antlr4-parser.js";

export class ElanElanVisitorImpl extends ElanElanVisitor {
  constructor(
    private readonly scope: Scope,
    private readonly fieldId: string,
  ) {
    super();
  }

  visitExpression(ctx: any) {
    return (this as any).visitChildren(ctx);
  }

  visitGenericSpecifier(ctx: any) {
    return ((this as any).visitChildren(ctx) as (IdAsn | TypeAsn)[]).filter(
      (n) => n instanceof TypeAsn,
    );
  }

  override visitType(context: any) {
    if (context.VALUE_TYPE()) {
      const typeName = (this as any).visit(context.VALUE_TYPE()) as AstIdNode;
      return new TypeAsn(typeName.id, [], this.fieldId, this.scope);
    }

    if (context.TYPENAME()) {
      const gs = context.genericSpecifier();
      const gp = gs ? (this as any).visit(gs) : [];
      const typeName = (this as any).visit(context.TYPENAME()) as AstIdNode;
      return new TypeAsn(typeName.id, gp, this.fieldId, this.scope);
    }

    if (context.funcType()) {
      return (this as any).visit(context.funcType());
    }

    if (context.tupleType()) {
      return (this as any).visit(context.tupleType());
    }

    throw new Error(context.children.First().GetText());
  }

  visitTerminal(ctx: any) {
    return new IdAsn(ctx.symbol.text, "", undefined as unknown as Scope);
  }
}

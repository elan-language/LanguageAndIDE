import { TerminalNode } from "antlr4ng";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getTypeName } from "../../compiler/syntax-nodes/ast-helpers";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import {
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { Language } from "../frames/frame-interfaces/language";
import { visitType } from "./parser-helpers";

export class RefLangVisitorCompiler extends RefLangVisitor<AstNode> {
  constructor(
    private readonly language: Language,
    private readonly scope: Scope,
    private readonly fieldId: string,
  ) {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => {
    const typeName = getTypeName(this.language, "Tuple", this.fieldId, this.scope);
    const types = ctx.type_().map((t) => this.visit(t)!);
    return new TypeAsn(typeName, types, this.fieldId, this.scope);
  };

  visitTypeName = (ctx: TypeNameContext) => {
    const typeName = this.visitChildren(ctx)!;
    return typeName;
  };

  visitTypeGeneric = (ctx: TypeGenericContext) => {
    const typeName = this.visit(ctx.typeName())!;
    const types = ctx.type_().map((t) => this.visit(t)!);
    return new TypeAsn(typeName, types, this.fieldId, this.scope);
  };

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const typeName = getTypeName(this.language, "Func", this.fieldId, this.scope);
    const types = ctx.type_().map((t) => this.visit(t)!);
    return new TypeAsn(typeName, types, this.fieldId, this.scope);
  };

  override visitType = (context: TypeContext) => {
    return visitType<AstNode>(this, context);
  };

  visitTerminal(ctx: TerminalNode) {
    return getTypeName(this.language, ctx.getText(), this.fieldId, this.scope);
  }
}

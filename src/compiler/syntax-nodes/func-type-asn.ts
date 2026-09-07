import { Language } from "../../ide/frames/frame-interfaces/language";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";

export class FuncTypeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly language: Language,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return this.symbolType().languageSpecificName(this.language);
  }

  symbolType() {
    const scope = getGlobalScope(this.scope);
    return scope.resolveSymbol("Func", true, this.scope).symbolType();
  }

  toString() {
    return `${this.symbolType()}`;
  }
}

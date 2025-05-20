import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { ProcedureType } from "../../symbols/procedure-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { transforms } from "../ast-helpers";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export abstract class ProcedureAsn extends FrameWithStatementsAsn implements ElanSymbol, Scope {
  constructor(
    protected readonly name: AstNode,
    protected readonly params: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  isProcedure = true;

  get symbolId() {
    return getId(this.name);
  }

  abstract get symbolScope(): SymbolScope;

  symbolType(transforms?: Transforms) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pn, pt] = (this.params as any).symbolNamesAndTypes(transforms);
    return new ProcedureType(pn, pt, false, true);
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (getId(this.name) === id) {
      return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = (this.params as any).resolveSymbol(id, transforms, initialScope);

    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
  }

  public compile(): string {
    const name = this.name.compile();
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${name}(${this.params.compile()}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r`;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localMatches = (this.params as any).symbolMatches(id, all, initialScope);
    return localMatches.concat(matches);
  }
}

import { Class } from "../../../compiler/compiler-interfaces/class";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { getClassScope, getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { ProcedureAsn } from "../globals/procedure-asn";

export class ProcedureMethodAsn extends ProcedureAsn {
  isMember: boolean = true;

  isAbstract = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  private: boolean = false;

  getClass(): Class {
    return this.getParentScope() as Class;
  }

  public override indent(): string {
    return this.singleIndent();
  }

  public override compile(): string {
    this.compileErrors = [];

    const name = this.name.compile();
    mustBeUniqueNameInScope(name, getClassScope(this), this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}async ${super.compile()}\r
${this.indent()}}\r
`;
  }

  resolveSymbol(id: string, initialScope: Scope): ElanSymbol {
    if (getId(this.name) === id) {
      return this;
    }

    return super.resolveSymbol(id, initialScope);
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolScope = SymbolScope.member;
}

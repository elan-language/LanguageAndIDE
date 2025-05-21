import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { singleIndent } from "../../frame-helpers";
import { ConcreteClass } from "../../globals/concrete-class";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { getClassScope, getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { transforms } from "../ast-helpers";
import { ProcedureAsn } from "../globals/procedure-asn";

export class ProcedureMethodAsn extends ProcedureAsn {
  isMember: boolean = true;

  isAbstract = false;
  hrefForFrameHelp: string = "LangRef.html#procedure_method";

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  getClass(): ConcreteClass {
    return this.getParentScope() as ConcreteClass;
  }

  public override indent(): string {
    return singleIndent();
  }

  public override compile(): string {
    this.compileErrors = [];

    const name = this.name.compile();
    mustBeUniqueNameInScope(
      name,
      getClassScope(this),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}async ${super.compile()}\r
${this.indent()}}\r
`;
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (getId(this.name) === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolScope = SymbolScope.member;
}

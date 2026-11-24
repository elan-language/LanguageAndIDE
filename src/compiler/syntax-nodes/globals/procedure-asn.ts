import { Scope } from "../../compiler-interfaces/scope";
import { SymbolScope } from "../../symbols/symbol-scope";
import { AbstractProcedureAsn } from "./abstract-procedure-asn";

export class ProcedureAsn extends AbstractProcedureAsn {
  isGlobal = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  indent(): string {
    return "";
  }

  public compile(): string {
    this.compileErrors = [];
    const name = this.methodName.compile();
    return `async function ${super.compile()}\r
}
global["${name}"] = ${name};
`;
  }

  symbolScope = SymbolScope.program;
}

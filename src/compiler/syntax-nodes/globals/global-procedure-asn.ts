import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { ProcedureAsn } from "./procedure-asn";

export class GlobalProcedureAsn extends ProcedureAsn {
  isGlobal = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  indent(): string {
    return "";
  }

  public compile(): string {
    this.compileErrors = [];
    const name = this.name.compile();
    return `async function ${super.compile()}\r
}
global["${name}"] = ${name};
`;
  }

  symbolScope = SymbolScope.program;
}

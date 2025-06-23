import { Scope } from "../../frame-interfaces/scope";
import { SymbolScope } from "../../symbols/symbol-scope";
import { ProcedureAsn } from "./procedure-asn";

export class GlobalProcedureAsn extends ProcedureAsn {
  isGlobal = true;
  hrefForFrameHelp: string = "LangRef.html#procedure";

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

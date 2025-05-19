import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { SymbolScope } from "../../symbols/symbol-scope";
import { ProcedureAsn } from "./procedure-asn";

export class GlobalProcedureAsn extends ProcedureAsn {
  isGlobal = true;
  hrefForFrameHelp: string = "LangRef.html#procedure";

  constructor(
    protected readonly name: AstNode,
    protected readonly params: AstNode,
    protected readonly children: AstNode[],
    fieldId: string,
    scope: Scope,
  ) {
    super(name, params, children, fieldId, scope);
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

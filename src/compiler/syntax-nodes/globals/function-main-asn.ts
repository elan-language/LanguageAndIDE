import { Scope } from "../../compiler-interfaces/scope";
import { allScopedSymbols } from "../../symbols/symbol-helpers";
import { FunctionAsn } from "./function-asn";

export class FunctionMainAsn extends FunctionAsn {
  constructor(
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  indent() {
    return "";
  }

  get symbolId() {
    return "__main";
  }

  debugSymbols() {
    return () => allScopedSymbols(this.getParentScope(), this);
  }

  compile(): string {
    this.compileErrors = [];

    return `async function main() {
  const s = new FSystem();
  const it = _fmain(s);
  for (const ss of it) {
    await ss.evaluate();
  }
}

function* _fmain(s: FSystem) {
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r
}
`;
  }
}

import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { RegExpType } from "../../compiler/symbols/regexp-type";
import { Scope } from "../compiler-interfaces/scope";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { mustBeValidRegExp } from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";

// "new RegExp(r)" throws a SyntaxError at run time
// if the string "r" is ill-formed, eg contains an unclosed square or round bracket,
// or ends in a backslash or contains "(?" followed by an invalid option.
// The error message varies depending on what is wrong.
// We allow that at parse time, by catching and noting the error,
// as the user is typically still typing her regexp,
// and we translate it into a compile error at compile time.

export class LiteralRegExAsn extends AbstractAstNode implements AstNode {
  constructor(
    rawValue: string,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
    const trimmed = rawValue.trim();
    const r = trimmed.substring(1, trimmed.length - 1); //Remove delimiting slashes as RegExp will add them back automatically
    try {
      this.value = new RegExp(r);
      this.valueValid = true;
      this.valueMessage = "OK"; // to keep TypeScript happy
    } catch (e) {
      this.value = /invalid/;
      this.valueValid = false;
      this.valueMessage = (e as Error).message;
    }
  }

  value: RegExp;
  private valueValid: boolean;
  private valueMessage: string;

  compile(): string {
    this.compileErrors = [];
    if (!this.valueValid) {
      mustBeValidRegExp(this.valueMessage, this.compileErrors, this.fieldId);
    }
    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return `${this.value}`;
  }

  symbolType() {
    return RegExpType.Instance;
  }

  toString() {
    return `${this.value}`;
  }
}

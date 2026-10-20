import { getId, mustBeUniqueValueInScope, mustNotBeKeyword } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { EnumValueType } from "../../symbols/enum-value-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownType } from "../../symbols/unknown-type";
import { AbstractAstNode } from "../abstract-ast-node";

export class IdentifierListAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly identifierDefs: AstNode[],
    readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  get names() {
    return this.identifierDefs.map((i) => getId(i));
  }

  getSymbols(typeName: string) {
    return this.names.map((n) => ({
      symbolId: n,
      symbolType: () => new EnumValueType(typeName, n),
      symbolScope: SymbolScope.program,
      symbolIsType: false,
    }));
  }

  compile(): string {
    this.compileErrors = [];

    if (this.identifierDefs.length > 0) {
      const ids = this.identifierDefs.map((i) => i.compile());

      for (const id of ids) {
        mustNotBeKeyword(id, this.compileErrors, this.fieldId);

        if (ids.indexOf(id) !== ids.lastIndexOf(id)) {
          mustBeUniqueValueInScope(id, this.compileErrors, this.fieldId);
        }
      }

      const def = `_default : "${ids[0]}", `;

      const itStr = ids.map((n) => `${n} : "${n}"`).join(", ");

      getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

      return `${def}${itStr}`;
    }

    return `_default : ""`;
  }

  symbolType() {
    return UnknownType.Instance;
  }
}

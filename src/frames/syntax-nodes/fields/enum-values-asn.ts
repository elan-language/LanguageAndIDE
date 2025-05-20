import { CompileError } from "../../compile-error";
import { mustBeUniqueValueInScope, mustNotBeKeyword } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { UnknownType } from "../../symbols/unknown-type";
import { AbstractAstNode } from "../abstract-ast-node";
import { isAstCollectionNode } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";

export class EnumValuesAsn extends AbstractAstNode implements AstNode {
  constructor(
    readonly fieldId: string,
    _scope: Scope,
  ) {
    super();
  }

  values: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    const ast = this.values;

    if (isAstCollectionNode(ast)) {
      const items = ast.items;
      if (items.length > 0) {
        const ids = items.map((i) => i.compile());

        for (const id of ids) {
          mustNotBeKeyword(id, this.compileErrors, this.fieldId);

          if (ids.indexOf(id) !== ids.lastIndexOf(id)) {
            mustBeUniqueValueInScope(id, this.compileErrors, this.fieldId);
          }
        }

        const def = `_default : "${ids[0]}", `;

        const itStr = ids.map((n) => `${n} : "${n}"`).join(", ");

        return `${def}${itStr}`;
      }

      return `_default : ""`;
    }

    return "";
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  symbolType() {
    return UnknownType.Instance;
  }
}

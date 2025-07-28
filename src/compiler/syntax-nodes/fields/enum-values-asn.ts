import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { UnknownType } from "../../../compiler/symbols/unknown-type";
import { getId, mustBeUniqueValueInScope, mustNotBeKeyword } from "../../compile-rules";
import { AbstractAstNode } from "../abstract-ast-node";
import { isAstCollectionNode } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";

export class EnumValuesAsn extends AbstractAstNode implements AstNode {
  constructor(
    readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  values: AstNode = EmptyAsn.Instance;

  get names() {
    if (isAstCollectionNode(this.values)) {
      const items = this.values.items;
      return items.map((i) => getId(i));
    }
    return [];
  }

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

        getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

        return `${def}${itStr}`;
      }

      return `_default : ""`;
    }

    return "";
  }

  symbolType() {
    return UnknownType.Instance;
  }
}

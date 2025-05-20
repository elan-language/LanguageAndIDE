import { mustBeUniqueValueInScope, mustNotBeKeyword } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { AbstractAstNode } from "../abstract-ast-node";
import { isAstCollectionNode } from "../ast-helpers";

export class EnumValues extends AbstractAstNode {
  constructor(
    private readonly values: AstNode,
    private readonly fieldId: string,
    _scope: Scope,
  ) {
    super();
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

        return `${def}${itStr}`;
      }

      return `_default : ""`;
    }

    return "";
  }
}

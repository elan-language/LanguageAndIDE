import { mustBeAssignableType, mustBeClass, mustBePropertyAndPublic } from "../compile-rules";
import { AstCollectionNode } from "../compiler-interfaces/ast-collection-node";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { isClass } from "../frame-helpers";
import { ClassType } from "../symbols/class-type";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { ToAsn } from "./to-asn";

export class CopyWithAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly obj: AstNode,
    private readonly withClause: AstCollectionNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    const from = this.obj.compile();
    const tempTo = `_a`; // only scoped to lambda so safe
    const withClause: string[] = [];
    const fromType = this.obj.symbolType();
    let withClauseStr = "";

    if (fromType instanceof ClassType) {
      const classSymbol = this.scope.getParentScope().resolveSymbol(fromType.className, this.scope);

      mustBeClass(classSymbol, this.compileErrors, this.fieldId);

      if (isClass(classSymbol)) {
        for (const ast of this.withClause.items as ToAsn[]) {
          const propertyId = ast.id;
          const type = ast.symbolType();

          const pSymbol = classSymbol.resolveSymbol(propertyId, this.scope);
          mustBePropertyAndPublic(pSymbol, this.compileErrors, this.fieldId);
          mustBeAssignableType(pSymbol.symbolType(), type, this.compileErrors, this.fieldId);

          withClause.push(`${tempTo}.${ast.compile()}`);
        }
      }
    }

    if (withClause.length > 0) {
      withClauseStr = ` ${withClause.join("; ")};`;
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `await (async () => {const ${tempTo} = {...${from}}; Object.setPrototypeOf(${tempTo}, Object.getPrototypeOf(${from}));${withClauseStr} return ${tempTo};})()`;
  }

  symbolType() {
    return this.obj.symbolType();
  }

  toString() {
    return `${this.obj} copy with ${this.withClause}`;
  }
}

import { AstCollectionNode } from "../../compiler/compiler-interfaces/ast-collection-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { ClassType } from "../../compiler/symbols/class-type";
import { getGlobalScope, isClass } from "../../compiler/symbols/symbol-helpers";
import { mustBeAssignableType, mustBeClass, mustBePropertyAndPublic } from "../compile-rules";
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
      const classSymbol = this.scope
        .getParentScope()
        .resolveSymbol(fromType.className, true, this.scope);

      mustBeClass(classSymbol, this.compileErrors, this.fieldId);

      if (isClass(classSymbol)) {
        for (const ast of this.withClause.items as ToAsn[]) {
          const propertyId = ast.id;
          const type = ast.symbolType();

          const pSymbol = classSymbol.resolveSymbol(propertyId, true, this.scope);
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

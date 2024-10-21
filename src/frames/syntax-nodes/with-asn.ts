import { CompileError } from "../compile-error";
import {
  mustBeClass,
  mustBeClassType,
  mustBeCompatibleType,
  mustBePropertyAndPublic,
  mustBeRecord,
} from "../compile-rules";
import { isClass } from "../helpers";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { ClassType } from "../symbols/class-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { ExprAsn } from "./expr-asn";
import { SetAsn } from "./set-asn";

export class WithAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly obj: ExprAsn,
    private readonly withClause: AstCollectionNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.obj.aggregateCompileErrors());
  }

  compile(): string {
    const from = this.obj.compile();
    const tempTo = `_a`; // only scoped to lambda so safe
    const withClause: string[] = [];
    const fromType = this.obj.symbolType();
    let withClauseStr = "";

    mustBeClassType(fromType, this.compileErrors, this.fieldId);

    if (fromType instanceof ClassType) {
      const classSymbol = this.scope
        .getParentScope()
        .resolveSymbol(fromType.className, transforms(), this.scope);

      mustBeClass(classSymbol, this.compileErrors, this.fieldId);
      mustBeRecord(classSymbol.symbolType(), this.compileErrors, this.fieldId);

      if (isClass(classSymbol)) {
        for (const ast of this.withClause.items as SetAsn[]) {
          const propertyId = ast.id;
          const type = ast.symbolType();

          const pSymbol = classSymbol.resolveSymbol(propertyId, transforms(), this.scope);
          mustBePropertyAndPublic(pSymbol, this.compileErrors, this.fieldId);
          mustBeCompatibleType(
            pSymbol.symbolType(transforms()),
            type,
            this.compileErrors,
            this.fieldId,
          );

          withClause.push(`${tempTo}.${ast.compile()}`);
        }
      }
    }

    if (withClause.length > 0) {
      withClauseStr = ` ${withClause.join("; ")};`;
    }

    return `(() => {const ${tempTo} = {...${from}}; Object.setPrototypeOf(${tempTo}, Object.getPrototypeOf(${from}));${withClauseStr} return ${tempTo};})()`;
  }

  symbolType() {
    return this.obj.symbolType();
  }

  toString() {
    return `${this.obj} copy with ${this.withClause}`;
  }
}

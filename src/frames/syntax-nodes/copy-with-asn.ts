import { CompileError } from "../compile-error";
import {
  mustBeAssignableType,
  mustBeClass,
  mustBePropertyAndPublic,
  mustBeRecord,
  mustBeRecordType,
} from "../compile-rules";
import { isClass } from "../frame-helpers";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { ClassType } from "../symbols/class-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
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

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors
      .concat(this.obj.aggregateCompileErrors())
      .concat(this.withClause.aggregateCompileErrors());
  }

  compile(): string {
    const from = this.obj.compile();
    const tempTo = `_a`; // only scoped to lambda so safe
    const withClause: string[] = [];
    const fromType = this.obj.symbolType();
    let withClauseStr = "";

    mustBeRecordType(fromType, this.compileErrors, this.fieldId);

    if (fromType instanceof ClassType) {
      const classSymbol = this.scope
        .getParentScope()
        .resolveSymbol(fromType.className, transforms(), this.scope);

      mustBeClass(classSymbol, this.compileErrors, this.fieldId);
      mustBeRecord(classSymbol.symbolType(), this.compileErrors, this.fieldId);

      if (isClass(classSymbol)) {
        for (const ast of this.withClause.items as ToAsn[]) {
          const propertyId = ast.id;
          const type = ast.symbolType();

          const pSymbol = classSymbol.resolveSymbol(propertyId, transforms(), this.scope);
          mustBePropertyAndPublic(pSymbol, this.compileErrors, this.fieldId);
          mustBeAssignableType(
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

    return `await (async () => {const ${tempTo} = {...${from}}; Object.setPrototypeOf(${tempTo}, Object.getPrototypeOf(${from}));${withClauseStr} return ${tempTo};})()`;
  }

  symbolType() {
    return this.obj.symbolType();
  }

  toString() {
    return `${this.obj} copy with ${this.withClause}`;
  }
}

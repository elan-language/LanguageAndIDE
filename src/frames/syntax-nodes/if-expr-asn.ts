import { mustBeBooleanCondition, mustBeCompatibleType } from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../frame-interfaces/scope";
import { ClassType } from "../symbols/class-type";
import { getGlobalScope, mostPreciseSymbol } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";

export class IfExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly condition: AstNode,
    private readonly expr1: AstNode,
    private readonly expr2: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];
    const conditionCode = this.condition.compile();
    const expr1Code = this.expr1.compile();
    const expr2Code = this.expr2.compile();

    mustBeBooleanCondition(this.condition, this.compileErrors, this.fieldId);

    mustBeCompatibleType(
      this.expr1.symbolType(),
      this.expr2.symbolType(),
      this.compileErrors,
      this.fieldId,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${conditionCode} ? ${expr1Code} : ${expr2Code}`;
  }

  symbolType() {
    const e1St = this.expr1.symbolType();
    const e2St = this.expr2.symbolType();

    if (e1St instanceof ClassType && e2St instanceof ClassType) {
      if (e1St.isAssignableFrom(e2St)) {
        return e1St;
      }

      if (e2St.isAssignableFrom(e1St)) {
        return e2St;
      }
    }

    return mostPreciseSymbol(e1St, e2St);
  }

  toString() {
    return `${this.condition} ? ${this.expr1} : ${this.expr2}`;
  }
}

import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { FunctionFrame } from "../globals/function-frame";
import { mustBeImmutableType } from "../compile-rules";
import { ClassType } from "../symbols/class-type";
import { transforms } from "./ast-helpers";

export class ParamDefAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    private readonly type: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.type.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];
    if (this.scope instanceof FunctionFrame) {
      let st = this.symbolType();
      if (st instanceof ClassType) {
        const tt = transforms();
        st = this.scope.resolveSymbol(st.className, tt, this.scope).symbolType(tt);
      }
      mustBeImmutableType(st, this.compileErrors, this.fieldId);
    }
    return `${this.id}`;
  }

  symbolType() {
    return this.type.symbolType();
  }

  toString() {
    return `Param ${this.id} : ${this.type}`;
  }
}

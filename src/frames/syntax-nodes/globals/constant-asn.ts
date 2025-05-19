import { CompileError } from "../../compile-error";
import { mustBeUniqueNameInScope } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { SymbolType } from "../../interfaces/symbol-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { transforms } from "../ast-helpers";
import { FrameAsn } from "../frame-asn";

export class ConstantFrameAsn extends FrameAsn implements AstNode {
  constructor(
    private name: AstNode,
    private value: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  symbolType(): SymbolType {
    return this.value.symbolType();
  }

  compile(): string {
    this.compileErrors = [];
    const name = this.name.compile();
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this.scope),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

    return `${name} = ${this.value.compile()};\r
    `;
  }

  aggregateCompileErrors(): CompileError[] {
    throw new Error("Method not implemented.");
  }
}

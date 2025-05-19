import { CompileError } from "../compile-error";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { singleIndent } from "../frame-helpers";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";

export class EnumFrameAsn extends AbstractAstNode implements AstNode {
  constructor(
    private name: AstNode,
    private values: AstNode,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }
  symbolType(): SymbolType {
    throw new Error("Method not implemented.");
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

    return `const ${name} = {\r
   ${singleIndent()}${this.values.compile()}\r
   };\r
   `;
  }
  aggregateCompileErrors(): CompileError[] {
    throw new Error("Method not implemented.");
  }
}

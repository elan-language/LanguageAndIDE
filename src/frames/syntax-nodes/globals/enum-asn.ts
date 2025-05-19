import { CompileError } from "../../compile-error";
import { mustBeUniqueNameInScope } from "../../compile-rules";
import { singleIndent } from "../../frame-helpers";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { SymbolType } from "../../interfaces/symbol-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { transforms } from "../ast-helpers";
import { FrameAsn } from "../frame-asn";

export class EnumFrameAsn extends FrameAsn {
  constructor(
    private name: AstNode,
    private values: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
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

import { mustBeUniqueNameInScope } from "../../compile-rules";
import { singleIndent } from "../../frame-helpers";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { SymbolType } from "../../interfaces/symbol-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { transforms } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";
import { FrameAsn } from "../frame-asn";

export class EnumAsn extends FrameAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  values: AstNode = EmptyAsn.Instance;

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

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `const ${name} = {\r
${singleIndent()}${this.values.compile()}\r
};\r
`;
  }
}

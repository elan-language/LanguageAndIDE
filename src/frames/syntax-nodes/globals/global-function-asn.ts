import {
  mustBeAssignableType,
  mustBeKnownSymbolType,
  mustBeUniqueNameInScope,
} from "../../compile-rules";
import { Scope } from "../../interfaces/scope";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { transforms } from "../ast-helpers";
import { FunctionAsn } from "./function-asn";

export class GlobalFunctionAsn extends FunctionAsn {
  isGlobal = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  indent(): string {
    return "";
  }

  public compile(): string {
    this.compileErrors = [];
    const name = this.name.compile();
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

    this.returnType.compile();

    const rt = this.symbolType().returnType;

    mustBeKnownSymbolType(rt, this.returnType.compile(), this.compileErrors, this.fieldId);

    const returnStatement = this.getReturnAsn().expr;
    const rst = returnStatement.symbolType();

    mustBeAssignableType(rt, rst, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `async function ${super.compile()}\r
}
global["${name}"] = ${name};
`;
  }
}

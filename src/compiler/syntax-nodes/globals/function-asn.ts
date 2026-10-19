import {
  getId,
  mustBeAssignableType,
  mustBeKnownSymbolType,
  mustBeUniqueNameInScope,
} from "../../compile-rules";
import { Scope } from "../../compiler-interfaces/scope";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { AbstractFunctionAsn } from "./abstract-function-asn";

export class FunctionAsn extends AbstractFunctionAsn {
  isGlobal = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  indent(): string {
    return "";
  }

  public compile(): string {
    this.compileErrors = [];
    const name = this.methodName.compile();
    mustBeUniqueNameInScope(name, getGlobalScope(this), this.compileErrors, this.fieldId);

    this.type.compile();

    const rt = this.symbolType().returnType;

    mustBeKnownSymbolType(rt, getId(this.type), this.compileErrors, this.fieldId);

    const returnStatement = this.getReturnAsn().expr;
    const rst = returnStatement.symbolType();

    mustBeAssignableType(rt, rst, this.compileErrors, this.fieldId, this.scope);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `async function ${super.compile()}\r
}
global["${name}"] = ${name};
`;
  }
}

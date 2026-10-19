import { Class } from "../../../compiler/compiler-interfaces/class";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { getClassScope, getGlobalScope, match } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import {
  getId,
  mustBeAssignableType,
  mustBeKnownSymbolType,
  mustBeUniqueNameInScope,
} from "../../compile-rules";
import { AbstractFunctionAsn } from "../globals/abstract-function-asn";

export class FunctionMethodAsn extends AbstractFunctionAsn {
  isMember: boolean = true;

  isAbstract = false;

  symbolIsType: boolean = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  private: boolean = false;

  getClass(): Class {
    return this.getParentScope() as Class;
  }

  public override indent(): string {
    return this.singleIndent();
  }

  public override compile(): string {
    this.compileErrors = [];

    const name = this.methodName.compile();
    mustBeUniqueNameInScope(name, getClassScope(this), this.compileErrors, this.fieldId);

    this.type.compile();

    const rt = this.symbolType().returnType;

    mustBeKnownSymbolType(rt, getId(this.type), this.compileErrors, this.fieldId);

    const returnStatement = this.getReturnAsn().expr;
    const rst = returnStatement.symbolType();

    mustBeAssignableType(rt, rst, this.compileErrors, returnStatement!.fieldId, this.scope);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}async ${super.compile()}\r
${this.indent()}}\r
`;
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    if (match(getId(this.methodName), id, caseSensitive)) {
      return this;
    }

    return super.resolveSymbol(id, caseSensitive, initialScope);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

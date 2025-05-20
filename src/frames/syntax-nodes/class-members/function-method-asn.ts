import {
  getId,
  mustBeAssignableType,
  mustBeKnownSymbolType,
  mustBeUniqueNameInScope,
} from "../../compile-rules";
import { singleIndent } from "../../frame-helpers";
import { ConcreteClass } from "../../globals/concrete-class";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { getClassScope, getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { transforms } from "../ast-helpers";
import { FunctionAsn } from "../globals/function-asn";

export class FunctionMethodAsn extends FunctionAsn {
  isMember: boolean = true;

  isAbstract = false;
  hrefForFrameHelp: string = "LangRef.html#function_method";

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
  }

  public override indent(): string {
    return singleIndent();
  }

  public override compile(): string {
    this.compileErrors = [];

    const name = this.name.compile();
    mustBeUniqueNameInScope(
      name,
      getClassScope(this),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

    this.returnType.compile();

    const rt = this.symbolType().returnType;

    mustBeKnownSymbolType(rt, this.returnType.compile(), this.compileErrors, this.fieldId);

    const returnStatement = this.getReturnAsn().expr;
    const rst = returnStatement.symbolType();

    mustBeAssignableType(rt, rst, this.compileErrors, returnStatement!.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}async ${super.compile()}\r
${this.indent()}}\r
`;
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (getId(this.name) === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

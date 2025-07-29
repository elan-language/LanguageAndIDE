import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Class } from "../../../compiler/compiler-interfaces/class";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Member } from "../../../compiler/compiler-interfaces/member";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { ClassType } from "../../../compiler/symbols/class-type";
import { getClassScope, getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class AbstractPropertyAsn extends CompoundAsn implements Member, ElanSymbol {
  isAbstract = true;
  isMember = true;

  public private: boolean = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  type: AstNode = EmptyAsn.Instance;

  getClass(): Class {
    return this.getParentScope() as Class;
  }

  compile(): string {
    this.compileErrors = [];
    const pName = this.name.compile();

    mustBeUniqueNameInScope(pName, getClassScope(this), this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}get ${pName}() {\r
${this.indent()}${this.indent()}return ${this.type.compile()};\r
${this.indent()}}\r
${this.indent()}set ${pName}(${pName}) {\r
${this.indent()}}\r\n`;
  }

  public initCode() {
    const tst = this.symbolType();
    if (!(tst instanceof ClassType)) {
      return `["${getId(this.name)}", ${tst.initialValue}]`;
    }
    return "";
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolType() {
    return this.type.symbolType();
  }

  get symbolScope(): SymbolScope {
    return SymbolScope.member;
  }
}

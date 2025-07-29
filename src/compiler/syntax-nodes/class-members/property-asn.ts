import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Class } from "../../../compiler/compiler-interfaces/class";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { ClassType } from "../../../compiler/symbols/class-type";
import { getClassScope, getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { getId, mustBeKnownSymbolType, mustBeUniqueNameInScope } from "../../compile-rules";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class PropertyAsn extends CompoundAsn implements ElanSymbol {
  isMember = true;
  isProperty = true;
  isAbstract = false;

  public private: boolean = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  type: AstNode = EmptyAsn.Instance;

  getClass(): Class {
    return this.getParentScope() as Class;
  }

  isGlobalClass(st: SymbolType) {
    // todo rework when tests working
    return st instanceof ClassType && !st.typeOptions.isIndexable;
  }

  compile(): string {
    this.compileErrors = [];
    const pName = this.name.compile();
    const st = this.type.symbolType();

    mustBeUniqueNameInScope(pName, getClassScope(this), this.compileErrors, this.fieldId);

    mustBeKnownSymbolType(st, getId(this.type), this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    if (this.isGlobalClass(st)) {
      return `${this.indent()}_${pName};\r
${this.indent()}get ${pName}() {\r
${this.indent()}${this.indent()}return this._${pName} ??= ${this.type.compile()};\r
${this.indent()}}\r
${this.indent()}set ${pName}(${pName}) {\r
${this.indent()}${this.indent()}this._${pName} = ${pName};\r
${this.indent()}}\r\n`;
    }

    return `${this.indent()}${pName} = ${this.type.compile()};\r\n`;
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

  public initCode() {
    const tst = this.symbolType();
    if (!this.isGlobalClass(tst)) {
      return `["${getId(this.name)}", ${tst.initialValue}]`;
    }
    return "";
  }
}

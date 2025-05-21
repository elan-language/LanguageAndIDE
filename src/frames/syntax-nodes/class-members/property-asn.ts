import { getId, mustBeKnownSymbolType, mustBeUniqueNameInScope } from "../../compile-rules";
import { ConcreteClass } from "../../globals/concrete-class";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { SymbolType } from "../../interfaces/symbol-type";
import { ClassType } from "../../symbols/class-type";
import { getClassScope, getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { transforms } from "../ast-helpers";
import { FrameAsn } from "../frame-asn";

export class PropertyAsn extends FrameAsn implements ElanSymbol {
  isMember = true;
  isProperty = true;
  isAbstract = false;

  public private: boolean = false;
  hrefForFrameHelp: string = "LangRef.html#property";

  constructor(
    protected readonly name: AstNode,
    protected readonly type: AstNode,

    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  getClass(): ConcreteClass {
    return this.getParentScope() as ConcreteClass;
  }

  isGlobalClass(st: SymbolType) {
    // todo rework when tests working
    return st instanceof ClassType && !st.typeOptions.isIndexable;
  }

  compile(): string {
    this.compileErrors = [];
    const pName = this.name.compile();
    const st = this.type.symbolType();

    mustBeUniqueNameInScope(
      pName,
      getClassScope(this),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

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

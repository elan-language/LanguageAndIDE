import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Class } from "../../frame-interfaces/class";
import { ElanSymbol } from "../../frame-interfaces/elan-symbol";
import { Member } from "../../frame-interfaces/member";
import { Scope } from "../../frame-interfaces/scope";
import { ClassType } from "../../symbols/class-type";
import { getClassScope, getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { transforms } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";
import { FrameAsn } from "../frame-asn";

export class AbstractPropertyAsn extends FrameAsn implements Member, ElanSymbol {
  isAbstract = true;
  isMember = true;

  public private: boolean = false;
  hrefForFrameHelp: string = "LangRef.html#Abstract_property";

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

    mustBeUniqueNameInScope(
      pName,
      getClassScope(this),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

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

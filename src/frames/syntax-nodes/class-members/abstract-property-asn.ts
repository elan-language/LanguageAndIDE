import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { ConcreteClass } from "../../globals/concrete-class";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Member } from "../../interfaces/member";
import { Scope } from "../../interfaces/scope";
import { ClassType } from "../../symbols/class-type";
import { getClassScope, getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { transforms } from "../ast-helpers";
import { FrameAsn } from "../frame-asn";

export class AbstractPropertyAsn extends FrameAsn implements Member, ElanSymbol {
  isAbstract = true;
  isMember = true;

  public private: boolean = false;
  hrefForFrameHelp: string = "LangRef.html#Abstract_property";

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

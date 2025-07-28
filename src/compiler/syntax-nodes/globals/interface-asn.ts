import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { noTypeOptions } from "../../../compiler/compiler-interfaces/type-options";
import { ClassSubType, ClassType } from "../../../compiler/symbols/class-type";
import { getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { Deprecated } from "../../../elan-type-interfaces";
import { getId, mustBeInterfaceClass, mustBeKnownSymbolType } from "../../compile-rules";
import { compileNodes } from "../ast-helpers";
import { ClassAsn } from "./class-asn";

export class InterfaceAsn extends ClassAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
    this.isAbstract = true;
    this.isInterface = true;
  }

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

  get symbolId() {
    return getId(this.name);
  }
  symbolType() {
    const [cd] = this.lookForCircularDependencies(this, [getId(this.name)]);

    return new ClassType(
      this.symbolId,
      ClassSubType.interface,
      false,
      noTypeOptions,
      this.inheritedSymbols(cd),
      this,
    );
  }

  public compile(): string {
    this.compileErrors = [];

    const name = this.getName();
    const [cd, cdName] = this.lookForCircularDependencies(this, [name]);
    if (cd) {
      return this.circularDependency(cdName);
    }

    const typeAndName = this.getDirectSuperClassesTypeAndName();

    for (const [st, name] of typeAndName) {
      mustBeKnownSymbolType(st, name, this.compileErrors, this.fieldId);
      mustBeInterfaceClass(st, name, this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `class ${name} {\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};\r
${compileNodes(this.children)}\r
}\r\n`;
  }
}

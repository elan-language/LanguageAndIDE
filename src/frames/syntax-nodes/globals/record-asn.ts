import { Deprecated } from "../../../elan-type-interfaces";
import { getId, mustBeImmutableType } from "../../compile-rules";
import { Scope } from "../../frame-interfaces/scope";
import { SymbolType } from "../../frame-interfaces/symbol-type";
import { Transforms } from "../../frame-interfaces/transforms";
import { immutableTypeOptions } from "../../frame-interfaces/type-options";
import { endKeyword, recordKeyword } from "../../keywords";
import { ClassSubType, ClassType } from "../../symbols/class-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { compileNodes, transforms } from "../ast-helpers";
import { ClassAsn } from "./class-asn";

export class RecordAsn extends ClassAsn {
  hrefForFrameHelp: string = "LangRef.html#record";

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
    this.isNotInheritable = true;
    this.isRecord = true;
  }

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

  initialKeywords(): string {
    return recordKeyword;
  }

  get symbolId() {
    return getId(this.name);
  }
  symbolType(_transforms?: Transforms) {
    return new ClassType(
      this.symbolId,
      ClassSubType.concrete,
      false,
      immutableTypeOptions,
      [],
      this,
    );
  }
  get symbolScope() {
    return SymbolScope.program;
  }

  public getDirectSuperClassesTypeAndName(_transforms: Transforms) {
    return [];
  }

  public compile(): string {
    this.compileErrors = [];

    const name = this.getName(transforms());
    const body = compileNodes(this.children);

    for (const p of this.properties()) {
      mustBeImmutableType(getId(p.name), p.symbolType(), this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `class ${name} {\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};\r
  async _initialise() { return this; }\r
${body}\r
}\r\n`;
  }

  topKeywords(): string {
    return `${recordKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${recordKeyword}`;
  }
}

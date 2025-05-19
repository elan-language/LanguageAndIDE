import { Deprecated } from "../../../elan-type-interfaces";
import { getId, mustBeImmutableType } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { SymbolType } from "../../interfaces/symbol-type";
import { Transforms } from "../../interfaces/transforms";
import { immutableTypeOptions } from "../../interfaces/type-options";
import { endKeyword, recordKeyword } from "../../keywords";
import { ClassSubType, ClassType } from "../../symbols/class-type";
import { SymbolScope } from "../../symbols/symbol-scope";
import { compileNodes, transforms } from "../ast-helpers";
import { ClassAsn } from "./class-asn";

export class RecordAsn extends ClassAsn {
  hrefForFrameHelp: string = "LangRef.html#record";

  constructor(
    name: AstNode,
    inheritance: AstNode,
    children: AstNode[],
    fieldId: string,
    scope: Scope,
  ) {
    super(name, inheritance, children, fieldId, scope);
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
      mustBeImmutableType(p.name.text, p.symbolType(), this.compileErrors, this.fieldId);
    }

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

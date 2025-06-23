import { Deprecated } from "../../../elan-type-interfaces";
import { getId, mustBeDeclaredAbove, mustImplementSuperClasses } from "../../compile-rules";
import { Scope } from "../../compiler-interfaces/scope";
import { SymbolType } from "../../compiler-interfaces/symbol-type";
import { isConstructor } from "../../frame-helpers";
import { Transforms } from "../../frame-interfaces/transforms";
import { noTypeOptions } from "../../frame-interfaces/type-options";
import { classKeyword } from "../../keywords";
import { ClassSubType, ClassType } from "../../symbols/class-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { compileNodes, transforms } from "../ast-helpers";
import { ClassAsn } from "./class-asn";

export class ConcreteClassAsn extends ClassAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
    this.isConcrete = true;
  }

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

  initialKeywords(): string {
    return classKeyword;
  }
  get symbolId() {
    return getId(this.name);
  }

  symbolType(transforms?: Transforms) {
    const [cd] = this.lookForCircularDependencies(this, [getId(this.name)], transforms!);

    return new ClassType(
      this.symbolId,
      ClassSubType.concrete,
      false,
      noTypeOptions,
      this.inheritedSymbols(cd),
      this,
    );
  }

  public compile(): string {
    this.compileErrors = [];

    const name = this.getName();
    const [cd, cdName] = this.lookForCircularDependencies(this, [name], transforms());
    if (cd) {
      return this.circularDependency(cdName);
    }

    const extendsClause = this.getExtends();
    const abstractClasses = this.getAllAbstractClasses(this, [], transforms());
    const interfaces = this.getAllInterfaces(this, [], transforms());

    const thisIndex = this.getClassIndex();
    for (const ac of abstractClasses) {
      const acIndex = ac.getClassIndex();

      if (acIndex > thisIndex) {
        mustBeDeclaredAbove(ac.symbolId, this.compileErrors, this.fieldId);
      }
    }

    mustImplementSuperClasses(
      this.symbolType(),
      interfaces.concat(abstractClasses).map((tn) => tn.symbolType()) as ClassType[],
      this.compileErrors,
      this.fieldId,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emptyInitialise = this.getChildren().some((m) => isConstructor(m as any))
      ? ""
      : `  ${this.indent()}async _initialise() { return this; }`;

    return `class ${name} ${extendsClause}{\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};
${emptyInitialise}
${compileNodes(this.children)}\r
}\r\n`;
  }
}

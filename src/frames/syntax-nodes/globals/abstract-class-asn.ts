import { Deprecated } from "../../../elan-type-interfaces";
import { getId, mustBeDeclaredAbove } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { SymbolType } from "../../interfaces/symbol-type";
import { Transforms } from "../../interfaces/transforms";
import { noTypeOptions } from "../../interfaces/type-options";
import { abstractClassKeywords } from "../../keywords";
import { ClassSubType, ClassType } from "../../symbols/class-type";
import { compileNodes, transforms } from "../ast-helpers";
import { ClassAsn } from "./class-asn";

export class AbstractClassAsn extends ClassAsn {
  hrefForFrameHelp: string = "LangRef.html#Abstract_class";

  constructor(
    name: AstNode,
    inheritance: AstNode,
    children: AstNode[],
    fieldId: string,
    scope: Scope,
  ) {
    super(name, inheritance, children, fieldId, scope);
    this.isAbstract = true;
  }

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

  initialKeywords(): string {
    return abstractClassKeywords;
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolType(transforms?: Transforms) {
    const [cd] = this.lookForCircularDependencies(this, [getId(this.name)], transforms!);

    return new ClassType(
      this.symbolId,
      ClassSubType.abstract,
      false,
      noTypeOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cd ? [] : (this.inheritance as any).symbolTypes(transforms),
      this,
    );
  }

  doesInherit(): boolean {
    return this.inheritance.compile() !== "";
  }

  getIdPrefix(): string {
    return "class";
  }

  public compile(): string {
    this.compileErrors = [];

    const name = this.getName(transforms());
    const [cd, cdName] = this.lookForCircularDependencies(this, [name], transforms());
    if (cd) {
      return this.circularDependency(cdName);
    }

    const abstractClasses = this.getAllAbstractClasses(this, [], transforms());

    const thisIndex = this.getClassIndex();
    for (const ac of abstractClasses) {
      const acIndex = ac.getClassIndex();

      if (acIndex > thisIndex) {
        mustBeDeclaredAbove(ac.symbolId, this.compileErrors, this.fieldId);
      }
    }

    const extendsClause = this.getExtends(transforms());

    return `class ${name} ${extendsClause}{\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};\r
${compileNodes(this.children)}\r
}\r\n`;
  }
}

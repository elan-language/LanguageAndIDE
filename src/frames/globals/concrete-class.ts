import { Deprecated } from "../../elan-type-interfaces";
import { Constructor } from "../class-members/constructor";
import { mustBeDeclaredAbove, mustImplementSuperClasses } from "../compile-rules";
import { isConstructor } from "../frame-helpers";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { noTypeOptions } from "../interfaces/type-options";
import { classKeyword, endKeyword } from "../keywords";
import {
  parentHelper_compileChildren,
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { ClassFrame } from "./class-frame";

export class ConcreteClass extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isConcrete = true;
  }

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

  initialKeywords(): string {
    return classKeyword;
  }
  get symbolId() {
    return this.name.text;
  }
  symbolType(transforms?: Transforms) {
    const [cd] = this.lookForCircularDependencies(this, [this.name.text], transforms!);

    return new ClassType(
      this.symbolId,
      ClassSubType.concrete,
      false,
      noTypeOptions,
      cd ? [] : this.inheritance.symbolTypes(transforms),
      this,
    );
  }

  doesInherit(): boolean {
    return this.inheritance.text !== "";
  }

  getFields(): Field[] {
    return [this.name, this.inheritance];
  }

  getIdPrefix(): string {
    return "class";
  }

  public renderAsHtml(): string {
    return `<el-class class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>class </el-kw>${this.helpAsHtml()}${this.name.renderAsHtml()}${this.inheritanceAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${parentHelper_renderChildrenAsHtml(this)}
<el-kw>end class</el-kw>
</el-class>`;
  }

  public renderAsSource(): string {
    return `class ${this.name.renderAsSource()}${this.inheritanceAsSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end class\r\n`;
  }

  public compile(transforms: Transforms): string {
    this.compileErrors = [];

    const name = this.getName(transforms);
    const [cd, cdName] = this.lookForCircularDependencies(this, [name], transforms);
    if (cd) {
      return this.circularDependency(cdName);
    }

    const extendsClause = this.getExtends(transforms);
    const abstractClasses = this.getAllAbstractClasses(this, [], transforms);
    const interfaces = this.getAllInterfaces(this, [], transforms);

    const thisIndex = this.getClassIndex();
    for (const ac of abstractClasses) {
      const acIndex = ac.getClassIndex();

      if (acIndex > thisIndex) {
        mustBeDeclaredAbove(ac.symbolId, this.compileErrors, this.htmlId);
      }
    }

    mustImplementSuperClasses(
      transforms,
      this.symbolType(transforms),
      interfaces.concat(abstractClasses).map((tn) => tn.symbolType(transforms)) as ClassType[],
      this.compileErrors,
      this.htmlId,
    );

    const emptyInitialise = this.getChildren().some((m) => isConstructor(m))
      ? ""
      : `  ${this.indent()}async _initialise() { return this; }`;

    return `class ${name} ${extendsClause}{\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};
${emptyInitialise}
${parentHelper_compileChildren(this, transforms)}\r
}\r\n`;
  }

  public getConstructor(): Constructor {
    return this.getChildren().filter((m) => isConstructor(m))[0] as Constructor;
  }

  topKeywords(): string {
    return `${classKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}

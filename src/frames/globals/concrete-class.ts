import { Constructor } from "../class-members/constructor";
import { mustImplementSuperClasses } from "../compile-rules";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { SymbolType } from "../interfaces/symbol-type";
import { classKeyword, endKeyword } from "../keywords";
import {
  parentHelper_compileChildren,
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { Transforms } from "../syntax-nodes/transforms";
import { ClassFrame } from "./class-frame";

export class ConcreteClass extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isConcrete = true;
  }

  ofTypes: SymbolType[] = [];
  genericParamMatches: Map<string, SymbolType> = new Map<string, SymbolType>();

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
      false,
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
    return `<el-class class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>class </el-kw>${this.name.renderAsHtml()}${this.inheritanceAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
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

    mustImplementSuperClasses(
      transforms,
      this.symbolType(transforms),
      interfaces.concat(abstractClasses).map((tn) => tn.symbolType(transforms)) as ClassType[],
      this.compileErrors,
      this.htmlId,
    );

    return `class ${name} ${extendsClause}{\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};\r
${parentHelper_compileChildren(this, transforms)}\r
}\r\n`;
  }

  public getConstructor(): Constructor {
    return this.getChildren().filter((m) => "isConstructor" in m)[0] as Constructor;
  }

  topKeywords(): string {
    return `${classKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}

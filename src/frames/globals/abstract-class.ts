import { Deprecated } from "../../elan-type-interfaces";
import { mustBeDeclaredAbove } from "../compile-rules";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { noTypeOptions } from "../interfaces/type-options";
import { abstractClassKeywords, classKeyword, endKeyword } from "../keywords";
import {
  parentHelper_compileChildren,
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { ClassFrame } from "./class-frame";

export class AbstractClass extends ClassFrame {
  hrefForFrameHelp: string = "LangRef.html#Abstract_class";

  constructor(parent: File) {
    super(parent);
    this.isAbstract = true;
  }

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

  initialKeywords(): string {
    return abstractClassKeywords;
  }
  get symbolId() {
    return this.name.text;
  }
  symbolType(transforms?: Transforms) {
    const [cd] = this.lookForCircularDependencies(this, [this.name.text], transforms!);

    return new ClassType(
      this.symbolId,
      ClassSubType.abstract,
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
<el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>abstract class </el-kw>${this.helpAsHtml()}${this.name.renderAsHtml()}${this.inheritanceAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${parentHelper_renderChildrenAsHtml(this)}
<el-kw>end class</el-kw>
</el-class>`;
  }

  public renderAsSource(): string {
    return `abstract class ${this.name.renderAsSource()}${this.inheritanceAsSource()}\r
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

    const abstractClasses = this.getAllAbstractClasses(this, [], transforms);

    const thisIndex = this.getClassIndex();
    for (const ac of abstractClasses) {
      const acIndex = ac.getClassIndex();

      if (acIndex > thisIndex) {
        mustBeDeclaredAbove(ac.symbolId, this.compileErrors, this.htmlId);
      }
    }

    const extendsClause = this.getExtends(transforms);

    return `class ${name} ${extendsClause}{\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};\r
${parentHelper_compileChildren(this, transforms)}\r
}\r\n`;
  }

  topKeywords(): string {
    return `${abstractClassKeywords} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}

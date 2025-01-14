import { Constructor } from "../class-members/constructor";
import {
  mustBeInheritableClassOrInterface,
  mustBeKnownSymbolType,
  mustBeSingleAbstractSuperClass,
  mustBeUniqueNameInScope,
} from "../compile-rules";
import { isMember } from "../frame-helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { SymbolType } from "../interfaces/symbol-type";
import {
  abstractClassKeywords,
  classKeyword,
  constructorKeyword,
  endKeyword,
  thisKeyword,
} from "../keywords";
import {
  parentHelper_compileChildren,
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { getGlobalScope, isSymbol, symbolMatches } from "../symbols/symbol-helpers";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { Transforms } from "../syntax-nodes/transforms";
import { ClassFrame } from "./class-frame";

export class AbstractClass extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isAbstract = true;
  }

  ofTypes: SymbolType[] = [];
  genericParamMatches: Map<string, SymbolType> = new Map<string, SymbolType>();

  initialKeywords(): string {
    return abstractClassKeywords;
  }
  get symbolId() {
    return this.name.text;
  }
  symbolType(transforms?: Transforms) {
    return new ClassType(
      this.symbolId,
      ClassSubType.abstract,
      false,
      false,
      this.inheritance.symbolTypes(transforms),
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
<el-top><el-expand>+</el-expand><el-kw>abstract class </el-kw>${this.name.renderAsHtml()}${this.inheritanceAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
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

    const name = this.name.text;
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms,
      this.compileErrors,
      this.htmlId,
    );

    // const abstractClasses = this.getAllAbstractClasses(this, [], transforms);
    // const interfaces = this.getAllInterfaces(this, [], transforms);
    // const names = abstractClasses.concat(interfaces).map((i) => i.symbolId);

    // if (names.includes(name)) {
    //   return this.circularDependency(name);
    // }

    // for (const s of names) {
    //   if (this.seenTwice(s, names)) {
    //     return this.circularDependency(s);
    //   }
    // }

    const [cd, cdName] = this.lookForCircularDependencies(this, [name], transforms);

    if (cd) {
      return this.circularDependency(cdName);
    }

    const typeAndName = this.getSuperClassesTypeAndName(transforms);
    let implement = "";

    for (const [st, name] of typeAndName) {
      mustBeKnownSymbolType(st, name, this.compileErrors, this.htmlId);
      mustBeInheritableClassOrInterface(st, name, this.compileErrors, this.htmlId);

      if (st instanceof ClassType && st.subType === ClassSubType.abstract) {
        implement = `extends ${name} `;
      }
    }

    mustBeSingleAbstractSuperClass(typeAndName, this.compileErrors, this.htmlId);

    return `class ${name} ${implement}{\r
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

  resolveOwnSymbol(id: string, transforms: Transforms): ElanSymbol {
    if (id === thisKeyword) {
      return this;
    }

    if (id === constructorKeyword) {
      return this.getChildren().find((c) => c instanceof Constructor) ?? new UnknownSymbol(id);
    }

    const matches = this.getChildren().filter(
      (f) => isSymbol(f) && f.symbolId === id,
    ) as ElanSymbol[];

    const types = this.getSuperClassesTypeAndName(transforms)
      .map((tn) => tn[0])
      .filter((t) => t instanceof ClassType);

    for (const ct of types) {
      const s = ct.scope!.resolveOwnSymbol(id, transforms);
      if (isMember(s)) {
        matches.push(s);
      }
    }

    if (matches.length === 1) {
      return matches[0];
    }
    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return new UnknownSymbol(id);
  }

  resolveSymbol(id: string, transforms: Transforms, _initialScope: Frame): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id, transforms);

    if (symbol instanceof UnknownSymbol) {
      return this.getParent().resolveSymbol(id, transforms, this);
    }

    return symbol;
  }

  symbolMatches(id: string, all: boolean, _initialScope?: Frame | undefined): ElanSymbol[] {
    const otherMatches = this.getParent().symbolMatches(id, all, this);

    const symbols = this.getChildren().filter(
      (f) => !(f instanceof Constructor) && isSymbol(f),
    ) as ElanSymbol[];

    const matches = symbolMatches(id, all, symbols);

    return matches.concat(otherMatches);
  }
}

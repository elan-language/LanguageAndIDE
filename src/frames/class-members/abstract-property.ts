import { AbstractFrame } from "../abstract-frame";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { ConcreteClass } from "../globals/concrete-class";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { Transforms } from "../interfaces/transforms";
import { abstractKeyword, abstractPropertyKeywords, asKeyword, propertyKeyword } from "../keywords";
import { ClassType } from "../symbols/class-type";
import { getClassScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { transforms } from "../syntax-nodes/ast-helpers";

export class AbstractProperty extends AbstractFrame implements Member, ElanSymbol {
  isAbstract = true;
  isMember = true;
  name: IdentifierField;
  type: TypeField;
  public private: boolean = false;
  hrefForFrameHelp: string = "LangRef.html#Abstract_property";

  constructor(parent: Parent) {
    super(parent);
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
  }

  initialKeywords(): string {
    return abstractPropertyKeywords;
  }

  getFields(): Field[] {
    return [this.name, this.type];
  }

  getIdPrefix(): string {
    return "prop";
  }

  renderAsHtml(): string {
    return `<el-prop class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-kw>${abstractKeyword} ${propertyKeyword} </el-kw>${this.helpAsHtml()}${this.name.renderAsHtml()}<el-kw> ${asKeyword} </el-kw>${this.type.renderAsHtml()}</el-top>${this.compileMsgAsHtml()}${this.getFrNo()}</el-prop>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${abstractKeyword} ${propertyKeyword} ${this.name.renderAsSource()} ${asKeyword} ${this.type.renderAsSource()}\r\n`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const pName = this.name.compile(transforms);

    mustBeUniqueNameInScope(
      pName,
      getClassScope(this),
      transforms,
      this.compileErrors,
      this.htmlId,
    );

    return `${this.indent()}get ${pName}() {\r
${this.indent()}${this.indent()}return ${this.type.compile(transforms)};\r
${this.indent()}}\r
${this.indent()}set ${pName}(${pName}) {\r
${this.indent()}}\r\n`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("abstract property ");
    this.name.parseFrom(source);
    source.remove(" as ");
    this.type.parseFrom(source);
  }

  public initCode() {
    const tst = this.symbolType();
    if (!(tst instanceof ClassType)) {
      return `["${this.name.text}", ${tst.initialValue}]`;
    }
    return "";
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  symbolType() {
    return this.type.symbolType(transforms());
  }

  get symbolScope(): SymbolScope {
    return SymbolScope.member;
  }
}

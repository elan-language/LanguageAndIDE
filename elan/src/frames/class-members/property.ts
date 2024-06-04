import { ElanSymbol } from "../interfaces/symbol";
import { SymbolScope } from "../symbols/symbol-scope";
import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { ClassFrame } from "../globals/class-frame";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { asKeyword, privateKeyword, propertyKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";
import { ClassType } from "../symbols/class-type";
import { EnumType } from "../symbols/enum-type";
import { mustBeKnownSymbolType } from "../compile-rules";

export class Property extends AbstractFrame implements Member, ElanSymbol {
  isMember = true;
  name: IdentifierField;
  type: TypeField;
  public private: boolean = false;
  private class: ClassFrame;

  constructor(parent: ClassFrame) {
    super(parent);
    this.class = parent as ClassFrame;
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
  }
  initialKeywords(): string {
    return propertyKeyword;
  }
  getFields(): Field[] {
    return [this.name, this.type];
  }

  getIdPrefix(): string {
    return "prop";
  }
  private modifierAsHtml(): string {
    return this.private ? `<keyword>private </keyword>` : "";
  }
  private modifierAsSource(): string {
    return this.private ? `private ` : "";
  }

  private modifierAsObjectCode(): string {
    return this.private ? `#` : "";
  }

  renderAsHtml(): string {
    return `<property class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.modifierAsHtml()}<keyword>${propertyKeyword} </keyword>${this.name.renderAsHtml()}<keyword> ${asKeyword} </keyword>${this.type.renderAsHtml()}${this.compileMsgAsHtml()}</property>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.modifierAsSource()}${propertyKeyword} ${this.name.renderAsSource()} ${asKeyword} ${this.type.renderAsSource()}\r\n`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const pName = this.name.compile(transforms);
    const mod = this.modifierAsObjectCode();
    const st = this.type.symbolType(transforms);

    mustBeKnownSymbolType(
      st,
      this.type.renderAsSource(),
      this.compileErrors,
      this.htmlId,
    );

    if (st instanceof ClassType || st instanceof EnumType) {
      return `${this.indent()}_${pName};\r
${this.indent()}${mod}get ${pName}() {\r
${this.indent()}${this.indent()}return this._${pName} ??= ${this.type.compile(transforms)};\r
${this.indent()}}\r
${this.indent()}${mod}set ${pName}(${pName}) {\r
${this.indent()}${this.indent()}this._${pName} = ${pName};\r
${this.indent()}}\r\n`;
    }

    return `${this.indent()}${mod}${pName} = ${this.type.compile(transforms)};\r\n`;
  }

  parseFrom(source: CodeSource): void {
    const priv = `${privateKeyword} `;
    if (source.isMatch(priv)) {
      source.remove(priv);
      this.private = true;
    }
    source.remove(`${propertyKeyword} `);
    this.name.parseFrom(source);
    source.remove(` ${asKeyword} `);
    this.type.parseFrom(source);
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  symbolType(transforms: Transforms) {
    return this.type.symbolType(transforms);
  }

  get symbolScope(): SymbolScope {
    return SymbolScope.property;
  }

  public initCode() {
    return `["${this.name.renderAsSource()}", "${this.type.renderAsSource()}"]`;
  }
}

import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustBeKnownSymbolType, mustBeUniqueNameInScope } from "../compile-rules";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { ClassFrame } from "../globals/class-frame";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { ElanSymbol } from "../interfaces/symbol";
import { asKeyword, privateKeyword, propertyKeyword } from "../keywords";
import { ClassType } from "../symbols/class-type";
import { getClassScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";

export class Property extends AbstractFrame implements Member, ElanSymbol {
  isMember = true;
  isProperty = true;
  name: IdentifierField;
  type: TypeField;
  public private: boolean = false;

  constructor(parent: ClassFrame, priv = false) {
    super(parent);
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
    this.private = priv;
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
    return `<property class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.modifierAsHtml()}<keyword>${propertyKeyword} </keyword>${this.name.renderAsHtml()}<keyword> ${asKeyword} </keyword>${this.type.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</property>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.modifierAsSource()}${propertyKeyword} ${this.name.renderAsSource()} ${asKeyword} ${this.type.renderAsSource()}\r\n`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const pName = this.name.compile(transforms);
    const mod = this.modifierAsObjectCode();
    const st = this.type.symbolType(transforms);

    mustBeUniqueNameInScope(
      pName,
      getClassScope(this),
      transforms,
      this.compileErrors,
      this.htmlId,
    );

    mustBeKnownSymbolType(st, this.type.renderAsSource(), this.compileErrors, this.htmlId);

    if (st instanceof ClassType) {
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

  symbolType(transforms?: Transforms) {
    return this.type.symbolType(transforms);
  }

  get symbolScope(): SymbolScope {
    return SymbolScope.property;
  }

  public initCode() {
    const tst = this.symbolType(transforms());
    if (!(tst instanceof ClassType)) {
      return `["${this.name.text}", ${tst.initialValue}]`;
    }
    return "";
  }
}

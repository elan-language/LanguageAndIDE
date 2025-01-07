import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustBeKnownSymbolType, mustBeUniqueNameInScope } from "../compile-rules";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { privateHelp } from "../frame-helpers";
import { ConcreteClass } from "../globals/concrete-class";
import { editorEvent } from "../interfaces/editor-event";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { asKeyword, privateKeyword, propertyKeyword } from "../keywords";
import { ClassType } from "../symbols/class-type";
import { getClassScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";

export class Property extends AbstractFrame implements Member, ElanSymbol {
  isMember = true;
  isProperty = true;
  isAbstract = false;
  name: IdentifierField;
  type: TypeField;
  public private: boolean = false;

  constructor(parent: Parent, priv = false) {
    super(parent);
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
    this.private = priv;
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
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
    return this.private ? `<el-kw>private </el-kw>` : "";
  }
  private modifierAsSource(): string {
    return this.private ? `private ` : "";
  }

  renderAsHtml(): string {
    return `<el-prop class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.privateHelp()}>${this.modifierAsHtml()}<el-kw>${propertyKeyword} </el-kw>${this.name.renderAsHtml()}<el-kw> ${asKeyword} </el-kw>${this.type.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-prop>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.modifierAsSource()}${propertyKeyword} ${this.name.renderAsSource()} ${asKeyword} ${this.type.renderAsSource()}\r\n`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const pName = this.name.compile(transforms);
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
${this.indent()}get ${pName}() {\r
${this.indent()}${this.indent()}return this._${pName} ??= ${this.type.compile(transforms)};\r
${this.indent()}}\r
${this.indent()}set ${pName}(${pName}) {\r
${this.indent()}${this.indent()}this._${pName} = ${pName};\r
${this.indent()}}\r\n`;
    }

    return `${this.indent()}${pName} = ${this.type.compile(transforms)};\r\n`;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    const priv = `${privateKeyword} `;
    if (source.isMatch(priv)) {
      source.remove(priv);
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
    return SymbolScope.member;
  }

  public initCode() {
    const tst = this.symbolType(transforms());
    if (!(tst instanceof ClassType)) {
      return `["${this.name.text}", ${tst.initialValue}]`;
    }
    return "";
  }

  processKey(e: editorEvent): boolean {
    if (!this.getClass().isAbstract && e.key === "p" && e.modKey.control) {
      this.private = !this.private;
      return true;
    } else {
      return super.processKey(e);
    }
  }
  privateHelp(): string {
    return privateHelp(this, propertyKeyword);
  }
}

import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { ClassFrame } from "../globals/class-frame";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { ElanSymbol } from "../interfaces/symbol";
import { abstractPropertyKeywords } from "../keywords";
import { ClassType } from "../symbols/class-type";
import { getClassScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";

export class AbstractProperty extends AbstractFrame implements Member, ElanSymbol {
  isAbstract = true;
  isMember = true;
  name: IdentifierField;
  type: TypeField;
  public private: boolean = false;

  constructor(parent: ClassFrame) {
    super(parent);
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
  }

  getClass(): ClassFrame {
    return this.getParent() as ClassFrame;
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
    return `<property class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword>abstract property </keyword>${this.name.renderAsHtml()}</keyword> as </keyword ${this.type.renderAsHtml()}</top>${this.compileMsgAsHtml()}${this.getFrNo()}</property>`;
  }

  renderAsSource(): string {
    return `${this.indent()}abstract property ${this.name.renderAsSource()} as ${this.type.renderAsSource()}\r\n`;
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
    return SymbolScope.property;
  }
}

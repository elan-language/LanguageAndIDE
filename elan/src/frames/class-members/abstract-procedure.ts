import { ProcedureType } from "../symbols/procedure-type";
import { ElanSymbol } from "../interfaces/symbol";
import { SymbolScope } from "../symbols/symbol-scope";
import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { ParamList } from "../fields/param-list";
import { ClassFrame } from "../globals/class-frame";
import { singleIndent } from "../helpers";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { abstractProcedureKeywords } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class AbstractProcedure extends AbstractFrame implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  public name: IdentifierField;
  public params: ParamList;
  private class: ClassFrame;

  constructor(parent: Parent) {
    super(parent);
    this.class = parent as ClassFrame;
    this.name = new IdentifierField(this);
    this.params = new ParamList(this);
  }
  initialKeywords(): string {
    return abstractProcedureKeywords;
  }
  getFields(): Field[] {
    return [this.name, this.params];
  }

  getIdPrefix(): string {
    return "proc";
  }

  public override indent(): string {
    return singleIndent();
  }

  renderAsHtml(): string {
    return `<procedure class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><keyword>abstract procedure </keyword><method>${this.name.renderAsHtml()}</method>(${this.params.renderAsHtml()})</top>${this.compileMsgAsHtml()}</procedure>
`;
  }

  public override renderAsSource(): string {
    return `${this.indent()}abstract procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
`;
  }

  public override compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.indent()}${this.name.compile(transforms)}(${this.params.compile(transforms)}) {\r
${this.indent()}}\r
`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("abstract procedure ");
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(")");
  }

  get symbolId() {
    return this.name.text;
  }

  symbolType(transforms: Transforms) {
    const pt = this.params.symbolTypes(transforms);
    return new ProcedureType(pt, false, true);
  }

  symbolScope = SymbolScope.property;
}

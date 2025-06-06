import { AbstractFrame } from "../abstract-frame";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { IdentifierField } from "../fields/identifier-field";
import { ParamListField } from "../fields/param-list-field";
import { singleIndent } from "../frame-helpers";
import { ConcreteClass } from "../globals/concrete-class";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { Transforms } from "../interfaces/transforms";
import { abstractProcedureKeywords } from "../keywords";
import { ProcedureType } from "../symbols/procedure-type";
import { getClassScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";

export class AbstractProcedure extends AbstractFrame implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  private = false;
  public name: IdentifierField;
  public params: ParamListField;
  constructor(parent: Parent) {
    super(parent);
    this.name = new IdentifierField(this);
    this.params = new ParamListField(this);
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
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
    return `<el-proc class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.bpAsHtml()}<el-kw>abstract procedure </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})${this.helpAsHtml()}</el-top>${this.compileMsgAsHtml()}${this.getFrNo()}</el-proc>
`;
  }

  public override renderAsSource(): string {
    return `${this.indent()}abstract procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
`;
  }

  public override compile(transforms: Transforms): string {
    this.compileErrors = [];

    const name = this.name.compile(transforms);
    mustBeUniqueNameInScope(name, getClassScope(this), transforms, this.compileErrors, this.htmlId);

    return `${this.indent()}${name}(${this.params.compile(transforms)}) {\r
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

  symbolType(transforms?: Transforms) {
    const [pn, pt] = this.params.symbolNamesAndTypes(transforms);
    return new ProcedureType(pn, pt, false, true);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

import { AbstractFrame } from "../abstract-frame";
import { IdentifierField } from "../fields/identifier-field";
import { ParamListField } from "../fields/param-list-field";
import { singleIndent } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { abstractProcedureKeywords } from "../keywords";

export class AbstractProcedure extends AbstractFrame {
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

  parseFrom(source: CodeSource): void {
    source.remove("abstract procedure ");
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(")");
  }
}

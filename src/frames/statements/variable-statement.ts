import { CodeSource } from "../frame-interfaces/code-source";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { setKeyword, toKeyword, variableKeyword } from "../keywords";
import { AbstractDefinitionStatement } from "./abstract-definition.statement";

export class VariableStatement extends AbstractDefinitionStatement implements Statement {
  isVariableStatement = true;
  constructor(parent: Parent) {
    super(parent);
  }

  initialKeywords(): string {
    return variableKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${variableKeyword} `);
    this.name.parseFrom(source);
    source.remove(" set to ");
    this.expr.parseFrom(source);
    source.removeNewLine();
  }

  getIdPrefix(): string {
    return "var";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>${variableKeyword} </el-kw>${this.name.renderAsHtml()}<el-kw> ${setKeyword} ${toKeyword} </el-kw>${this.expr.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${variableKeyword} ${this.name.renderAsSource()} ${setKeyword} ${toKeyword} ${this.expr.renderAsSource()}`;
  }
}

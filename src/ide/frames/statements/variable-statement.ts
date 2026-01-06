import {
  setKeyword,
  toKeyword,
  variableAnnotation,
  variableKeyword,
} from "../../../compiler/keywords";
import { CodeSource } from "../frame-interfaces/code-source";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
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

  frameSpecificAnnotation(): string {
    return `${variableAnnotation} `;
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}${this.language().renderSingleLineAsHtml(this)}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${variableKeyword} ${this.name.renderAsElanSource()} ${setKeyword} ${toKeyword} ${this.expr.renderAsElanSource()}`;
  }
}

import {
  beKeyword,
  definitionAnnotation,
  letKeyword,
  variableAnnotation,
} from "../../../compiler/keywords";
import { inlineComment } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { AbstractDefinitionStatement } from "./abstract-definition.statement";

export class LetStatement extends AbstractDefinitionStatement implements Statement {
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
  }

  isLet = true;

  initialKeywords(): string {
    return letKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${letKeyword} `);
    this.name.parseFrom(source);
    source.remove(` ${beKeyword} `);
    this.expr.parseFrom(source);
    source.removeNewLine();
  }

  getIdPrefix(): string {
    return "let";
  }

  renderAsHtml(): string {
    const note = inlineComment(`${variableAnnotation} ${definitionAnnotation}`);
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}
    ${this.name.renderAsHtml()}<el-kw> = </el-kw>${this.expr.renderAsHtml()}
    ${this.helpAsHtml()}${this.compileMsgAsHtml()}${note}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${letKeyword} ${this.name.renderAsSource()} ${beKeyword} ${this.expr.renderAsSource()}`;
  }
}

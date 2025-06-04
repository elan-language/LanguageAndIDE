import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { beKeyword, letKeyword } from "../keywords";
import { AbstractDefinitionStatement } from "./abstract-definition.statement";

export class LetStatement extends AbstractDefinitionStatement implements Statement, ElanSymbol {
  isStatement = true;
  hrefForFrameHelp: string = "LangRef.html#let";

  constructor(parent: Parent) {
    super(parent);
  }

  isLet = true;

  initialKeywords(): string {
    return letKeyword;
  }

  getJsKeyword(): string {
    return "const";
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
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>${letKeyword} </el-kw>${this.name.renderAsHtml()}<el-kw> ${beKeyword} </el-kw>${this.expr.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${letKeyword} ${this.name.renderAsSource()} ${beKeyword} ${this.expr.renderAsSource()}`;
  }
}

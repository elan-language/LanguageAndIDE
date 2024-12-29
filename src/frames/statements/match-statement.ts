import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustBeCompatibleType } from "../compile-rules";
import { MatchValueField } from "../fields/match-value-field";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { matchKeyword, withKeyword } from "../keywords";
import { isSymbol } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { Transforms } from "../syntax-nodes/transforms";

export class MatchStatement extends AbstractFrame implements Statement {
  isStatement = true;
  value: MatchValueField;

  constructor(parent: Parent) {
    super(parent);
    this.value = new MatchValueField(this);
  }
  makeImmovable() {
    this.movable = false;
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
  }

  initialKeywords(): string {
    return matchKeyword;
  }

  getFields(): Field[] {
    return [this.value];
  }

  getIdPrefix(): string {
    return "case";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>${matchKeyword} </el-kw>${this.value.renderAsHtml()}<el-kw> ${withKeyword}</el-kw>${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
</el-statement>`;
  }
  renderAsSource(): string {
    return `${this.getParent().indent()}${matchKeyword} ${this.value.renderAsSource()} ${withKeyword}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const parent = this.getParent();

    if (isSymbol(parent)) {
      const switchType = parent.symbolType(transforms);
      const caseType =
        this.value.getOrTransformAstNode(transforms)?.symbolType() ?? UnknownType.Instance;
      mustBeCompatibleType(switchType, caseType, this.compileErrors, this.htmlId);
    }

    const isFirstCase = parent.getChildren().filter((c) => c instanceof MatchStatement)[0] === this;
    const brk = isFirstCase ? `` : `${this.indent()}break;\r\n`;
    return `${brk}${this.getParent().indent()}case ${this.value.compile(transforms)}:`;
  }

  parseFrom(source: CodeSource): void {
    source.remove(`${matchKeyword} `);
    this.value.parseFrom(source);
    source.remove(` ${withKeyword}`);
    source.removeNewLine();
  }

  canInsertBefore(): boolean {
    return this.isMovable();
  }
}

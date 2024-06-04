import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CaseValueField } from "../fields/case-value-field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { singleIndent } from "../helpers";
import { caseKeyword } from "../keywords";
import { ElanSymbol } from "../interfaces/symbol";
import { mustBeCompatibleNode, mustBeCompatibleType } from "../compile-rules";
import { Transforms } from "../syntax-nodes/transforms";
import { isSymbol } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";

export class Case extends FrameWithStatements implements Statement {
  isStatement = true;
  value: CaseValueField;

  constructor(parent: Parent) {
    super(parent);
    this.value = new CaseValueField(this);
  }

  initialKeywords(): string {
    return caseKeyword;
  }

  getFields(): Field[] {
    return [this.value];
  }

  getIdPrefix(): string {
    return "case";
  }
  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>case </keyword>${this.value.renderAsHtml()}</top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
</statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}case ${this.value.renderAsSource()}\r
${this.renderChildrenAsSource()}`;
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

    return `${this.indent()}case ${this.value.compile(transforms)}:\r
${this.compileStatements(transforms)}\r
${this.indent()}${singleIndent()}break;`;
  }

  parseTop(source: CodeSource): void {
    source.remove("case ");
    this.value.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return source.isMatch("case ") || source.isMatch("default");
  }
}

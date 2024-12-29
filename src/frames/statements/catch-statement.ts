import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { singleIndent } from "../frame-helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { SymbolType } from "../interfaces/symbol-type";
import { catchKeyword, exceptionKeyword, inKeyword } from "../keywords";
import { StringType } from "../symbols/string-type";
import { SymbolScope } from "../symbols/symbol-scope";
import { Transforms } from "../syntax-nodes/transforms";

export class CatchStatement extends AbstractFrame implements Statement, ElanSymbol {
  isStatement = true;
  isCatch = true;
  variable: IdentifierField;

  constructor(parent: Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>variableName</i>");
    this.variable.setFieldToKnownValidText("e");
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
  }

  get symbolId() {
    return this.variable.text;
  }

  symbolType(_transforms?: Transforms): SymbolType {
    return StringType.Instance;
  }

  get symbolScope() {
    return SymbolScope.parameter;
  }

  initialKeywords(): string {
    return catchKeyword;
  }

  getFields(): Field[] {
    return [this.variable];
  }

  getIdPrefix(): string {
    return "catch";
  }

  indent(): string {
    return this.parentIndent() + singleIndent();
  }

  parentIndent(): string {
    return this.getParent()?.indent();
  }

  keywords = `${catchKeyword} ${exceptionKeyword} ${inKeyword} `;

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-top><el-expand>+</el-expand><el-kw>${this.keywords}</el-kw>${this.variable.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top></el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.keywords}${this.variable.renderAsSource()}\r`;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(this.keywords);
    this.variable.parseFrom(source);
    source.removeNewLine();
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const vid = this.variable.compile(transforms);
    return `${this.parentIndent()}} catch (_${vid}) {\r
${this.indent()}var ${vid} = _${vid}.message;\r`;
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (this.variable.text === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }
}

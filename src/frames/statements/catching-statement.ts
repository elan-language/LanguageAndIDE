import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { singleIndent } from "../frame-helpers";
import { FrameWithStatements } from "../frame-with-statements";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { SymbolType } from "../interfaces/symbol-type";
import { catchingKeyword } from "../keywords";
import { StringType } from "../symbols/string-type";
import { SymbolScope } from "../symbols/symbol-scope";
import { Transforms } from "../syntax-nodes/transforms";

export class CatchingStatement extends FrameWithStatements implements Statement, ElanSymbol {
  isStatement = true;
  variable: IdentifierField;

  constructor(parent: Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>variableName</i>");
    this.variable.setFieldToKnownValidText("e");
    this.movable = false;
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
    return catchingKeyword;
  }

  delete(): void {} //Does nothing as catch cannot be deleted

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

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-top><el-expand>+</el-expand><el-kw>catching exception in </el-kw>${this.variable.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}        
</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}catching exception in ${this.variable.renderAsSource()}\r
${this.renderChildrenAsSource()}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("catching exception in ");
    this.variable.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end try");
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const vid = this.variable.compile(transforms);
    return `${this.parentIndent()}} catch (_${vid}) {\r
${this.indent()}${singleIndent()}var ${vid} = _${vid}.message;
${this.compileStatements(transforms)}\r`;
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (this.variable.text === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }
}

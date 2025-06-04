import { IdentifierField } from "../fields/identifier-field";
import { singleIndent } from "../frame-helpers";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { Statement } from "../interfaces/statement";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { catchKeyword, exceptionKeyword, inKeyword } from "../keywords";
import { StringType } from "../symbols/string-type";
import { SymbolScope } from "../symbols/symbol-scope";

export class CatchStatement extends FrameWithStatements implements Statement, ElanSymbol {
  isStatement = true;
  isCatch = true;
  variable: IdentifierField;
  hrefForFrameHelp: string = "LangRef.html#catch";

  constructor(parent: Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>variableName</i>");
    this.variable.setFieldToKnownValidText("e");
    this.movable = false;
  }

  override deleteIfPermissible(): void {
    // does nothing - catch can't be deleted
  }

  canInsertAfter(): boolean {
    return false;
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

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  parentIndent(): string {
    return this.getParent().indent();
  }

  keywords = `${catchKeyword} ${exceptionKeyword} ${inKeyword} `;

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>${this.keywords}</el-kw>${this.variable.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}        
</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.keywords}${this.variable.renderAsSource()}\r
${this.renderChildrenAsSource()}`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    source.remove(this.keywords);
    this.variable.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end try");
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const vid = this.variable.compile(transforms);
    return `${this.parentIndent()}} catch (_${vid}) {\r
${this.indent()}${singleIndent()}let ${vid} = _${vid}.message;
${this.compileChildren(transforms)}\r`;
  }

  override getParentScope(): Scope {
    return this.getParent().getParentScope();
  }

  override getCurrentScope(): Scope {
    return this.getParent();
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (this.variable.text === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, _initialScope);
    const localMatches: ElanSymbol[] = [];

    const v = this.variable.text;

    if (id === v || all) {
      const counter = {
        symbolId: v,
        symbolType: () => StringType.Instance,
        symbolScope: SymbolScope.parameter,
      };
      localMatches.push(counter);
    }

    return localMatches.concat(matches);
  }
}

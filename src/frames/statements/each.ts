import { CodeSource } from "../code-source";
import { mustBeIterable, mustNotBeRedefined } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { IdentifierField } from "../fields/identifier-field";
import { FrameWithStatements } from "../frame-with-statements";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { eachKeyword } from "../keywords";
import { SymbolScope } from "../symbols/symbol-scope";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";

export class Each extends FrameWithStatements implements Statement {
  isStatement = true;
  variable: IdentifierField;
  iter: ExpressionField;
  hrefForFrameHelp: string = "LangRef.html#each";

  constructor(parent: File | Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>variableName</i>");
    this.iter = new ExpressionField(this);
    this.iter.setPlaceholder("<i>iterable value or expression</i>");
  }
  initialKeywords(): string {
    return eachKeyword;
  }

  getFields(): Field[] {
    return [this.variable, this.iter];
  }

  getIdPrefix(): string {
    return "each";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>each </el-kw>${this.variable.renderAsHtml()}<el-kw> in </el-kw>${this.iter.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end each</el-kw>
</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}each ${this.variable.renderAsSource()} in ${this.iter.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end each`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const id = this.variable.getOrTransformAstNode(transforms).compile();
    const symbol = this.getParent().resolveSymbol(id, transforms, this);

    mustNotBeRedefined(symbol, this.compileErrors, this.htmlId);

    const iterType = this.iter.getOrTransformAstNode(transforms).symbolType();
    mustBeIterable(iterType!, this.compileErrors, this.htmlId);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}for (const ${this.variable.compile(transforms)} of ${this.iter.compile(transforms)}) {\r
${this.compileChildren(transforms)}\r
${this.indent()}}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("each ");
    this.variable.parseFrom(source);
    source.remove(" in ");
    this.iter.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end each");
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Frame): ElanSymbol {
    const v = this.variable.text;

    if (id === v) {
      const st = (this.iter.symbolType(transforms) as GenericSymbolType).ofType;
      return {
        symbolId: id,
        symbolType: () => st,
        symbolScope: SymbolScope.counter,
      };
    }

    const iter = this.iter.text;

    if (id === iter) {
      // intercept iter resolve in order to make counter so it's immutable
      const symbol = super.resolveSymbol(id, transforms, this);
      return {
        symbolId: id,
        symbolType: (t) => symbol.symbolType(t),
        symbolScope: SymbolScope.counter,
      };
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  symbolMatches(id: string, all: boolean, _initialScope?: Frame): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, this);
    const localMatches: ElanSymbol[] = [];

    const v = this.variable.text;

    if (id === v || all) {
      const st = (this.iter.symbolType(transforms()) as GenericSymbolType).ofType;
      const counter = {
        symbolId: v,
        symbolType: () => st,
        symbolScope: SymbolScope.counter,
      };
      localMatches.push(counter);
    }

    return localMatches.concat(matches);
  }
}

import { mustBeIterable, mustNotBeRedefined } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { IdentifierField } from "../fields/identifier-field";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../interfaces/transforms";
import { eachKeyword } from "../keywords";
import { isGenericSymbolType } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownType } from "../symbols/unknown-type";
import { transforms } from "../syntax-nodes/ast-helpers";

export class Each extends FrameWithStatements implements Statement {
  isStatement = true;
  variable: IdentifierField;
  iter: ExpressionField;
  constructor(parent: File | Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>variableName</i>");
    this.iter = new ExpressionField(this);
    this.iter.setPlaceholder("<i>source</i>");
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
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>each </el-kw>${this.variable.renderAsHtml()}<el-kw> in </el-kw>${this.iter.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
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

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    const v = this.variable.text;

    if (id === v) {
      const iterSt = this.iter.symbolType(transforms);
      const st = isGenericSymbolType(iterSt) ? iterSt.ofTypes[0] : UnknownType.Instance;
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

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, this);
    const localMatches: ElanSymbol[] = [];

    const v = this.variable.text;

    if (id === v || all) {
      const iterSt = this.iter.symbolType(transforms());
      const st = isGenericSymbolType(iterSt) ? iterSt.ofTypes[0] : UnknownType.Instance;
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

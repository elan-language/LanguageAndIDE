import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustBeDeconstructableType, mustNotBeKeyword, mustNotBeRedefined } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { VarDefField } from "../fields/var-def-field";
import { mapIds, mapSymbolType } from "../helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { setKeyword, toKeyword, varKeyword } from "../keywords";
import { symbolMatches } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { getIds, wrapDeconstruction } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";

export class VarStatement extends AbstractFrame implements Statement, ElanSymbol {
  isStatement = true;
  isVarStatement = true;
  name: VarDefField;
  expr: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.name = new VarDefField(this);
    this.expr = new ExpressionField(this);
  }
  initialKeywords(): string {
    return varKeyword;
  }
  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("var ");
    this.name.parseFrom(source);
    source.remove(" set to ");
    this.expr.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.name, this.expr];
  }
  getIdPrefix(): string {
    return "var";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-kw>${varKeyword} </el-kw>${this.name.renderAsHtml()}<el-kw> ${setKeyword} ${toKeyword} </el-kw>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${varKeyword} ${this.name.renderAsSource()} ${setKeyword} ${toKeyword} ${this.expr.renderAsSource()}`;
  }

  ids(transforms?: Transforms) {
    return getIds(this.name.getOrTransformAstNode(transforms));
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const ids = this.ids(transforms);

    if (ids.length > 1) {
      mustBeDeconstructableType(this.symbolType(transforms), this.compileErrors, this.htmlId);
    }

    for (const i of ids) {
      mustNotBeKeyword(i, this.compileErrors, this.htmlId);
      const symbol = this.getParent().resolveSymbol(i!, transforms, this);
      mustNotBeRedefined(symbol, this.compileErrors, this.htmlId);
    }

    const rhs = wrapDeconstruction(
      this.name.getOrTransformAstNode(transforms),
      this.expr.compile(transforms),
    );

    return `${this.indent()}var ${mapIds(ids)} = ${rhs};`;
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  symbolType(transforms?: Transforms) {
    const ids = this.ids(transforms);
    const st = this.expr.symbolType(transforms);
    return mapSymbolType(ids, st);
  }

  get symbolScope() {
    return SymbolScope.local;
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (id === this.symbolId) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  symbolMatches(id: string, all: boolean, initialScope?: Frame): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches = symbolMatches(id, all, [this as ElanSymbol]);

    return localMatches.concat(matches);
  }
}

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
import { beKeyword, letKeyword } from "../keywords";
import { SymbolScope } from "../symbols/symbol-scope";
import { getIds, wrapDeconstructionRhs } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";

export class LetStatement extends AbstractFrame implements Statement, ElanSymbol {
  isStatement = true;
  name: VarDefField;
  expr: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.name = new VarDefField(this);
    this.expr = new ExpressionField(this);
  }

  isLet = true;

  ids(transforms?: Transforms) {
    return getIds(this.name.getOrTransformAstNode(transforms));
  }

  symbolType(transforms?: Transforms) {
    const ids = this.ids(transforms);
    const st = this.expr.symbolType(transforms);
    return mapSymbolType(ids, st);
  }

  get symbolScope(): SymbolScope {
    return SymbolScope.local;
  }

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
  getFields(): Field[] {
    return [this.name, this.expr];
  }
  getIdPrefix(): string {
    return "let";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-kw>${letKeyword} </el-kw>${this.name.renderAsHtml()}<el-kw> ${beKeyword} </el-kw>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${letKeyword} ${this.name.renderAsSource()} ${beKeyword} ${this.expr.renderAsSource()}`;
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

    const val = this.expr.compile(transforms);

    const rhs =
      ids.length === 1
        ? val
        : wrapDeconstructionRhs(this.name.getOrTransformAstNode(transforms), val);

    return `${this.indent()}const ${mapIds(ids)} = ${rhs};`;
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (id === this.symbolId) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }
}

import { ExpressionField } from "../fields/expression-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { ElanSymbol } from "../interfaces/symbol";
import { beKeyword, letKeyword } from "../keywords";
import { VarDefField } from "../fields/var-def-field";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../symbols/symbol-scope";
import { mustNotBeKeyword, mustNotBeReassigned } from "../compile-rules";
import { Frame } from "../interfaces/frame";
import { AstIdNode } from "../interfaces/ast-id-node";

export class LetStatement extends AbstractFrame implements Statement, ElanSymbol {
  isStatement = true;
  name: VarDefField;
  expr: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.name = new VarDefField(this);
    this.expr = new ExpressionField(this);
  }

  symbolType(transforms?: Transforms) {
    return this.expr.symbolType(transforms);
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
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>${letKeyword} </keyword>${this.name.renderAsHtml()}<keyword> ${beKeyword} </keyword>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}</statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${letKeyword} ${this.name.renderAsSource()} ${beKeyword} ${this.expr.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    // todo common code with var statement
    const id = (this.name.getOrTransformAstNode(transforms) as AstIdNode).id;
    const ids = id.includes(",") ? id.split(",") : [id];

    for (const i of ids) {
      mustNotBeKeyword(i, this.compileErrors, this.htmlId);
      const symbol = this.getParent().resolveSymbol(i!, transforms, this);
      mustNotBeReassigned(symbol, this.compileErrors, this.htmlId);
    }

    const vid = ids.length > 1 ? `[${ids.join(", ")}]` : id;

    return `${this.indent()}var ${vid} = (() => {
${this.indent()}${this.indent()}var _cache;
${this.indent()}${this.indent()}return () => _cache ??= ${this.expr.compile(transforms)};
${this.indent()}})();`;
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

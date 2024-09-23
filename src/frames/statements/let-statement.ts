import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustBeDeconstructableType, mustNotBeKeyword, mustNotBeReassigned } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { VarDefField } from "../fields/var-def-field";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { ElanSymbol } from "../interfaces/symbol";
import { beKeyword, letKeyword } from "../keywords";
import { ArrayType } from "../symbols/array-list-type";
import { DeconstructedListType } from "../symbols/deconstructed-list-type";
import { DeconstructedTupleType } from "../symbols/deconstructed-tuple-type";
import { ListType } from "../symbols/list-type";
import { SymbolScope } from "../symbols/symbol-scope";
import { TupleType } from "../symbols/tuple-type";
import { isAstIdNode, wrapDeconstruction } from "../syntax-nodes/ast-helpers";
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

  ids(transforms?: Transforms) {
    const ast = this.name.getOrTransformAstNode(transforms);
    if (isAstIdNode(ast)) {
      const id = ast.id;
      return id.includes(",") ? id.split(",") : [id];
    }
    return [];
  }

  symbolType(transforms?: Transforms) {
    const ids = this.ids(transforms);
    const st = this.expr.symbolType(transforms);
    if (ids.length > 1 && st instanceof TupleType) {
      return new DeconstructedTupleType(ids, st.ofTypes);
    }
    if (ids.length === 2 && (st instanceof ArrayType || st instanceof ListType)) {
      return new DeconstructedListType(ids[0], ids[1], st.ofType, st);
    }

    return st;
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
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>${letKeyword} </keyword>${this.name.renderAsHtml()}<keyword> ${beKeyword} </keyword>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</statement>`;
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
      mustNotBeReassigned(symbol, this.compileErrors, this.htmlId);
    }

    const vid = ids.length > 1 ? `[${ids.join(", ")}]` : ids[0];

    const val = this.expr.compile(transforms);

    const expr =
      ids.length === 1
        ? `(() => {
${this.indent()}${this.indent()}var _cache;
${this.indent()}${this.indent()}return () => _cache ??= ${val};
${this.indent()}})()`
        : `${wrapDeconstruction(this.name.getOrTransformAstNode(transforms), true, val)}`;

    return `${this.indent()}var ${vid} = ${expr};`;
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

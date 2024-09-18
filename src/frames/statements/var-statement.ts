import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustNotBeKeyword, mustNotBeReassigned } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { VarDefField } from "../fields/var-def-field";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { ElanSymbol } from "../interfaces/symbol";
import { setKeyword, toKeyword, varKeyword } from "../keywords";
import { DeconstructedTupleType } from "../symbols/deconstructed-tuple-type";
import { SymbolScope } from "../symbols/symbol-scope";
import { TupleType } from "../symbols/tuple-type";
import { isAstIdNode, wrapDeconstruction } from "../syntax-nodes/ast-helpers";
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
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>${varKeyword} </keyword>${this.name.renderAsHtml()}<keyword> ${setKeyword} ${toKeyword} </keyword>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${varKeyword} ${this.name.renderAsSource()} ${setKeyword} ${toKeyword} ${this.expr.renderAsSource()}`;
  }

  ids(transforms?: Transforms) {
    const ast = this.name.getOrTransformAstNode(transforms);
    if (isAstIdNode(ast)) {
      const id = ast.id;
      return id.includes(",") ? id.split(",") : [id];
    }
    return [];
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const ids = this.ids(transforms);

    for (const i of ids) {
      mustNotBeKeyword(i, this.compileErrors, this.htmlId);
      const symbol = this.getParent().resolveSymbol(i!, transforms, this);
      mustNotBeReassigned(symbol, this.compileErrors, this.htmlId);
    }

    const vid = ids.length > 1 ? `[${ids.join(", ")}]` : ids[0];

    const rhs = wrapDeconstruction(
      this.name.getOrTransformAstNode(transforms),
      this.expr.compile(transforms),
    );

    return `${this.indent()}var ${vid} = ${rhs};`;
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  symbolType(transforms?: Transforms) {
    const ids = this.ids(transforms);
    const st = this.expr.symbolType(transforms);
    if (ids.length > 1 && st instanceof TupleType) {
      return new DeconstructedTupleType(ids, st.ofTypes);
    }

    return st;
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

    if (this.symbolId.startsWith(id) || all) {
      return [this as ElanSymbol].concat(matches);
    }

    return matches;
  }
}

import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import {
  mustBeCompatibleDefinitionNode,
  mustBeDeconstructableType,
  mustNotBeKeyword,
  mustNotBeRedefined,
} from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { VarDefField } from "../fields/var-def-field";
import { mapSymbolType } from "../frame-helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { Statement } from "../interfaces/statement";
import { getDeconstructionIds, symbolMatches } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { getIds, wrapDeconstructionLhs, wrapDeconstructionRhs } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { DefinitionAdapter } from "./definition-adapter";

export abstract class AbstractDefinitionStatement
  extends AbstractFrame
  implements Statement, ElanSymbol
{
  isStatement = true;
  name: VarDefField;
  expr: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.name = new VarDefField(this);
    this.expr = new ExpressionField(this);
  }
  abstract initialKeywords(): string;

  abstract parseFrom(source: CodeSource): void;

  abstract getIdPrefix(): string;

  abstract getJsKeyword(): string;

  abstract renderAsHtml(): string;

  abstract renderAsSource(): string;

  getFields(): Field[] {
    return [this.name, this.expr];
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

    const lhs = this.name.getOrTransformAstNode(transforms);
    const rhs = this.expr.getOrTransformAstNode(transforms);

    mustBeCompatibleDefinitionNode(lhs, rhs, this.getParent(), this.compileErrors, this.htmlId);

    const lhsCode = wrapDeconstructionLhs(lhs, rhs, false);

    const rhsCode = wrapDeconstructionRhs(lhs, rhs, false);

    return `${this.breakPoint(this.debugSymbols())}${this.indent()}${this.getJsKeyword()} ${lhsCode} = ${rhsCode};`;
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

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (id === this.symbolId) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const ids = getDeconstructionIds(this.symbolId);

    const definitions =
      ids.length > 1 ? ids.map((_, i) => new DefinitionAdapter(this, i)) : [this as ElanSymbol];

    const localMatches = symbolMatches(id, all, definitions);

    return localMatches.concat(matches);
  }
}

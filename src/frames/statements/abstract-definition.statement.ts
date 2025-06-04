import { AbstractFrame } from "../abstract-frame";

import { ExpressionField } from "../fields/expression-field";
import { ValueDefField } from "../fields/value-def-field";
import { mapSymbolType } from "../frame-helpers";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../interfaces/transforms";
import { SymbolScope } from "../symbols/symbol-scope";
import { getIds } from "../syntax-nodes/ast-helpers";

export abstract class AbstractDefinitionStatement
  extends AbstractFrame
  implements Statement, ElanSymbol
{
  isStatement = true;
  name: ValueDefField;
  expr: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.name = new ValueDefField(this);
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

  symbolMatches(_id: string, _all: boolean, _initialScope: Scope): ElanSymbol[] {
    // const matches = super.symbolMatches(id, all, initialScope);
    // const ids = getDeconstructionIds(this.symbolId);

    // const definitions =
    //   ids.length > 1 ? ids.map((_, i) => new DefinitionAdapter(this, i)) : [this as ElanSymbol];

    // const localMatches = symbolMatches(id, all, definitions);

    // return localMatches.concat(matches);
    return [];
  }
}

import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { ParamListNode } from "../parse-nodes/param-list-node";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { symbolMatches } from "../symbols/symbol-helpers";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { isAstCollectionNode, isAstIdNode, transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ParamListField extends AbstractField implements Scope {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>parameter definitions</i>");
    this.useHtmlTags = true;
    this.setOptional(true);
  }

  helpId(): string {
    return "ParamListField";
  }

  getParentScope(): Scope {
    return this.getHolder();
  }

  private getParamsAsSymbols(): ElanSymbol[] {
    const ast = this.getOrTransformAstNode(transforms());

    if (isAstCollectionNode(ast)) {
      return ast.items
        .filter((n) => isAstIdNode(n))
        .map((n) => ({
          symbolId: n.id,
          symbolType: () => n.symbolType(),
          symbolScope: n.symbolScope,
        }));
    }

    return [];
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const symbols = this.getParamsAsSymbols();
    return symbolMatches(id, all, symbols);
  }

  getIdPrefix(): string {
    return "params";
  }
  public contentAsSource(): string {
    if (this.text) {
      return this.text;
    } else {
      return "";
    }
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new ParamListNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToNonMatchingCloseBracket();

  symbolNamesAndTypes(): [string[], SymbolType[]] {
    const symbols = this.getParamsAsSymbols();
    const names = symbols.map((s) => s.symbolId);
    const types = symbols.map((s) => s.symbolType());
    return [names, types];
  }

  resolveSymbol(id: string, _transforms: Transforms, _initialScope: Scope): ElanSymbol {
    const allSymbols = this.getParamsAsSymbols();
    const matches = allSymbols.filter((n) => n.symbolId === id);

    if (matches.length === 1) {
      return matches[0];
    }

    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return new UnknownSymbol(id);
  }

  isEndMarker(key: string) {
    return this.text === "" && key === ")";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

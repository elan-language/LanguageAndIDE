import {
  mustBeUniqueNameInScope,
  mustNotBeOutParameter,
  mustNotBeRedefined,
} from "../compile-rules";
import { isConstructor, isFunction } from "../frame-helpers";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { ParamListNode } from "../parse-nodes/param-list-node";
import { ParseStatus } from "../status-enums";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { symbolMatches } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
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

  private mustNotBeRedefined(id: string, transforms: Transforms) {
    // up two or we just get the parameter again
    const symbol = this.getParentScope().getParentScope().resolveSymbol(id, transforms, this);
    mustNotBeRedefined(symbol, this.compileErrors, this.htmlId);
  }

  private mustNotBeOutOnFunctionOrConstructor(id: string, transforms: Transforms) {
    // up two or we just get the parameter again
    const parentScope = this.getParentScope();

    if (isFunction(parentScope) || isConstructor(parentScope)) {
      const symbol = parentScope.resolveSymbol(id, transforms, this);
      if (symbol.symbolScope === SymbolScope.outParameter) {
        mustNotBeOutParameter(this.compileErrors, this.htmlId);
      }
    }
  }

  private getIdNodes(parms: AstNode): AstIdNode[] {
    if (isAstCollectionNode(parms)) {
      return parms.items.filter((n) => isAstIdNode(n)) as AstIdNode[];
    }

    return [];
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    if (this.rootNode && this.rootNode.status === ParseStatus.valid) {
      const parms = this.getOrTransformAstNode(transforms);

      const idNodes = this.getIdNodes(parms);

      for (const idNode of idNodes) {
        this.mustNotBeOutOnFunctionOrConstructor(idNode.id, transforms);

        if (idNodes.length > 1) {
          mustBeUniqueNameInScope(idNode.id, this, transforms, this.compileErrors, this.htmlId);
        }

        this.mustNotBeRedefined(idNode.id, transforms);
      }

      return parms.compile();
    }

    return "";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

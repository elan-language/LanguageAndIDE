import { CodeSource } from "../code-source";
import { isAstType } from "../helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { TypeNode } from "../parse-nodes/type-node";
import {
  filteredSymbols,
  isTypeName,
  removeIfSingleFullMatch,
  removeTypeSymbols,
} from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";

export class TypeField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.useHtmlTags = true;
    this.placeholder = "<pr>Type</pr>";
    this.help = `A simple Type name must begin with an upper-case letter. More complex types are: 'generic type', 'tuple type', 'function type' - consult documentation for these.`;
  }
  getIdPrefix(): string {
    return "type";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new TypeNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const astNode = this.getOrTransformAstNode(transforms);
    if (isAstType(astNode)) {
      return astNode.compileToEmptyObjectCode();
    }
    return super.compile(transforms);
  }

  symbolType(transforms?: Transforms) {
    return this.getOrTransformAstNode(transforms).symbolType();
  }

  matchingSymbolsForId(): [string, ElanSymbol[]] {
    const text = this.rootNode?.matchedText ?? "";
    const id = removeTypeSymbols(text);

    const [match, symbols] = filteredSymbols(
      id,
      transforms(),
      (s) => isTypeName(s),
      this.getHolder(),
    );

    return [match, removeIfSingleFullMatch(symbols, match)];
  }

  public textAsHtml(): string {
    let popupAsHtml = "";
    if (this.showAutoComplete()) {
      [this.autocompleteMatch, this.autocompleteSymbols] = this.matchingSymbolsForId();
      popupAsHtml = this.popupAsHtml();
    }
    return popupAsHtml + super.textAsHtml();
  }
}

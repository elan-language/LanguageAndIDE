import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";
import { ElanSymbol } from "../interfaces/symbol";
import {
  filteredSymbols,
  isExpression,
  isFunction,
  isPropertyOnFieldsClass,
} from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { propertyKeyword } from "../keywords";
import { SymbolScope } from "../symbols/symbol-scope";

export class ExpressionField extends AbstractField {
  isParseByNodes = true;
  readUntil: RegExp;

  constructor(holder: Frame, readUntil = /\r?\n/) {
    super(holder);
    this.readUntil = readUntil;
    this.setPlaceholder("expression");
    this.help = "Field may contain a literal value, a reference to a variable, or an expression";
  }
  getIdPrefix(): string {
    return "expr";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new ExprNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(this.readUntil);

  matchingSymbolsForId(): [string, ElanSymbol[]] {
    const id = this.rootNode?.matchedText ?? "";
    return filteredSymbols(
      id,
      transforms(),
      (s) => isExpression(s, transforms()),
      this.getHolder(),
    );
  }

  public textAsHtml(): string {
    let popupAsHtml = "";
    if (this.showAutoComplete()) {
      [this.autocompleteMatch, this.autocompleteSymbols] = this.matchingSymbolsForId();
      popupAsHtml = this.popupAsHtml();
    }
    return popupAsHtml + super.textAsHtml();
  }

  protected override getId(s: ElanSymbol) {
    if (isFunction(s, transforms())) {
      return s.symbolId + "(";
    }
    if (isPropertyOnFieldsClass(s, this.getHolder())) {
      return `${propertyKeyword}.${s.symbolId}`;
    }
    return s.symbolId;
  }

  protected override getSymbolId(symbol: ElanSymbol) {
    return symbol.symbolScope === SymbolScope.property &&
      !this.text.includes(".") &&
      this.autocompleteSymbols.filter((s) => s.symbolId === symbol.symbolId).length > 1
      ? `property.${symbol.symbolId}`
      : symbol.symbolId;
  }
}

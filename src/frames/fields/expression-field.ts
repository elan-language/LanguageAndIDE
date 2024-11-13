import { CodeSource } from "../code-source";
import { isGenericClass } from "../helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { propertyKeyword } from "../keywords";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { isFunction, isMemberOnFieldsClass, isProperty } from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ExpressionField extends AbstractField {
  isParseByNodes = true;
  readUntil: RegExp;

  constructor(holder: Frame, readUntil = /\r?\n/) {
    super(holder);
    this.readUntil = readUntil;
    this.setPlaceholder("<i>expression</i>");
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

  public textAsHtml(): string {
    return super.textAsHtml() + this.symbolCompletionAsHtml(transforms());
  }

  protected override getSymbolCompleteId(symbol: ElanSymbol) {
    if (isMemberOnFieldsClass(symbol, transforms(), this.getHolder())) {
      return `${propertyKeyword}.${symbol.symbolId}`;
    }
    if (isGenericClass(symbol)) {
      return `${symbol.symbolId}<of `;
    }
    if (isFunction(symbol, transforms())) {
      return symbol.symbolId + "(";
    }
    return symbol.symbolId;
  }

  mapPropertyId(symbol: ElanSymbol) {
    return isProperty(symbol) &&
      !this.text.includes(".") &&
      this.autocompleteSymbols.filter((s) => s.symbolId === symbol.symbolId).length > 1
      ? `${propertyKeyword}.${symbol.symbolId}`
      : symbol.symbolId;
  }

  mapTypeId(symbol: ElanSymbol) {
    return isGenericClass(symbol) ? `${symbol.symbolId}&lt;of` : symbol.symbolId;
  }

  protected override getDisplaySymbolId(symbol: ElanSymbol) {
    return isProperty(symbol) ? this.mapPropertyId(symbol) : this.mapTypeId(symbol);
  }
}

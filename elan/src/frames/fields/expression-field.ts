import { UnknownType } from "../symbols/unknown-type";
import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";
import { Scope } from "../interfaces/scope";
import { ElanSymbol } from "../interfaces/symbol";
import {
  filteredSymbols,
  isExpression,
  isIdOrProcedure,
  isVarStatement,
  matchingSymbols,
  removeIfSingleFullMatch,
} from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";

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

  matchingSymbolsForId(scope: Scope): [string, ElanSymbol[]] {
    const id = this.rootNode?.matchedText ?? "";
    return filteredSymbols(id, transforms(), (s) => isExpression(s, transforms()), scope);
  }

  public textAsHtml(): string {
    let popupAsHtml = "";
    if (this.selected) {
      [this.autocompleteMatch, this.autocompleteSymbols] = this.matchingSymbolsForId(
        this.getHolder(),
      );
      const ids = this.autocompleteSymbols.map((s) => s.symbolId);
      popupAsHtml = this.popupAsHtml(ids);
    }
    return popupAsHtml + super.textAsHtml();
  }
}

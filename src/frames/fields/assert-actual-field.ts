import { CodeSource } from "../code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { ParseNode } from "../parse-nodes/parse-node";
import { TermChained } from "../parse-nodes/term-chained";
import { TermSimple } from "../parse-nodes/term-simple";
import { filteredSymbols, isExpression, removeIfSingleFullMatch } from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class AssertActualField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    const termSimple = () => new TermSimple();
    const termChained = () => new TermChained();
    this.rootNode = new Alternatives([termSimple, termChained]);
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/\sis\s/);

  matchingSymbolsForId(): [string, ElanSymbol[]] {
    const id = this.rootNode?.matchedText ?? "";
    const [match, symbols] = filteredSymbols(
      id,
      transforms(),
      (s) => isExpression(s, transforms()),
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
    return super.textAsHtml() + popupAsHtml;
  }
}

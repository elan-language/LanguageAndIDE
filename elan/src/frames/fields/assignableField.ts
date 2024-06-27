import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ElanSymbol } from "../interfaces/symbol";
import { Alternatives } from "../parse-nodes/alternatives";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../status-enums";
import {
  filteredSymbols,
  isProperty,
  isVarOrPropertyStatement,
  isVarStatement,
} from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class AssignableField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("variable");
    this.help = `A previously defined variable, but NOT a parameter. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)`;
  }

  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    const varRef = () => new AssignableNode();
    const deconTup = () => new DeconstructedTuple();
    const deconList = () => new DeconstructedList();
    this.rootNode = new Alternatives([varRef, deconTup, deconList]);
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/(\s+to\s+)|\r|\n/);

  matchingSymbolsForId(): [string, ElanSymbol[]] {
    const id = this.rootNode?.matchedText ?? "";
    return filteredSymbols(id, transforms(), (s) => isVarOrPropertyStatement(s), this.getHolder());
  }

  protected override getId(s: ElanSymbol) {
    if (isProperty(s)) {
      return "property." + s.symbolId;
    }
    return s.symbolId;
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

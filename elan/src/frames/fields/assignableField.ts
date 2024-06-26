import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { ElanSymbol } from "../interfaces/symbol";
import { Alternatives } from "../parse-nodes/alternatives";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import {
  isVarStatement,
  matchingSymbols,
  removeIfSingleFullMatch,
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

  matchingSymbolsForId(scope: Scope): [string, ElanSymbol[]] {
    const id = this.rootNode?.matchedText ?? "";
    const [match, matches] = matchingSymbols(id, transforms(), scope);
    const filtered = removeIfSingleFullMatch(
      matches.filter((s) => isVarStatement(s)),
      match,
    );
    return [match, filtered];
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

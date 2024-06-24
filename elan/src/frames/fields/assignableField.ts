import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { ElanSymbol } from "../interfaces/symbol";
import { Alternatives } from "../parse-nodes/alternatives";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import { VarStatement } from "../statements/var-statement";
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

  matchingSymbols(scope: Scope): ElanSymbol[] {
    const id = this.rootNode?.matchedText;
    return id ? scope.symbolMatches(id, this.getHolder()) : [];
  }

  public textAsHtml(): string {
    let popupAsHtml = "";
    if (this.selected) {
      const matchedSymbols = this.matchingSymbols(this.getHolder());
      const symbolAsHtml: string[] = [];

      for (const symbol of matchedSymbols.filter((s) => s instanceof VarStatement)) {
        symbolAsHtml.push(`<div class="autocomplete-item">${symbol.symbolId}</div>`);
      }

      if (symbolAsHtml.length > 0) {
        popupAsHtml = `<div class="autocomplete-popup">${symbolAsHtml.join("")}</div>`;
      }
    }
    return super.textAsHtml() + popupAsHtml;
  }
}

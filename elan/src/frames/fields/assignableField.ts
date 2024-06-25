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
import { isVarStatement } from "../symbols/symbol-helpers";
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

  matchingSymbolsForId(scope: Scope): ElanSymbol[] {
    const id = this.rootNode?.matchedText;
    return id ? scope.symbolMatches(id, false, scope).filter((s) => isVarStatement(s)) : [];
  }

  public textAsHtml(): string {
    let popupAsHtml = "";
    if (this.selected) {
      const matchedSymbols = this.matchingSymbolsForId(this.getHolder());
      const filteredSymbolIds = matchedSymbols.map((s) => s.symbolId);
      popupAsHtml = this.popupAsHtml(filteredSymbolIds);
    }
    return super.textAsHtml() + popupAsHtml;
  }
}

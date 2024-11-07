import exp from "constants";
import { CodeSource } from "../code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { propertyKeyword } from "../keywords";
import { Alternatives } from "../parse-nodes/alternatives";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import {
  filteredSymbols,
  isInsideClass,
  isMemberOnFieldsClass,
  isProperty,
  isVarOrPropertyStatement,
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

  allPropertiesInScope() {
    const all = this.getHolder().symbolMatches("", true, this.getHolder());
    return all.filter((s) => isProperty(s)) as ElanSymbol[];
  }

  matchingSymbolsForId(): [string, ElanSymbol[]] {
    const scope = this.getHolder();
    const id = this.rootNode?.matchedText ?? "";
    let symbols = filteredSymbols(id, transforms(), (s) => isVarOrPropertyStatement(s), scope);

    if (isInsideClass(scope)) {
      const prefix = "property.";

      if (prefix.startsWith(id) && id.length <= prefix.length) {
        const [match, existing] = symbols;
        const allProperties = this.allPropertiesInScope();

        const updated = existing.filter((s) => !allProperties.includes(s)).concat(allProperties);
        symbols = [match, updated];
      } else if (id.startsWith(prefix)) {
        const [match] = symbols;
        symbols = filteredSymbols(match, transforms(), (s) => isProperty(s), scope);
      }
    }
    const [match, origSymbols] = symbols;

    return [match, removeIfSingleFullMatch(origSymbols, match)];
  }

  protected override getId(s: ElanSymbol) {
    if (isMemberOnFieldsClass(s, transforms(), this.getHolder())) {
      return `${propertyKeyword}.${s.symbolId}`;
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

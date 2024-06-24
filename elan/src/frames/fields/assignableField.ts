import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { Scope } from "../interfaces/scope";

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

  autocomplete(scope: Scope): string[] {
    const id = this.rootNode?.matchedText;

    if (id) {
      return scope.symbolMatches(id);
    }

    return [];
  }

  public textAsHtml(): string {
    let popup = "";
    if (this.selected) {
      const autocomplete = this.autocomplete(this.getHolder());
      const select: string[] = [];

      for (const l of autocomplete) {
        select.push(`<div class="autocomplete-item">${l}</div>`);
      }

      if (select.length > 0) {
        popup = `<div class="autocomplete-popup">${select.join("")}</div>`;
      }
    }
    return super.textAsHtml() + popup;
  }
}

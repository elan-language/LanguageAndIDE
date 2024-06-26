import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { ElanSymbol } from "../interfaces/symbol";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../status-enums";
import { isIdOrProcedure, isProcedure, matchingSymbols } from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ProcRefField extends AbstractField {
  isParseByNodes = true;
  qualProc = () => new InstanceProcRef(); // These two are alternatives, not a combination!
  proc = () => new IdentifierNode(); // These two are alternatives, not a combination

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("procedureName");
    this.help = `The name of the procedure to be called (starting lower-case). Alternatively, a 'dotted-call':  the name of a variable or property, followed by a ''' and the name of the procedure method to call on that 'instance'.`;
  }
  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new Alternatives([this.proc, this.qualProc]);
    this.rootNode.setCompletionWhenEmpty(this.placeholder); //Need to test proc first, otherwise valid proc would be treated as instance part of an incomplete qualProc
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) => source.readUntil(/\(/);

  matchingSymbolsForId(scope: Scope): [string, ElanSymbol[]] {
    const id = this.rootNode?.matchedText;

    if (id === undefined || id === "") {
      return ["", []];
    }

    const [match, ms] = matchingSymbols(id, transforms(), scope);
    return [match, ms.filter((s) => isIdOrProcedure(s, transforms()))];
  }

  private getId(s: ElanSymbol) {
    if (isProcedure(s, transforms())) {
      return s.symbolId;
    }
    return s.symbolId + ".";
  }

  protected getAutocompleteText() {
    const matches = this.autocompleteSymbols.filter((s) => s.symbolId === this.autoCompSelected);
    if (matches.length > 0) {
      return this.getId(matches[0]);
    }
    return this.autoCompSelected;
  }

  public textAsHtml(): string {
    let text: string;
    if (this.selected) {
      [this.autocompleteMatch, this.autocompleteSymbols] = this.matchingSymbolsForId(
        this.getHolder(),
      );
      const filteredSymbolIds = this.autocompleteSymbols.map((s) => s.symbolId);
      const popupAsHtml = this.popupAsHtml(filteredSymbolIds);
      text = popupAsHtml + super.textAsHtml();
    } else {
      if (
        this.readParseStatus() === ParseStatus.valid ||
        this.readParseStatus() === ParseStatus.valid
      ) {
        const bestMatch = (this.rootNode! as Alternatives).bestMatch;
        if (bestMatch instanceof IdentifierNode) {
          text = `<method>${this.text}</method>`;
        } else {
          text = (bestMatch as InstanceProcRef).renderAsHtml();
        }
      } else {
        text = super.textAsHtml();
      }
    }
    return text;
  }

  isEndMarker(key: string) {
    return key === "(";
  }
}

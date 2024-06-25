import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { AbstractField } from "./abstract-field";
import { ParseStatus } from "../status-enums";
import { Scope } from "../interfaces/scope";
import { ElanSymbol } from "../interfaces/symbol";
import { isIdOrProcedure, matchingSymbols } from "../symbols/symbol-helpers";

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

  matchingSymbolsForId(scope: Scope): ElanSymbol[] {
    const id = this.rootNode?.matchedText;

    if (id === undefined || id === "") {
      return [];
    }

    return matchingSymbols(id, scope);
  }

  public textAsHtml(): string {
    let text: string;
    if (this.selected) {
      const matchedSymbols = this.matchingSymbolsForId(this.getHolder());
      const filteredSymbolIds = matchedSymbols
        .filter((s) => isIdOrProcedure(s))
        .map((s) => s.symbolId);
      const popupAsHtml = this.popupAsHtml(filteredSymbolIds);
      text = super.textAsHtml() + popupAsHtml;
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

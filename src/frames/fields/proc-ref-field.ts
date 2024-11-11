import { CodeSource } from "../code-source";
import { TokenType } from "../helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../status-enums";
import {
  filteredSymbols,
  filterForTokenType,
  isIdOrProcedure,
  isProcedure,
  removeIfSingleFullMatch,
} from "../symbols/symbol-helpers";
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

  matchingSymbolsForId(): [string, ElanSymbol[]] {
    const id = this.rootNode?.matchedText ?? "";
    const [match, symbols] = filteredSymbols(
      id,
      transforms(),
      (s) => isIdOrProcedure(s, transforms()),
      this.getHolder(),
    );

    return [match, removeIfSingleFullMatch(symbols, match)];
  }

  matchingSymbolsForIdNew(id: string, tokenType: TokenType): [string, ElanSymbol[]] {
    const [match, symbols] = filteredSymbols(
      id,
      transforms(),
      filterForTokenType(tokenType),
      this.getHolder(),
    );

    return [match, removeIfSingleFullMatch(symbols, match)];
  }

  protected override getId(s: ElanSymbol) {
    if (isProcedure(s, transforms())) {
      return s.symbolId;
    }
    return s.symbolId + ".";
  }

  private nonAutoTextAsHtml() {
    let text: string;
    if (this.isSelected()) {
      text = this.fieldAsInput();
    } else if (this.readParseStatus() === ParseStatus.valid) {
      const bestMatch = (this.rootNode! as Alternatives).bestMatch;
      if (bestMatch instanceof IdentifierNode) {
        text = `<method>${this.text}</method>`;
      } else {
        text = (bestMatch as InstanceProcRef).renderAsHtml();
      }
    } else {
      text = super.textAsHtml();
    }
    return text;
  }

  public textAsHtml(): string {
    let text: string;
    const [id, tokenType] = this.getToMatchAndTokenType();
    if (this.showAutoCompleteNew(tokenType)) {
      [this.autocompleteMatch, this.autocompleteSymbols] = this.matchingSymbolsForIdNew(
        id,
        tokenType,
      );
      const popupAsHtml = this.popupAsHtml();
      text = popupAsHtml + this.nonAutoTextAsHtml();
    } else {
      text = this.nonAutoTextAsHtml();
    }
    return text;
  }

  isEndMarker(key: string) {
    return key === "(";
  }
}

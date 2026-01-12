import { propertyKeyword } from "../../../compiler/keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { COLON, UNDERSCORE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { IdentifierNode } from "./identifier-node";
import { assignableIds, noTokenTypes } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { File } from "../frame-interfaces/file";

export class DeconstructedList extends AbstractSequence {
  head: Alternatives | undefined;
  tail: Alternatives | undefined;
  readonly: boolean;

  constructor(file: File, readOnly = false) {
    super(file);
    this.readonly = readOnly;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const head = () => new IdentifierNode(this.file);
      const discard = () => new PunctuationNode(this.file, UNDERSCORE);
      this.head = new Alternatives(this.file, [head, discard]);
      this.addElement(this.head);
      this.addElement(new PunctuationNode(this.file, COLON));
      const tail = () => new IdentifierNode(this.file);
      this.tail = new Alternatives(this.file, [tail, discard]);
      this.addElement(this.tail);
      super.parseText(text);
    }
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.readonly) {
      return noTokenTypes;
    } else if (this.getElements().length === 0) {
      return new Set<TokenType>(assignableIds);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    let kw = new Set<KeywordCompletion>();
    if (!this.readonly) {
      if (this.getElements().length === 0) {
        kw = new Set<KeywordCompletion>([KeywordCompletion.create(propertyKeyword, false, true)]);
      } else {
        kw = super.symbolCompletion_keywords();
      }
    }
    return kw;
  }
}

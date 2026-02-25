import { File } from "../frame-interfaces/file";
import { ParseNode } from "../frame-interfaces/parse-node";
import { TokenType } from "../symbol-completion-helpers";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { IdentifierUse } from "./identifier-use";
import { MethodCallNode } from "./method-call-node";
import { PunctuationNode } from "./punctuation-node";

export class DottedTerm extends AbstractSequence {
  term: ParseNode;
  tokenTypes = new Set([TokenType.id_property, TokenType.method_function, TokenType.method_system]);

  constructor(file: File) {
    super(file);
    const prop = () => new IdentifierUse(file, new Set([TokenType.id_property]));
    const method = () => new MethodCallNode(file);
    this.term = new Alternatives(this.file, [prop, method], this.tokenTypes);
  }
  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, DOT));
      this.addElement(this.term);
      super.parseText(text);
    }
  }
}

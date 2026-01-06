import { Index } from ".";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { OptionalNode } from "./optional-node";
import { TermSimple } from "./term-simple";
import { File } from "../frame-interfaces/file";

export class TermSimpleWithOptIndex extends AbstractSequence {
  termSimple: TermSimple | undefined;
  optIndex: OptionalNode | undefined;
  defaultTokenTypes = new Set([
    TokenType.id_constant,
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
    TokenType.id_enumValue,
    TokenType.method_function,
    TokenType.method_system,
  ]);

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.termSimple = new TermSimple(this.file);
      this.addElement(this.termSimple);
      this.optIndex = new OptionalNode(this.file, new Index(this.file));
      this.addElement(this.optIndex);
      super.parseText(text);
    }
  }
}

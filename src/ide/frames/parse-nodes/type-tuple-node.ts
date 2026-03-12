import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";

export class TypeTupleNode extends AbstractSequence {
  types: CSV | undefined;
  tupleTypeName: string = "";

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.file.language().addNodesForTypeTuple(this);
      super.parseText(text);
    }
  }

  /*   parseText(text: string): void {
    if (text.length > 0) {
      if (!this.file.language().parseText(this, text)) {
        this.types = new CSV(
          this.file,
          () =>
            new TypeNode(
              this.file,
              new Set<TokenType>([
                TokenType.type_concrete,
                TokenType.type_abstract,
                TokenType.type_notInheritable,
              ]),
            ),
          2,
        );
        this.addElement(new PunctuationNode(this.file, OPEN_BRACKET));
        this.addElement(this.types);
        this.addElement(new PunctuationNode(this.file, CLOSE_BRACKET));
      }
      super.parseText(text);
    }
  } */

  renderAsHtml() {
    return this.delegateHtmlToLanguage();
  }

  override renderAsExport(): string {
    return super.renderAsExport(); //TEMP - for debugging
  }
}

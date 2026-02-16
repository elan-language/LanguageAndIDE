import { asKeyword } from "../../../compiler/keywords";
import { File } from "../frame-interfaces/file";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class ParamDefNode extends AbstractSequence {
  name: IdentifierNode | undefined;
  type: TypeNode | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "<i>name</i> as <i>Type</i>";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      if (!this.file.language().parseText(this, text)) {
        this.name = new IdentifierNode(this.file);
        this.addElement(this.name);
        this.addElement(new SpaceNode(this.file, Space.required));
        this.addElement(new KeywordNode(this.file, asKeyword));
        this.addElement(new SpaceNode(this.file, Space.required));
        this.type = new TypeNode(
          this.file,
          new Set<TokenType>([
            TokenType.type_concrete,
            TokenType.type_abstract,
            TokenType.type_notInheritable,
          ]),
        );
        this.addElement(this.type);
      }
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([])
      : super.symbolCompletion_keywords();
  }

  override renderAsExport(): string {
    return this.file.language().renderNodeAsExport(this);
  }
}

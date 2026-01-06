import { asKeyword, outKeyword } from "../../../compiler/keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";
import { File } from "../frame-interfaces/file";

export class ParamDefNode extends AbstractSequence {
  name: IdentifierNode | undefined;
  type: TypeNode | undefined;
  out: OptionalNode | undefined;
  outPermitted: boolean;

  constructor(file: File, outPermitted: boolean) {
    super(file);
    this.outPermitted = outPermitted;
    this.completionWhenEmpty = "<i>name</i> as <i>Type</i>";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      const outSpace = new Sequence(this.file, [
        () => new KeywordNode(this.file, outKeyword),
        () => new SpaceNode(this.file, Space.required),
      ]);
      if (this.outPermitted) {
        this.out = new OptionalNode(this.file, outSpace);
        this.addElement(this.out);
      }
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
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? this.outPermitted
        ? new Set<KeywordCompletion>([KeywordCompletion.create(outKeyword)])
        : new Set<KeywordCompletion>([])
      : super.symbolCompletion_keywords();
  }

  //TODO: for Python
  /*   renderAsHtml(): string {
    return this.name?.renderAsHtml() + ": " + this.type?.renderAsHtml();
  } */
}

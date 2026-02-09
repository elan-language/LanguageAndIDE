import { copyKeyword } from "../../../compiler/keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierOrThis } from "./identiferOrThis";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { WithClause } from "./with-clause";
import { File } from "../frame-interfaces/file";

export class CopyWith extends AbstractSequence {
  original: IdentifierOrThis;
  withClause: WithClause | undefined;
  tokenTypes = new Set([
    TokenType.id_let,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
  ]);

  constructor(file: File) {
    super(file);
    this.original = new IdentifierOrThis(file);
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(this.file, copyKeyword));
      this.addElement(new SpaceNode(this.file, Space.required));
      this.addElement(this.original);
      this.withClause = new WithClause(this.file, () => this.original!.matchedText);
      this.addElement(this.withClause);
      return super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(copyKeyword)])
      : super.symbolCompletion_keywords();
  }

  override renderAsHtml(): string {
    return (
      this.original.renderAsHtml() +
      `<el-comment> # TODO: ${this.withClause?.renderAsElanSource()}</el-comment>`
    );
  }
}

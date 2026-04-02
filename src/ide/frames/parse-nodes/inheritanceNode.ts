import { inheritsKeyword } from "../../../compiler/elan-keywords";
import { ClassSubType } from "../../../compiler/symbols/class-type";
import { getClassType } from "../../../compiler/symbols/symbol-helpers";
import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class InheritanceNode extends AbstractSequence {
  typeList: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      const isElan = this.file.language().languageFullName === "Elan";
      if (isElan) {
        this.addElement(new KeywordNode(this.file, inheritsKeyword));
        this.addElement(new SpaceNode(this.file, Space.required));
      }
      this.typeList = new CSV(
        this.file,
        () => new TypeNode(this.file, new Set<TokenType>([TokenType.type_abstract])),
        1,
      );
      this.typeList.setSyntaxCompletionWhenEmpty("Type(s) - comma-separated");
      this.addElement(this.typeList);
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(inheritsKeyword)])
      : super.symbolCompletion_keywords();
  }

  override renderAsHtml(): string {
    return this.isValid() ? this.file.language().inheritanceAsHtml(this) : this.matchedText;
  }

  override renderAsExport(): string {
    return this.isValid() ? removeHtmlTagsAndEscChars(this.renderAsHtml()) : this.matchedText;
  }

  override renderAsElanSource(): string {
    return this.isValid()
      ? `${inheritsKeyword} ${this.typeList?.renderAsElanSource()}`
      : this.matchedText;
  }

  getAllTypeNames(): string[] {
    return this.matchedText.split(", ");
  }

  firstTypeIsAbstract(): boolean {
    const firstType = this.getAllTypeNames()[0];
    const rootNode = this.file.getAst(true)!;
    return getClassType(firstType, rootNode) === ClassSubType.abstract;
  }
}

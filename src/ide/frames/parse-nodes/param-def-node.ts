import { asKeyword } from "../../../compiler/elan-keywords";
import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierDef } from "./identifier-def";
import { TypeNode } from "./type-node";

export class ParamDefNode extends AbstractSequence {
  name: IdentifierDef | undefined;
  type: TypeNode | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "<i>name</i> as <i>Type</i>";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.file.language().addNodesForParamDef(this);
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([])
      : super.symbolCompletion_keywords();
  }

  renderAsHtml(): string {
    return this.isValid() ? this.file.language().paramDefAsHtml(this) : this.matchedText;
  }

  renderAsElanSource() {
    return this.isValid()
      ? `${this.name?.renderAsElanSource()} ${asKeyword} ${this.type?.renderAsElanSource()}`
      : this.matchedText;
  }

  override renderAsExport(): string {
    const lang = this.file.language();
    return this.isValid() ? removeHtmlTagsAndEscChars(lang.paramDefAsHtml(this)) : this.matchedText;
  }
}

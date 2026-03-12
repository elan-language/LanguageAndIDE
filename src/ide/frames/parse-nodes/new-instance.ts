import { newKeyword } from "../../../compiler/elan-keywords";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { ArgListNode } from "./arg-list-node";
import { TypeSimpleOrGeneric } from "./type-simple-or-generic";

export class NewInstance extends AbstractSequence {
  type: TypeSimpleOrGeneric | undefined;
  args: ArgListNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.file.language().addNodesForNewInstance(this);
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(newKeyword)])
      : super.symbolCompletion_keywords();
  }

  renderAsHtml() {
    return this.delegateHtmlToLanguage();
  }
}

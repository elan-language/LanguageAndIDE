import { globalKeyword, libraryKeyword, thisKeyword } from "../../../compiler/elan-keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { MethodNameUse } from "./method-name-use";
import { PunctuationNode } from "./punctuation-node";
import { ThisInstance } from "./this-instance";

export class ThisProcRef extends AbstractSequence {
  thisInstance: ThisInstance | undefined;
  procName: MethodNameUse | undefined;
  tokenTypes = new Set([
    TokenType.id_let,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
    TokenType.method_procedure,
  ]);

  parseText(text: string): void {
    if (text.length > 0) {
      this.thisInstance = new ThisInstance(this.file);
      this.procName = new MethodNameUse(this.file);
      this.addElement(this.thisInstance);
      this.addElement(new PunctuationNode(this.file, DOT));
      this.addElement(this.procName!);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    return this.isValid()
      ? `${this.thisInstance!.renderAsHtml()}.<el-method>${this.procName?.renderAsHtml()}</el-method>`
      : this.matchedText;
  }

  renderAsElanSource(): string {
    return this.isValid()
      ? `${thisKeyword}.${this.procName?.renderAsElanSource()}`
      : this.matchedText;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(this.tokenTypes);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    const thisInstance = this.file.language().THIS_INSTANCE;
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([
          KeywordCompletion.create(globalKeyword, false, true),
          KeywordCompletion.create(libraryKeyword, false, true),
          KeywordCompletion.create(thisInstance, false, true),
        ])
      : super.symbolCompletion_keywords();
  }
}

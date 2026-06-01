import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { DotAfter } from "./dot-after";
import { InstanceNode } from "./instanceNode";
import { MethodNameUse } from "./method-name-use";

export class InstanceProcRef extends AbstractSequence {
  prefix: DotAfter | undefined;
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
      const instance = new InstanceNode(this.file);
      this.prefix = new DotAfter(this.file, instance);
      this.procName = new MethodNameUse(
        this.file,
        new Set([TokenType.method_procedure]),
        () => instance.matchedText,
      );
      this.addElement(this.prefix);
      this.addElement(this.procName!);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    return this.isValid()
      ? `${this.prefix!.renderAsHtml()}<el-method>${this.procName?.renderAsHtml()}</el-method>`
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
      ? new Set<KeywordCompletion>([KeywordCompletion.create(thisInstance, false, true)])
      : super.symbolCompletion_keywords();
  }
}

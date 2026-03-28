import { globalKeyword, libraryKeyword } from "../../../compiler/elan-keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotAfter } from "./dot-after";
import { InstanceNode } from "./instanceNode";
import { MethodNameUse } from "./method-name-use";
import { NamespaceNode } from "./namespace-node";
import { PropertyRef } from "./property-ref";

export class InstanceProcRef extends AbstractSequence {
  prefix: Alternatives | undefined;
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
      const qualifierDot = () => new DotAfter(this.file, new NamespaceNode(this.file));
      const instance = new InstanceNode(this.file);
      const instanceDot = () => new DotAfter(this.file, instance);
      const propertyRef = () => new DotAfter(this.file, new PropertyRef(this.file));
      this.prefix = new Alternatives(this.file, [propertyRef, qualifierDot, instanceDot]);
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
      ? `${this.prefix!.bestMatch!.renderAsHtml()}<el-method>${this.procName?.renderAsHtml()}</el-method>`
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

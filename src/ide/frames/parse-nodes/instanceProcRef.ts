import { globalKeyword, libraryKeyword, propertyKeyword } from "../keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotAfter } from "./dot-after";
import { IdentifierNode } from "./identifier-node";
import { InstanceNode } from "./instanceNode";
import { MethodNameNode } from "./method-name-node";
import { PropertyRef } from "./property-ref";
import { Qualifier } from "./qualifier";

export class InstanceProcRef extends AbstractSequence {
  prefix: Alternatives | undefined;
  procName: IdentifierNode | undefined;
  tokenTypes = new Set([
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
    TokenType.method_procedure,
  ]);

  parseText(text: string): void {
    if (text.length > 0) {
      const qualifierDot = () => new DotAfter(new Qualifier());
      const instance = new InstanceNode();
      const instanceDot = () => new DotAfter(instance);
      const propertyRef = () => new DotAfter(new PropertyRef());
      this.prefix = new Alternatives([propertyRef, qualifierDot, instanceDot]);
      this.procName = new MethodNameNode(
        new Set([TokenType.method_procedure]),
        () => instance.matchedText,
      );
      this.addElement(this.prefix);
      this.addElement(this.procName!);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    return `${this.prefix!.bestMatch!.renderAsHtml()}<el-method>${this.procName?.renderAsHtml()}</el-method>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(this.tokenTypes);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([
          KeywordCompletion.create(globalKeyword, false, true),
          KeywordCompletion.create(libraryKeyword, false, true),
          KeywordCompletion.create(propertyKeyword, false, true),
        ])
      : super.symbolCompletion_keywords();
  }
}

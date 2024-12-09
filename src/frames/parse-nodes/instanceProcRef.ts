import { libraryKeyword, propertyKeyword } from "../keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotAfter } from "./dot-after";
import { IdentifierNode } from "./identifier-node";
import { InstanceNode } from "./instanceNode";
import { OptionalNode } from "./optional-node";
import { allIds } from "./parse-node-helpers";
import { Qualifier } from "./qualifier";

export class InstanceProcRef extends AbstractSequence {
  prefix: OptionalNode | undefined;
  procName: IdentifierNode | undefined;
  tokenTypes = new Set([TokenType.method_procedure]);

  constructor() {
    super();
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const qualifier = () => new DotAfter(new Qualifier());
      const instance = new InstanceNode();
      const instanceDot = () => new DotAfter(instance);
      this.prefix = new OptionalNode(new Alternatives([qualifier, instanceDot]));
      this.procName = new IdentifierNode(this.tokenTypes, () => instance.matchedText);
      this.addElement(this.prefix);
      this.addElement(this.procName!);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    return `${this.prefix!.matchedNode ? this.prefix?.matchedNode.renderAsHtml() : ""}<el-method>${this.procName?.renderAsHtml()}</el-method>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(allIds);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([
          KeywordCompletion.create(libraryKeyword),
          KeywordCompletion.create(propertyKeyword),
        ])
      : super.symbolCompletion_keywords();
  }
}

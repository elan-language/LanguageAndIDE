import { toKeyword } from "../keywords";
import { ParseStatus } from "../status-enums";
import { SymbolCompletionSpec_Old, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class ToClause extends AbstractSequence {
  property: IdentifierNode | undefined;
  expr: ExprNode | undefined;
  private constraintId: () => string;

  constructor(constraintId: () => string) {
    super();
    this.constraintId = constraintId;
    this.completionWhenEmpty = "<i>name</i> to <i>expression</i>";
  }

  parseText(text: string): void {
    this.property = new IdentifierNode(
      new Set<TokenType>([TokenType.id_property]),
      this.constraintId,
    );
    const sp0 = new SpaceNode(Space.required);
    const to = new KeywordNode(toKeyword);
    const sp1 = new SpaceNode(Space.required);
    this.expr = new ExprNode();
    this.addElement(this.property);
    this.addElement(sp0);
    this.addElement(to);
    this.addElement(sp1);
    this.addElement(this.expr);
    return super.parseText(text);
  }
  compile(): string {
    const codeArray = this.getElements().map((e) => e.compile());
    const code = codeArray.join(" ");

    return code;
  }

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    const elems = this.getElements();
    if (elems[3].status === ParseStatus.valid) {
      return elems[4].symbolCompletion_getSpec_Old();
    }

    if (elems[1].status !== ParseStatus.valid) {
      return new SymbolCompletionSpec_Old(
        elems[0].matchedText,
        new Set<TokenType>([TokenType.id_property]),
      );
    }

    return new SymbolCompletionSpec_Old("", new Set<TokenType>([TokenType.none]));
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>([TokenType.id_property]);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }
}

import {
  copyKeyword,
  emptyKeyword,
  ifKeyword,
  lambdaKeyword,
  newKeyword,
  notKeyword,
  refKeyword,
  thisKeyword,
} from "../keywords";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { CopyWith } from "./copy-with";
import { EmptyOfTypeNode } from "./empty-of-type-node";
import { IfExpr } from "./if-expr";
import { Lambda } from "./lambda";
import { NewInstance } from "./new-instance";
import { ParseNode } from "./parse-node";
import { Term } from "./term";

export class ExprNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    //evaluate options that start with a keyword, first
    if (text.trim().length > 0) {
      this.alternatives.push(new NewInstance());
      this.alternatives.push(new CopyWith());
      this.alternatives.push(new IfExpr());
      this.alternatives.push(new Lambda());
      this.alternatives.push(new EmptyOfTypeNode());
      //then others
      this.alternatives.push(new Term());
      this.alternatives.push(new BinaryExpression());
      super.parseText(text);
    }
  }

  override getActiveNode(): ParseNode {
    const best = this.bestMatch;
    if (this.bestMatchIsOnlyMatch() || best instanceof Term) {
      return best!.getActiveNode(); //Because any symbol completion is valid for BinaryExpression also
    } else {
      return this as ParseNode;
    }
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return new Set([
      TokenType.id_constant,
      TokenType.id_let,
      TokenType.id_parameter_out,
      TokenType.id_parameter_regular,
      TokenType.id_property,
      TokenType.id_variable,
      TokenType.id_enumValue,
      TokenType.method_function,
      TokenType.method_system,
    ]);
  }

  override symbolCompletion_keywords(): Set<string> {
    return new Set([
      newKeyword,
      copyKeyword,
      ifKeyword,
      lambdaKeyword,
      emptyKeyword,
      thisKeyword,
      refKeyword,
      notKeyword
    ]);
  }
}

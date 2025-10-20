import {
  copyKeyword,
  emptyKeyword,
  ifKeyword,
  imageKeyword,
  lambdaKeyword,
  newKeyword,
  notKeyword,
  refKeyword,
  thisKeyword,
  tupleKeyword,
} from "../../../compiler/keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { ExprNode } from "./expr-node";
import { YieldExprNode } from "./yield-expr-node";

export class YieldOrExprNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "<i>value or expression</i>";
  }

  parseText(text: string): void {
    //evaluate options that start with a keyword, first O
    if (text.trim().length > 0) {
      this.alternatives.push(new YieldExprNode());
      this.alternatives.push(new ExprNode());
      super.parseText(text);
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
      TokenType.type_enum,
    ]);
  }

  override symbolCompletion_keywords(): Set<KeywordCompletion> {
    let kws = [
      newKeyword,
      copyKeyword,
      ifKeyword,
      imageKeyword,
      lambdaKeyword,
      emptyKeyword,
      thisKeyword,
      refKeyword,
      notKeyword,
    ].map((kw) => KeywordCompletion.create(kw));
    kws.push(KeywordCompletion.create(tupleKeyword, false, false, true));
    const trim = this.matchedText.trim();
    if (trim.length > 0) {
      kws = kws.filter((kw) => kw.keyword.startsWith(trim));
    }
    return new Set(kws);
  }
}

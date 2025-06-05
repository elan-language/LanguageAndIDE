import { ParseNode } from "../interfaces/parse-node";
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
} from "../keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { CopyWith } from "./copy-with";
import { EmptyOfTypeNode } from "./empty-of-type-node";
import { IfExpr } from "./if-expr";
import { ImageNode } from "./image-node";
import { Lambda } from "./lambda";
import { NewInstance } from "./new-instance";
import { Term } from "./term";
import { TupleNode } from "./tuple-node";

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
      this.alternatives.push(new TupleNode());
      this.alternatives.push(new ImageNode());
      //then others
      this.alternatives.push(new Term());
      this.alternatives.push(new BinaryExpression());
      super.parseText(text);
    }
  }

  override getActiveNode(): ParseNode {
    let active = this as ParseNode;
    const best = this.bestMatch;
    if (
      this.bestMatchIsOnlyMatch() ||
      (best instanceof Term &&
        this.potentialMatches().length === 2 &&
        this.potentialMatches()[1] instanceof BinaryExpression)
    ) {
      active = best!.getActiveNode(); //Because any symbol completion is valid for BinaryExpression also
    }
    return active;
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

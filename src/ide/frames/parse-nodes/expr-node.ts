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
import { ParseNode } from "../frame-interfaces/parse-node";
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
    this.completionWhenEmpty = "<i>value or expression</i>";
  }

  parseText(text: string): void {
    const t = text.trim();
    if (t.length > 0) {
      if (t.startsWith(newKeyword + " ")) {
        this.alternatives.push(new NewInstance());
      } else if (t.startsWith(copyKeyword + " ")) {
        this.alternatives.push(new CopyWith());
      } else if (t.startsWith(ifKeyword + " ")) {
        this.alternatives.push(new IfExpr());
      } else if (t.startsWith(lambdaKeyword + " ")) {
        this.alternatives.push(new Lambda());
      } else if (t.startsWith(emptyKeyword + " ")) {
        this.alternatives.push(new EmptyOfTypeNode());
      } else if (t.startsWith(tupleKeyword + " ")) {
        this.alternatives.push(new TupleNode());
      } else if (t.startsWith(imageKeyword + " ")) {
        this.alternatives.push(new ImageNode());
      } else {
        const c = t[0];
        if (c === "n") {
          this.alternatives.push(new NewInstance());
        } else if (c === "c") {
          this.alternatives.push(new CopyWith());
        } else if (c === "i") {
          this.alternatives.push(new IfExpr());
          this.alternatives.push(new ImageNode());
        } else if (c === "l") {
          this.alternatives.push(new Lambda());
        } else if (c === "e") {
          this.alternatives.push(new EmptyOfTypeNode());
        } else if (c === "t") {
          this.alternatives.push(new TupleNode());
        }
        this.alternatives.push(new Term());
        this.alternatives.push(new BinaryExpression());
      }
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

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
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class YieldExprNode extends AbstractSequence {
  expr: ExprNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "<i>value or expression</i>";
  }

  parseText(text: string): void {
    //evaluate options that start with a keyword, first
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode("yield"));
      this.addElement(new SpaceNode(Space.required));
      this.expr = new ExprNode();
      this.addElement(this.expr);
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

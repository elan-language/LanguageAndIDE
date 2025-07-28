import { setKeyword, toKeyword } from "../../../compiler/keywords";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class SetToClause extends AbstractSequence {
  property: IdentifierNode | undefined;
  expr: ExprNode | undefined;
  private context: () => string;

  constructor(context: () => string) {
    super();
    this.context = context;
    this.completionWhenEmpty = "<i>name</i> set to <i>expression</i>";
  }

  parseText(text: string): void {
    this.property = new IdentifierNode(new Set<TokenType>([TokenType.id_property]), this.context);
    const sp0 = new SpaceNode(Space.required);
    const set = new KeywordNode(setKeyword);
    const sp1 = new SpaceNode(Space.required);
    const to = new KeywordNode(toKeyword);
    const sp2 = new SpaceNode(Space.required);
    this.expr = new ExprNode();
    this.addElement(this.property);
    this.addElement(sp0);
    this.addElement(set);
    this.addElement(sp1);
    this.addElement(to);
    this.addElement(sp2);
    this.addElement(this.expr);
    return super.parseText(text);
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>([TokenType.id_property]);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_context(): string {
    return this.context();
  }

  override renderAsHtml(): string {
    return `<br>${this.property?.renderAsHtml()}<el-kw> set to </el-kw>${this.expr?.renderAsHtml()}`;
  }
}

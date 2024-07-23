import { copyKeyword, setKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SetClause } from "./set-clause";
import { SpaceNode } from "./space-node";
import { VarRefNode } from "./var-ref-node";

export class CopyExpr extends AbstractSequence {
  varRef: VarRefNode | undefined;
  props: CSV | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(copyKeyword));
      this.varRef = new VarRefNode();
      this.addElement(this.varRef);
      this.addElement(new KeywordNode(setKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.props = new CSV(() => new SetClause(), 1);
      this.addElement(this.props);
      return super.parseText(text);
    }
  }
}

import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { ParseNode } from "./parse-node";

export class ArgListNode extends CSV {
  context: () => string ;

  constructor(context: () => string ) {
    super(() => new ExprNode(), 0);
    this.context = context;
    this.setSyntaxCompletionWhenEmpty("<i>arguments</i>");
  }

  override getActiveNode(): ParseNode {
    return this.matchedText.length === 0 ? this : super.getActiveNode();
  }

 override getSyntaxCompletionAsHtml(): string {
    if (this.matchedText.length === 0) {
      // the list argument names and types 
      // Can use 'this.context()' to get name of function or Type (in a constructor call)
      // If there are any params, this should set this.status to ParseStatus.Incomplete
      return "<i>arguments</i>"; // TODO replace by the list of param names & types 
    } else {
      return  ""; //Since any syntax completion will by then be handled by active (sub) node
    }
  }
}

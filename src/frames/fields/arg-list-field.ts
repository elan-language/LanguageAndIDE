import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { CSV } from "../parse-nodes/csv";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class ArgListField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>arguments<i>");
    this.setOptional(true);
    this.help = `list of zero or more arguments, comma separated. Each argument may be a literal value, variable, or simple expression.`;
  }
  getIdPrefix(): string {
    return "args";
  }
  public contentAsSource(): string {
    if (this.text) {
      return this.text;
    } else {
      return "";
    }
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new CSV(() => new ExprNode(), 0);
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToNonMatchingCloseBracket();

  isEndMarker(key: string) {
    return this.text === "" && key === ")";
  }
}

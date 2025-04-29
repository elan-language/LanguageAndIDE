import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { ConstantLiteralNode } from "../parse-nodes/constant-literal-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ConstantValueField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>literal</i>");
    this.help = `A literal value (such as a number or string), or a literal List or Dictionary (consult documentation for format).`;
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new ConstantLiteralNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

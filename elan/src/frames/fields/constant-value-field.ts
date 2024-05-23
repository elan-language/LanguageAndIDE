import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ConstantLiteralNode } from "../parse-nodes/constant-literal-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class ConstantValueField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("literal");
    this.help = `A literal value (such as a number or string), or a literal ImmutableList or Dictionary (consult documentation for format).`;
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new ConstantLiteralNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();
}

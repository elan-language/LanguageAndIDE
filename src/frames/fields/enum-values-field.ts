import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { EnumValuesNode } from "../parse-nodes/enum-values-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class EnumValuesField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>values</i>");
  }

  helpId(): string {
    return "EnumValuesField";
  }

  getIdPrefix(): string {
    return "enumVals";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new EnumValuesNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

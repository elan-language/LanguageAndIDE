import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { StepNode } from "../parse-nodes/step-node";
import { AbstractField } from "./abstract-field";

export class StepField extends AbstractField {
  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>literal integer</i>");
    this.setFieldToKnownValidText("1");
  }

  helpId(): string {
    return "StepField";
  }

  getIdPrefix(): string {
    return "expr";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new StepNode(this.getFile());
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/\r?\n/);
}

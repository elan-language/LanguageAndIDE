import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { MethodNameNode } from "../parse-nodes/method-name-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class MethodNameField extends AbstractField {
  isParseByNodes: boolean = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>name</i>");
    this.help = `A variable name must start with a lower-case letter, optionally followed by any letters (lower or upper case), and/or numeric digits, and/or underscores - nothing else.`;
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new MethodNameNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/[^a-zA-Z0-9_]/);

  getIdPrefix(): string {
    return "ident";
  }
  isEndMarker(key: string) {
    return key === " " || key === "(";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

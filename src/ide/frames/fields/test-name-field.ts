import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { TestName } from "../parse-nodes/testName";
import { AbstractField } from "./abstract-field";

export class TestNameField extends AbstractField {
  isParseByNodes: boolean = true;

  constructor(holder: Frame) {
    super(holder);
    this._placeholder = "test_name";
  }

  helpId(): string {
    return "IdentifierField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new TestName(this.getFile());
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
    return this.symbolCompletionAsHtml();
  }
}

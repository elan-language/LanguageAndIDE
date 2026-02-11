import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ConstantValueNode } from "../parse-nodes/constant-value-node";
import { AbstractField } from "./abstract-field";
import { isSymbol } from "../../../compiler/symbols/symbol-helpers";

export class ConstantValueField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>literal</i>");
  }

  helpId(): string {
    return "ConstantValueField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new ConstantValueNode(this.getFile());
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }

  getElanType() {
    const scope = this.getFile().getAst(false)?.getScopeById(this.getHolder().getHtmlId());
    if (isSymbol(scope)) {
      return scope.symbolType().name;
    }
    return "";
  }
}

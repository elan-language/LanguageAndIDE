import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ParamListNode } from "../parse-nodes/param-list-node";
import { AbstractField } from "./abstract-field";

export class ParamListField extends AbstractField {
  isParseByNodes = true;
  outPermitted: boolean;

  constructor(holder: Frame, outPermitted: boolean) {
    super(holder);
    this.outPermitted = outPermitted;
    this.setPlaceholder("<i>parameter definitions</i>");
    this.useHtmlTags = true;
    this.setOptional(true);
  }

  helpId(): string {
    return "ParamListField";
  }

  getIdPrefix(): string {
    return "params";
  }
  public contentAsSource(): string {
    if (this.text) {
      return this.text;
    } else {
      return "";
    }
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new ParamListNode(this.getFile(), this.outPermitted);
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToNonMatchingCloseBracket();

  isEndMarker(key: string) {
    return this.text === "" && key === ")";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

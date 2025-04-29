import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { ParseNode } from "../parse-nodes/parse-node";
import { ProcRefNode } from "../parse-nodes/proc-ref-node";
import { ParseStatus } from "../status-enums";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ProcRefField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>procedureName</i>");
    this.help = `The name of the procedure to be called (starting lower-case). Alternatively, a 'dotted-call':  the name of a variable or property, followed by a ''' and the name of the procedure method to call on that 'instance'.`;
  }
  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new ProcRefNode();
    this.rootNode.setSyntaxCompletionWhenEmpty(this.placeholder); //Need to test proc first, otherwise valid proc would be treated as instance part of an incomplete qualProc
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) => source.readUntil(/\(/);

  public textAsHtml(): string {
    let text: string;
    if (this.isSelected()) {
      text = this.fieldAsInput() + this.symbolCompletion();
    } else if (this.readParseStatus() === ParseStatus.valid) {
      const bestMatch = (this.rootNode! as Alternatives).bestMatch;
      if (bestMatch instanceof IdentifierNode) {
        text = `<el-method>${this.text}</el-method>`;
      } else {
        text = (bestMatch as InstanceProcRef).renderAsHtml();
      }
    } else {
      text = super.textAsHtml();
    }
    return text;
  }

  isEndMarker(key: string) {
    return key === "(";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

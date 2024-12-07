import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { ParseNode } from "../parse-nodes/parse-node";
import { ProcCallNode } from "../parse-nodes/proc-call-node";
import { ProcRefNode } from "../parse-nodes/proc-ref-node";
import { ParseStatus } from "../status-enums";
import { TokenType } from "../symbol-completion-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ProcCallField extends AbstractField {
  tokenTypes = [
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
  ];
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>procedureCall</i>");
  }
  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new ProcCallNode();

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

import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { MethodCallNode } from "../parse-nodes/method-call-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { AbstractField } from "./abstract-field";

export class AssertActualField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.placeholder = "result";
    this.help = `May be a function call, or a variable defined in a prior statement.`;
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    const variableRef = () => new VarRefNode();
    const functionCall = () => new MethodCallNode();
    this.rootNode = new Alternatives([variableRef, functionCall]);
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/\sis\s/);
}

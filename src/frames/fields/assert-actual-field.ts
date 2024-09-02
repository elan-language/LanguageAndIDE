import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { ParseNode } from "../parse-nodes/parse-node";
import { TermChained } from "../parse-nodes/term-chained";
import { TermSimple } from "../parse-nodes/term-simple";
import { AbstractField } from "./abstract-field";

export class AssertActualField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.placeholder = "result";
    this.help = `May be a function call, or a variable defined in a prior statement.`;
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    const variableRef = () => new TermSimple();
    const functionCall = () => new TermChained();
    this.rootNode = new Alternatives([variableRef, functionCall]);
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/\sis\s/);
}

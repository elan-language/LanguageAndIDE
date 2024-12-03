import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { ParseNode } from "../parse-nodes/parse-node";
import { TermChained } from "../parse-nodes/term-chained";
import { TermSimple } from "../parse-nodes/term-simple";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class AssertActualField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    const termSimple = () => new TermSimple();
    const termChained = () => new TermChained();
    this.rootNode = new Alternatives([termSimple, termChained]);
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/\sis\s/);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

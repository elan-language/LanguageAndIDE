import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { LiteralNode } from "../parse-nodes/literal-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { AbstractField } from "./abstract-field";

export class ValueRefField extends AbstractField {
  isParseByNodes = true;
  readUntil: RegExp;

  constructor(holder: Frame, readUntil: RegExp) {
    super(holder);
    this.readUntil = readUntil;
    this.setPlaceholder("value");
    this.help = `Enter either a literal value or the name of a variable (followed, optionally for some data structure types, by an index in square brackets).'
`;
  }
  getIdPrefix(): string {
    return "expr";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    const literal = () => new LiteralNode();
    const variableRef = () => new VarRefNode();
    this.rootNode = new Alternatives([literal, variableRef]); //literal before var so that true/false picked up as literals
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(this.readUntil);
}

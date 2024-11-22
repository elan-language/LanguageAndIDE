import { CodeSource } from "../code-source";
import { TokenType } from "../symbol-completion-helpers";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { LitString as LitStringNonEmpty } from "../parse-nodes/lit-string";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class ExceptionMessage extends AbstractField {
  tokenTypes: Set<TokenType> = new Set<TokenType>([
    TokenType.id_constant,
    TokenType.id_let,
    TokenType.id_variable,
  ]);
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("message");
    this.help = `message defined as a literal string (in quotes), or the name of a previously-defined variable or constant containing a string.`;
  }
  getIdPrefix(): string {
    return "msg";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new Alternatives([
      () => new LitStringNonEmpty(),
      () => new IdentifierNode(this.tokenTypes),
    ]);
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();
}

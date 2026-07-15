import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { TypeNode } from "../parse-nodes/type-node";
import { ParseStatus } from "../status-enums";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractField } from "./abstract-field";
import { parseType } from "../../compile-api/antlr4-parser.js";

export class TypeField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.useHtmlTags = true;
    this.setPlaceholder("<i>Type</i>");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any | undefined;

  helpId(): string {
    return "TypeField";
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_type`;
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new TypeNode(
      this.getFile(),
      new Set<TokenType>([
        TokenType.type_concrete,
        TokenType.type_abstract,
        TokenType.type_notInheritable,
      ]),
    );
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }

  override parseFrom(source: CodeSource): void {
    this.holder.hasBeenAddedTo();
    const text = this.readToDelimiter(source);
    //   const root = this.initialiseRoot();
    //   this.parseCompleteTextUsingNode(text, root);
    //   if (this.isOptional() && this._parseStatus === ParseStatus.empty) {
    //     this._parseStatus = ParseStatus.valid;
    //   } else if (this._parseStatus === ParseStatus.invalid) {
    //     throw new Error(`Parse error at ${source.getRemainingCode()}`);
    //   }

    const tree = parseType(text);

    if (tree.parser.syntaxErrorsCount > 0) {
      throw new Error(`Parse error at ${source.getRemainingCode()}`);
    } else {
      this.context = tree;
      this._parseStatus = ParseStatus.valid;
    }
  }
}

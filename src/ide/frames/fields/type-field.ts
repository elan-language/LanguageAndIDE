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

    const tree = parseType(text);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = (tree as any).getText();

    if (tree.parser.syntaxErrorsCount > 0) {
      throw new Error(`Parse error at ${text}`);
    } else if (parsed !== text.replaceAll(" ", "")) {
      const remaining = text.replace(parsed, "");
      throw new Error(`Parse error at ${remaining}`);
    } else {
      this.context = tree;
      this._parseStatus = ParseStatus.valid;
    }
  }
}

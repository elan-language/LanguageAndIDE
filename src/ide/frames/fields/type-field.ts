import { parseElan2Type, parsePythonType } from "../../compile-api/antlr4-parser.js";
import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ParseStatus } from "../status-enums";
import { AbstractField } from "./abstract-field";

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

  override setFieldToKnownValidText(text: string) {
    this.text = text;
    this.parseCompleteTextUsingNode(this.text, undefined);
    this._parseStatus = ParseStatus.valid;
  }

  override initialiseRoot(): ParseNode {
    return undefined as unknown as ParseNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }

  override renderAsHtml() {
    return super.renderAsHtml();
  }

  parseByLanguage(text: string) {
    if (this.language().languageFullName === "Python") {
      return parsePythonType(text);
    }
    return parseElan2Type(text);
  }

  override parseCompleteTextUsingNode(text: string, _root: ParseNode | undefined): void {
    if (text.length === 0) {
      this.setParseStatus(this.isOptional() ? ParseStatus.valid : ParseStatus.incomplete);
    } else {
      this.context = this.parseByLanguage(text);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsed = (this.context as any).getText();

      if (parsed !== text.replaceAll(" ", "") || this.context.parser.syntaxErrorsCount > 0) {
        this.setParseStatus(ParseStatus.invalid);
        this.context = undefined;
        this.text = text.trimStart();
      } else {
        this.setParseStatus(ParseStatus.valid);
        this.text = this.renderAsElanSource();
      }
    }
  }

  override parseFrom(source: CodeSource): void {
    this.rootNode = undefined;
    this.holder.hasBeenAddedTo();
    const text = this.readToDelimiter(source);

    this.parseCompleteTextUsingNode(text, undefined);
    if (this.isOptional() && this._parseStatus === ParseStatus.empty) {
      this._parseStatus = ParseStatus.valid;
    } else if (this._parseStatus === ParseStatus.invalid) {
      this.context = undefined;
      throw new Error(`Parse error at ${source.getRemainingCode()}`);
    }
  }
}

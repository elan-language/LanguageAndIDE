import * as antlr from "antlr4ng";
import { CharStream, CommonTokenStream } from "antlr4ng";
import { PythonLexer } from "../../../generated/python/PythonLexer";
import { PythonParser } from "../../../generated/python/PythonParser";
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

  override initialiseRoot(): ParseNode {
    return undefined as unknown as ParseNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }

  getPythonParser(input: string) {
    const chars = CharStream.fromString(input);
    const lexer = new PythonLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new PythonParser(tokens);
    return parser;
  }

  parseByLanguage(text: string): [antlr.Parser, antlr.ParserRuleContext] {
    if (this.language().languageFullName === "Python") {
      const parser = this.getPythonParser(text);
      return [parser, parser.type_()];
    }
    return [undefined!, undefined!];
  }

  override parseCompleteTextUsingNode(text: string, _root: ParseNode | undefined): void {
    if (text.length === 0) {
      this.setParseStatus(this.isOptional() ? ParseStatus.valid : ParseStatus.incomplete);
    } else {
      let parser: antlr.Parser;
      [parser, this.context] = this.parseByLanguage(text);
      const parsed = this.context.getText();

      if (parsed !== text.replaceAll(" ", "") || parser.numberOfSyntaxErrors > 0) {
        this.setParseStatus(ParseStatus.invalid);
        this.context = undefined;
        this.text = text.trimStart();
      } else {
        this.setParseStatus(ParseStatus.valid);
        this.text = text.trimStart();
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

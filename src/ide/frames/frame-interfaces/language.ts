import { OperationSymbol } from "../../../compiler/syntax-nodes/operation-symbol";
import { TerminalSymbol } from "../../../compiler/syntax-nodes/terminal-symbol";
import { FileImpl } from "../file-impl";
import { FrameType } from "../frame-type";
import { Field } from "./field";
import { Frame } from "./frame";

export interface Language {
  languageHtmlClass: string;
  languageFullName: string;
  defaultFileExtension: string;
  defaultMimeType: string;

  commentRegex(): RegExp;

  renderSingleLineAsHtml(frame: Frame): string;
  renderSingleLineAsSource(frame: Frame): string;

  renderTopAsHtml(frame: Frame): string;
  renderTopAsSource(frame: Frame): string;

  renderBottomAsHtml(frame: Frame): string;
  renderBottomAsSource(frame: Frame): string;

  renderFileImportsAsHtml(): string;

  renderSpecificHeaderAsHtml(f: FileImpl): string;
  renderSpecificHeaderAsSource(f: FileImpl): string;

  renderFileTrailerAsHtml(f: FileImpl): string;
  renderFileTrailerAsSource(f: FileImpl): string;

  getFields(node: Frame): Field[];

  postProcessHtml(html: string): string;

  COMMENT_MARKER: string; //e.g. `#`

  INTERPOLATED_STRING_PREFIX: string;
  NEW_INSTANCE_PREFIX: string;

  INT_NAME: string;
  FLOAT_NAME: string;
  BOOL_NAME: string;
  STRING_NAME: string;
  LIST_NAME: string;
  DICT_NAME: string;
  FUNC_NAME: string;

  BINARY_PREFIX: string;
  HEX_PREFIX: string;

  THIS_INSTANCE: string;

  customiseStatementOptions(options: [FrameType, string, string, boolean][]): void;

  mapOperation(op: string): OperationSymbol;

  mapOperationSymbol(op: OperationSymbol): string;

  mapTerminal(term: string): TerminalSymbol;

  mapTerminalSymbol(termSymbol: TerminalSymbol): string;
}

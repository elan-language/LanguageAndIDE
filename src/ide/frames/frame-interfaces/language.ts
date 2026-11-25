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

  customiseStatementOptions(options: [FrameType, string, string, boolean][]): void;

  mapOperation(op: string): OperationSymbol;

  mapOperationSymbol(op: OperationSymbol): string;

  mapTerminal(term: string): TerminalSymbol;

  mapTerminalSymbol(termSymbol: TerminalSymbol): string;
}

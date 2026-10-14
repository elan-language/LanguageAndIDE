import { FileImpl } from "../file-impl";
import { Field } from "./field";
import { Frame } from "./frame";

export interface Language {
  languageHtmlClass: string;
  languageFullName: string;
  defaultFileExtension: string;
  defaultMimeType: string;

  annotation(frame: Frame): string;

  commentRegex(): RegExp;

  renderSingleLineAsHtml(frame: Frame): string;

  renderTopAsHtml(frame: Frame): string;

  renderBottomAsHtml(frame: Frame): string;

  renderFileImportsAsHtml(): string;
  renderSpecificHeaderAsHtml(f: FileImpl): string;
  renderFileTrailerAsHtml(f: FileImpl): string;

  translateExpression(expr: string): string;

  getFields(node: Frame): Field[];

  postProcessHtml(html: string): string;

  MOD: string;
  EQUAL: string;
  NOT_EQUAL: string;
  AND: string;
  OR: string;
  NOT: string;

  COMMENT_MARKER: string; //e.g. `#`
  LIST_START: string;
  LIST_END: string;
  INTERPOLATED_STRING_PREFIX: string;
  NEW_INSTANCE_PREFIX: string;

  INT_NAME: string;
  FLOAT_NAME: string;
  BOOL_NAME: string;
  STRING_NAME: string;
  LIST_NAME: string;
  FUNC_NAME: string;

  TRUE: string;
  FALSE: string;
  BINARY_PREFIX: string;
  HEX_PREFIX: string;

  START_OF_GENERIC: string;
  END_OF_GENERIC: string;
  THIS_INSTANCE: string;

  TUPLE_START: string;
  TUPLE_END: string;

  EXPRESSION_KEYWORDS: string[];
  DISALLOWED_IDENTIFIERS: string[];

  // All keywords, incl. standard types, defined in the language (not just the ones used by Elan)
  reservedWords: Set<string>;
}

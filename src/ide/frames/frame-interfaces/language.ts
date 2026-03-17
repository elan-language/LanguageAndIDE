import { LitStringInterpolated } from "../parse-nodes/lit-string-interpolated";
import { NewInstance } from "../parse-nodes/new-instance";
import { ParamDefNode } from "../parse-nodes/param-def-node";
import { PropertyRef } from "../parse-nodes/property-ref";
import { TypeGenericNode } from "../parse-nodes/type-generic-node";
import { TypeTupleNode } from "../parse-nodes/type-tuple-node";
import { Field } from "./field";
import { Frame } from "./frame";
import { ParseNode } from "./parse-node";

export interface Language {
  languageClass: string;
  languageFullName: string;
  defaultFileExtension: string;
  defaultMimeType: string;

  annotation(frame: Frame): string;

  commentRegex(): RegExp;

  renderSingleLineAsHtml(frame: Frame): string;

  renderTopAsHtml(frame: Frame): string;

  renderBottomAsHtml(frame: Frame): string;

  completionWhenEmpty(node: ParseNode): string;

  getFields(node: Frame): Field[];

  addNodesForNewInstance(node: NewInstance): void;
  addNodesForParamDef(node: ParamDefNode): void;
  addNodesForTypeGeneric(node: TypeGenericNode): void;
  addNodesForTypeTuple(node: TypeTupleNode): void;
  standardiseInterpolatedString(node: LitStringInterpolated, text: string): string;

  paramDefAsHtml(node: ParamDefNode): string;
  typeGenericAsHtml(node: TypeGenericNode): string;
  propertyRefAsHtml(node: PropertyRef): string;
  newInstanceAsHtml(node: NewInstance): string;
  litStringInterpolatedAsHtml(node: LitStringInterpolated): string;
  typeTupleAsHtml(node: TypeTupleNode): string;

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
  NEW: string;

  INT_NAME: string;
  FLOAT_NAME: string;
  BOOL_NAME: string;
  STRING_NAME: string;
  LIST_NAME: string;

  TRUE: string;
  FALSE: string;
  BINARY_PREFIX: string;
  HEX_PREFIX: string;

  // All keywords, incl. standard types, defined in the language (not just the ones used by Elan)
  reservedWords: Set<string>;
}

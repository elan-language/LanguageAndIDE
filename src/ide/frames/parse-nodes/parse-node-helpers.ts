import { ParseNode } from "../frame-interfaces/parse-node";
import { copyKeyword, emptyKeyword, ifKeyword, lambdaKeyword, newKeyword } from "../keywords";
import { ParseStatus } from "../status-enums";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { FixedTextNode } from "./fixed-text-node";
import { SpaceNode } from "./space-node";

export function matchRegEx(text: string, regx: RegExp): [ParseStatus, string, string] {
  let status = ParseStatus.invalid;
  let match = "";
  let remaining = text;
  const matches = text.match(regx);
  if (matches !== null && matches.length > 0) {
    match = matches[0];
    status = ParseStatus.valid;
    remaining = text.replace(match, "");
  }
  return [status, match, remaining];
}

export function isFixedText(f?: ParseNode): f is FixedTextNode {
  return !!f && "fixedText" in f;
}

export function spIgn(): () => ParseNode {
  return () => new SpaceNode(Space.ignored);
}
export function spAdd(): () => ParseNode {
  return () => new SpaceNode(Space.added);
}
export function spReq(): () => ParseNode {
  return () => new SpaceNode(Space.required);
}

export enum Space {
  ignored, // allowed in input but NOT rendered in output e.g. after bracket or comma, or unary operator
  added, // optionalfor input but rendered in output irrespective  e.g. between binary operator and terms
  required, //Required for input and represented in output e.g. after keyword
}

export const noTokenTypes = new Set<TokenType>();

export const allIds: TokenType[] = [
  TokenType.id_constant,
  TokenType.id_let,
  TokenType.id_parameter_out,
  TokenType.id_parameter_regular,
  TokenType.id_property,
  TokenType.id_variable,
  TokenType.id_enumValue,
];
export const allMethods: TokenType[] = [
  TokenType.method_function,
  TokenType.method_function,
  TokenType.method_system,
];
export const allIdsAndMethods: TokenType[] = [
  TokenType.id_constant,
  TokenType.id_let,
  TokenType.id_parameter_out,
  TokenType.id_parameter_regular,
  TokenType.id_property,
  TokenType.id_variable,
  TokenType.id_enumValue,
  TokenType.method_function,
  TokenType.method_function,
  TokenType.method_system,
];
export const assignableIds: TokenType[] = [
  TokenType.id_parameter_out,
  TokenType.id_variable,
  TokenType.id_property,
];
export const concreteAndAbstractTypes: TokenType[] = [
  TokenType.type_abstract,
  TokenType.type_notInheritable,
  TokenType.type_concrete,
  TokenType.type_enum,
];
export const allKeywordsThatCanStartAnExpression: Set<KeywordCompletion> = new Set(
  [newKeyword, copyKeyword, ifKeyword, lambdaKeyword, emptyKeyword].map((kw) =>
    KeywordCompletion.create(kw),
  ),
);
export function removeUnmatchedClosingBracket(text: string): string {
  if (text.endsWith(")") && text.split("(").length - text.split(")").length !== 0) {
    text = text.slice(0, text.length - 1);
  }
  return text;
}

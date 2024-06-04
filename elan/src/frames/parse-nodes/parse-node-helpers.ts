import { ParseStatus } from "../status-enums";
import { FixedTextNode } from "./fixed-text-node";
import { ParseNode } from "./parse-node";
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

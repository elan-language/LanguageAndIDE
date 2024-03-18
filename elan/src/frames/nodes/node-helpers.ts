import { ParseNode } from "./parse-node";

export function singleLeadingSpace(node: ParseNode) : string {
    var trimmed = node.matchedText.trimStart();
    return trimmed.length > 0 ? ` ${trimmed}` : "";
}
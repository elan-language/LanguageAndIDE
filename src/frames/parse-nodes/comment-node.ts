import { Regexes } from "../fields/regexes";
import { RegExMatchNode } from "./regex-match-node";

export class CommentNode extends RegExMatchNode {
  nameForError(): string {
    return " as a comment";
  }
  constructor() {
    super(Regexes.anythingToNewLineAsRegExp);
  }
}

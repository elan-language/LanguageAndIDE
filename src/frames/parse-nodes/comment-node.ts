import { Regexes } from "../fields/regexes";
import { RegExMatchNode } from "./regex-match-node";

export class CommentNode extends RegExMatchNode {
  constructor() {
    super(Regexes.anythingToNewLineAsRegExp);
  }
}

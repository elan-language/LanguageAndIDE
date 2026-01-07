import { Regexes } from "../fields/regexes";
import { RegExMatchNode } from "./regex-match-node";
import { File } from "../frame-interfaces/file";

export class CommentNode extends RegExMatchNode {
  constructor(file: File) {
    super(file, Regexes.anythingToNewLineAsRegExp);
  }
}

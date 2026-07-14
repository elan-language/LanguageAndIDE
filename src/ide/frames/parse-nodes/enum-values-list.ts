import { File } from "../frame-interfaces/file";
import { CSV } from "./csv";
import { IdentifierNode } from "./identifier-node";

export class EnumValuesList extends CSV {
  constructor(file: File) {
    super(file, () => new IdentifierNode(file), 1);
    this.setSyntaxCompletionWhenEmpty("<i>enum values (comma separated)</i>");
  }
}

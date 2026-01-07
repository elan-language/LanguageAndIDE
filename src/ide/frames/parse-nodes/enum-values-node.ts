import { CSV } from "./csv";
import { IdentifierNode } from "./identifier-node";
import { File } from "../frame-interfaces/file";

export class EnumValuesNode extends CSV {
  constructor(file: File) {
    super(file, () => new IdentifierNode(file), 1);
    this.setSyntaxCompletionWhenEmpty("<i>enum values (comma separated)</i>");
  }
}

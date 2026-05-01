import { File } from "../frame-interfaces/file";
import { CSV } from "./csv";
import { IdentifierUse } from "./identifier-use";

export class EnumValuesList extends CSV {
  constructor(file: File) {
    super(file, () => new IdentifierUse(file), 1);
    this.setSyntaxCompletionWhenEmpty("<i>enum values (comma separated)</i>");
  }
}

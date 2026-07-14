import { File } from "../frame-interfaces/file";
import { CSV } from "./csv";
import { Identifier } from "./identifier";

export class EnumValuesList extends CSV {
  constructor(file: File) {
    super(file, () => new Identifier(file), 1);
    this.setSyntaxCompletionWhenEmpty("<i>enum values (comma separated)</i>");
  }
}

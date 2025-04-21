import { CSV } from "./csv";
import { IdentifierNode } from "./identifier-node";

export class EnumValuesNode extends CSV {
  constructor() {
    super(() => new IdentifierNode(), 1);
    this.setSyntaxCompletionWhenEmpty("<i>enum values (comma separated)</i>");
  }

  override nameForError(): string {
    return "a comma-separated list of names";
  }
}

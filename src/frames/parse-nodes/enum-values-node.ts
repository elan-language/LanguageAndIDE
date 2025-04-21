import { CSV } from "./csv";
import { IdentifierNode } from "./identifier-node";

export class EnumValuesNode extends CSV {
  constructor() {
    super(() => new IdentifierNode(), 1);
    this.setSyntaxCompletionWhenEmpty("<i>enum values (comma separated)</i>");
  }
  override errorLink: string = "#parse_enum_values";
}

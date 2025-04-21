import { IdentifierNode } from "./identifier-node";

export class MethodNameNode extends IdentifierNode {
  override nameForError(): string {
    return "a valid method name";
  }

  override renderAsHtml(): string {
    return this.renderAsSource();
  }
}

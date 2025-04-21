import { IdentifierNode } from "./identifier-node";

export class MethodNameNode extends IdentifierNode {
  override errorLink: string = "#parse_name";

  override renderAsHtml(): string {
    return this.renderAsSource();
  }
}

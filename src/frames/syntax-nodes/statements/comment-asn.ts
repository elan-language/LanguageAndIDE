import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { FrameAsn } from "../frame-asn";

export class CommentAsn extends FrameAsn {
  isStatement = true;
  isMember = true;
  isAbstract = false;
  private = false;

  constructor(
    private readonly text: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];

    const astNode = this.text;
    astNode.compile();
    return "";
  }
}

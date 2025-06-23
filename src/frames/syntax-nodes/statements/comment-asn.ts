import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../frame-interfaces/scope";
import { EmptyAsn } from "../empty-asn";
import { FrameAsn } from "../frame-asn";

export class CommentStatementAsn extends FrameAsn {
  isStatement = true;
  isMember = true;
  isAbstract = false;
  private = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  text: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];

    const astNode = this.text;
    astNode.compile();
    return "";
  }
}

import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { FrameAsn } from "../frame-asn";

export class GlobalCommentAsn extends FrameAsn {
  isGlobal = true;

  constructor(
    private readonly text: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];
    this.text.compile();
    return "";
  }
}

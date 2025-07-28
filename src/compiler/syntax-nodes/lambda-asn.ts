import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { FunctionType } from "../../compiler/symbols/function-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { LambdaSigAsn } from "./lambda-sig-asn";

export class LambdaAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly signature: LambdaSigAsn,
    private readonly body: AstNode,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return `async (${this.signature.compile()}) => ${this.body.compile()}`;
  }

  symbolType() {
    const [pn, pt] = this.signature.parameterNamesAndTypes();
    return new FunctionType(pn, pt, this.body.symbolType(), false, true, true);
  }

  toString() {
    return `lambda ${this.signature} => ${this.body}`;
  }
}

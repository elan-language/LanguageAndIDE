import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { FunctionType } from "../symbols/function-type";
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

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors
      .concat(this.signature.aggregateCompileErrors())
      .concat(this.body.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];

    return `(${this.signature.compile()}) => ${this.body.compile()}`;
  }

  symbolType() {
    const [pn, pt] = this.signature.parameterNamesAndTypes();
    return new FunctionType(pn, pt, this.body.symbolType(), false);
  }

  toString() {
    return `lambda ${this.signature} => ${this.body}`;
  }
}

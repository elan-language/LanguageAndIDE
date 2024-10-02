import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class RangeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly from: AstNode | undefined,
    private readonly to: AstNode | undefined,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    const fr = this.from ? this.from.aggregateCompileErrors() : [];
    const to = this.to ? this.to.aggregateCompileErrors() : [];

    return this.compileErrors.concat(fr).concat(to);
  }

  compile(): string {
    this.compileErrors = [];
    const f = this.from ? `${this.from.compile()}` : "0";
    const t = this.to ? `${this.to.compile()}` : undefined;
    return t ? `.slice(${f}, ${t})` : `.slice(${f})`;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  toString() {
    const f = this.from ? `${this.from}` : "";
    const t = this.to ? `${this.to}` : "";
    return `${f}..${t}`;
  }
}

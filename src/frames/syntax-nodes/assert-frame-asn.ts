import { CompileError } from "../compile-error";
import { singleIndent } from "../frame-helpers";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { TestFrameAsn } from "./test-frame-asn";

export class AssertFrameAsn extends AbstractAstNode implements AstNode {
  constructor(
    private expected: AstNode,
    private actual: AstNode,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  symbolType(): SymbolType {
    return UnknownType.Instance;
  }

  indent(): string {
    // if (this.hasParent()) {
    //   return this.getParent().indent() + singleIndent();
    // } else {
    return singleIndent();
    //}
  }

  compile(): string {
    this.compileErrors = [];
    const test = this.scope as unknown as TestFrameAsn;
    const ignored = test.ignored;
    const expected = this.expected.compile();
    const actual = this.actual.compile();
    const actualFunc = `async () => ${actual}`;
    return `${this.indent()}_outcomes.push(await system.assert(${ignored ? `""` : actualFunc}, ${ignored ? `""` : expected}, "${this.fieldId}", _stdlib, ${ignored}));`;
  }

  aggregateCompileErrors(): CompileError[] {
    throw new Error("Method not implemented.");
  }
}

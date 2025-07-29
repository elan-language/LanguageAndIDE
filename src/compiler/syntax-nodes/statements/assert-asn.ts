import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { UnknownType } from "../../../compiler/symbols/unknown-type";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";
import { TestAsn } from "../globals/test-asn";

export class AssertAsn extends BreakpointAsn implements AstNode {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  expected: AstNode = EmptyAsn.Instance;
  actual: AstNode = EmptyAsn.Instance;

  symbolType(): SymbolType {
    return UnknownType.Instance;
  }

  compile(): string {
    this.compileErrors = [];
    const test = this.scope as unknown as TestAsn;
    const ignored = test.ignored;
    const expected = this.expected.compile();
    const actual = this.actual.compile();
    const actualFunc = `async () => ${actual}`;
    return `${this.indent()}_outcomes.push(await system.assert(${ignored ? `""` : actualFunc}, ${ignored ? `""` : expected}, "${this.fieldId}", _stdlib, ${ignored}));`;
  }
}

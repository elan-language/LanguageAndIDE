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
    const test = this.scope as TestAsn;
    const ignored = test.ignored;
    const emptyString = `""`;
    const emptyTuple = `[${emptyString}, ${emptyString}]`;
    let expected = emptyTuple;
    let actual = emptyTuple;
    const expectedValue = this.expected.compile();
    const actualValue = this.actual.compile();

    if (!ignored) {
      const expectedSt = this.expected.symbolType().name;
      const actualSt = this.actual.symbolType().name;
      const actualFunc = `async () => ${actualValue}`;
      expected = `[${expectedValue}, "${expectedSt}"]`;
      actual = `[${actualFunc}, "${actualSt}"]`;
    }

    return `${this.indent()}_outcomes.push(await system.assert(${actual}, ${expected}, "${this.fieldId}", _stdlib, ${ignored}));`;
  }
}

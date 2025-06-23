import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../frame-interfaces/scope";
import { SymbolType } from "../../frame-interfaces/symbol-type";
import { UnknownType } from "../../symbols/unknown-type";
import { EmptyAsn } from "../empty-asn";
import { FrameAsn } from "../frame-asn";
import { TestAsn } from "../globals/test-asn";

export class AssertAsn extends FrameAsn implements AstNode {
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

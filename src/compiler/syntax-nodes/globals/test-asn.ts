import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { mustBeUniqueNameInScope } from "../../compile-rules";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { TestType } from "../../symbols/test-type";
import { CompoundAsn } from "../compound-asn";

export class TestAsn extends CompoundAsn implements AstNode, ElanSymbol {
  constructor(
    private readonly name: string,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
    this.symbolId = name;
  }

  symbolId: string;

  symbolType(): SymbolType {
    return new TestType(this.name);
  }

  get symbolScope() {
    return SymbolScope.program;
  }

  indent(): string {
    return "";
  }

  private compileTestBody() {
    return this.compileChildren();
  }

  compile(): string {
    this.compileErrors = [];

    mustBeUniqueNameInScope(this.name, this.scope, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `_tests.push(["${this.fieldId}", async (_outcomes) => {\r
${this.compileTestBody()}\r
}]);\r\n`;
  }
}

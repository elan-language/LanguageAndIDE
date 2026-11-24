import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { mustBeUniqueNameInScope } from "../../compile-rules";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { TestType } from "../../symbols/test-type";
import { isAstIdNode } from "../ast-helpers";
import { CompoundAsn } from "../compound-asn";

export class TestAsn extends CompoundAsn implements AstNode, ElanSymbol {
  constructor(
    private readonly name: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  get id() {
    return isAstIdNode(this.name) ? this.name.id : "";
  }

  symbolIsType: boolean = false;

  get symbolId() {
    return this.id;
  }

  symbolType(): SymbolType {
    return new TestType(this.id);
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

    mustBeUniqueNameInScope(this.id, this.scope, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `_tests.push(["${this.fieldId}", async (_outcomes) => {\r
${this.compileTestBody()}\r
}]);\r\n`;
  }
}

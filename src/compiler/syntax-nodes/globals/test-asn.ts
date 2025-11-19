import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { CompoundAsn } from "../compound-asn";

export class TestAsn extends CompoundAsn implements AstNode {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  symbolType(): SymbolType {
    throw new Error("Method not implemented.");
  }

  indent(): string {
    return "";
  }

  private compileTestBody() {
    return  this.compileChildren();
  }

  compile(): string {
    this.compileErrors = [];
    return `_tests.push(["${this.fieldId}", async (_outcomes) => {\r
${this.compileTestBody()}\r
}]);\r\n`;
  }
}

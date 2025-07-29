import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { compileNodes } from "../ast-helpers";
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

  public ignored = false;

  private compileTestBody() {
    const body = this.compileChildren();

    if (!this.ignored || this.compileErrors.length > 0) {
      return body;
    }

    // just return the asserts
    return compileNodes(this.getAsserts());
  }

  compile(): string {
    this.compileErrors = [];
    return `_tests.push(["${this.fieldId}", async (_outcomes) => {\r
${this.compileTestBody()}\r
}]);\r\n`;
  }
}

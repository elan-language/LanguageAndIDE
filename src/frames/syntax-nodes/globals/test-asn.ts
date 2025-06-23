import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../frame-interfaces/scope";
import { SymbolType } from "../../frame-interfaces/symbol-type";
import { compileNodes } from "../ast-helpers";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class TestAsn extends FrameWithStatementsAsn implements AstNode {
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

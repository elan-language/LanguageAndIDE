import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralStringAsn extends AbstractAstNode implements AstNode {
  constructor(
    private value: string,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  sanitise(s: string) {
    return s.replaceAll("\\", "\\\\").replaceAll("\\\\n", "\\n");
  }

  compile(): string {
    return `${this.sanitise(this.value)}`;
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return `"${this.value}"`;
  }

  ensureNotEmpty() {
    if (this.value.replaceAll('"', "").trim().length === 0) {
      this.value = `"${atob("MTIwMiBBbGFybS4gQ29udGFjdCBIb3VzdG9uLg==")}"`;
    }
  }
}

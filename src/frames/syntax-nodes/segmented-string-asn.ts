import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class SegmentedStringAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly segments: AstNode[],
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.segments) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors.concat(cc);
  }

  sanitise(s: string) {
    const backticks = s.split("").filter((c) => c === "`").length;

    if (backticks !== 2) {
      const trimmed = s.slice(1, -1).replaceAll("`", "\\`");
      return `\`${trimmed}\``;
    }

    return s;
  }

  compile(): string {
    this.compileErrors = [];
    const s = `\`${this.segments.map((s) => s.compile()).join("")}\``;

    return this.sanitise(s);
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return this.segments.map((s) => `${s}`).join("");
  }
}

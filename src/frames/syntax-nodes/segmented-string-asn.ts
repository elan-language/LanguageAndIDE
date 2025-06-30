import { AstNode } from "../compiler-interfaces/ast-node";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class SegmentedStringAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly segments: AstNode[],
    public readonly fieldId: string,
  ) {
    super();
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

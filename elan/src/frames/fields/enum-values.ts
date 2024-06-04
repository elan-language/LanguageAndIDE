import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { CSV } from "../parse-nodes/csv";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";

export class EnumValues extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("values");
    this.help = `Comma-separated list of names, each of which must start with a lower-case letter, with same possible other characters as a variable name.`;
  }
  getIdPrefix(): string {
    return "enumVals";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new CSV(() => new IdentifierNode(), 1);
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const ast = this.getOrTransformAstNode(transforms) as AstCollectionNode;

    if (ast) {
      const items = ast.items;
      if (items.length > 0) {
        const def = `_default : "${items[0].compile()}", `;

        const itStr = items.map((n) => `${n.compile()} : "${n.compile()}"`).join(", ");

        return `${def}${itStr}`;
      }

      return `_default : ""`;
    }

    return "";
  }
}

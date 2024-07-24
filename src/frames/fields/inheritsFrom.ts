import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { SymbolType } from "../interfaces/symbol-type";
import { CSV } from "../parse-nodes/csv";
import { ParseNode } from "../parse-nodes/parse-node";
import { TypeNode } from "../parse-nodes/type-node";
import { isAstCollectionNode } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";

export class InheritsFrom extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("type(s)");
    this.help = `Enter one or more (comma-separated) Type names to inherit from.`;
  }
  getIdPrefix(): string {
    return "args";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new CSV(() => new TypeNode(), 1);
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolTypes(transforms?: Transforms): SymbolType[] {
    if (transforms && this.rootNode) {
      const ast = this.getOrTransformAstNode(transforms);

      if (isAstCollectionNode(ast)) {
        return ast.items.map((i) => i.symbolType());
      }
    }
    return [];
  }
}

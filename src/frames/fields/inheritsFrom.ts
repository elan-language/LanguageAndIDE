import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { SymbolType } from "../interfaces/symbol-type";
import { InheritanceNode } from "../parse-nodes/inheritanceNode";
import { ParseNode } from "../parse-nodes/parse-node";
import { isAstCollectionNode, transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";

export class InheritsFrom extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setOptional(true);
    this.setPlaceholder("inherits ClassName(s)");
  }
  getIdPrefix(): string {
    return "text";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new InheritanceNode();
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

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

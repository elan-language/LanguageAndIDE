import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { InheritanceNode } from "../parse-nodes/inheritanceNode";
import { isAstCollectionNode, transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class InheritsFromField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setOptional(true);
    this.setPlaceholder("<i>inherits ClassName(s)</i>");
  }

  helpId(): string {
    return "InheritsFromField";
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

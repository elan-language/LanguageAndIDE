import { mustBeUniqueValueInScope, mustNotBeKeyword } from "../compile-rules";
import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { Transforms } from "../interfaces/transforms";
import { EnumValuesNode } from "../parse-nodes/enum-values-node";
import { isAstCollectionNode, transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class EnumValuesField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>values</i>");
  }

  helpId(): string {
    return "EnumValuesField";
  }

  getIdPrefix(): string {
    return "enumVals";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new EnumValuesNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const ast = this.getOrTransformAstNode(transforms);

    if (isAstCollectionNode(ast)) {
      const items = ast.items;
      if (items.length > 0) {
        const ids = items.map((i) => i.compile());

        for (const id of ids) {
          mustNotBeKeyword(id, this.compileErrors, this.htmlId);

          if (ids.indexOf(id) !== ids.lastIndexOf(id)) {
            mustBeUniqueValueInScope(id, this.compileErrors, this.htmlId);
          }
        }

        const def = `_default : "${ids[0]}", `;

        const itStr = ids.map((n) => `${n} : "${n}"`).join(", ");

        return `${def}${itStr}`;
      }

      return `_default : ""`;
    }

    return "";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

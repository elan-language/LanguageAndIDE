import { CodeSource } from "../code-source";
import { mustBeUniqueValueInScope, mustNotBeKeyword } from "../compile-rules";
import { Frame } from "../interfaces/frame";
import { CSV } from "../parse-nodes/csv";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { isAstCollectionNode, transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";

export class EnumValues extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>values</i>");
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

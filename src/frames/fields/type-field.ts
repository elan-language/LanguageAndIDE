import { CodeSource } from "../code-source";
import { isAstType } from "../frame-helpers";
import { Frame } from "../interfaces/frame";
import { Transforms } from "../interfaces/transforms";
import { ParseNode } from "../parse-nodes/parse-node";
import { TypeNode } from "../parse-nodes/type-node";
import { TokenType } from "../symbol-completion-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class TypeField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.useHtmlTags = true;
    this.placeholder = "<i>Type</i>";
    this.help = `A simple Type name must begin with an upper-case letter. See manual for Array, List, an  Dictionary types, 'generic type', 'tuple type', 'function type' - consult documentation for these.`;
  }
  getIdPrefix(): string {
    return "type";
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new TypeNode(
      new Set<TokenType>([
        TokenType.type_concrete,
        TokenType.type_abstract,
        TokenType.type_notInheritable,
      ]),
    );
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const astNode = this.getOrTransformAstNode(transforms);
    if (isAstType(astNode)) {
      return astNode.compileToEmptyObjectCode();
    }
    return super.compile(transforms);
  }

  symbolType(transforms?: Transforms) {
    return this.getOrTransformAstNode(transforms).symbolType();
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

import { isAstType } from "../frame-helpers";
import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { Transforms } from "../interfaces/transforms";
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
  }

  helpId(): string {
    return "TypeField";
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

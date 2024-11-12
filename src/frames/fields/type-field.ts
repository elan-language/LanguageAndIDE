import { CodeSource } from "../code-source";
import { isAstType, isGenericClass } from "../helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { TypeNode } from "../parse-nodes/type-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";

export class TypeField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.useHtmlTags = true;
    this.placeholder = "<i>Type</i>";
    this.help = `A simple Type name must begin with an upper-case letter. More complex types are: 'generic type', 'tuple type', 'function type' - consult documentation for these.`;
  }
  getIdPrefix(): string {
    return "type";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new TypeNode();
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

  public textAsHtml(): string {
    return super.textAsHtml() + this.symbolCompletionAsHtml(transforms());
  }

  protected override getId(symbol: ElanSymbol) {
    return isGenericClass(symbol) ? `${symbol.symbolId}<of ` : symbol.symbolId;
  }

  mapTypeId(symbol: ElanSymbol) {
    return isGenericClass(symbol) ? `${symbol.symbolId}&lt;of` : symbol.symbolId;
  }

  protected override getSymbolId(symbol: ElanSymbol) {
    return this.mapTypeId(symbol);
  }
}

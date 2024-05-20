import { ElanSymbol } from "../interfaces/symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { CSV } from "../parse-nodes/csv";
import { ParamDefNode } from "../parse-nodes/param-def-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";
import { SymbolScope } from "../symbols/symbol-scope";

export class ParamList extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("parameter definitions");
    this.useHtmlTags = true;
    this.setOptional(true);
    this.help = `Zero or more parameter definitions comma-separated. Each parameter definition consists of a parameter name followed by the 'as' keyword and a Type. A parameter name follows the same rules as for a variable name - starting with a lower-case letter.`;
  }

  getIdPrefix(): string {
    return "params";
  }
  public contentAsSource(): string {
    if (this.text) {
      return this.text;
    } else {
      return "";
    }
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new CSV(() => new ParamDefNode(), 0);
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToNonMatchingCloseBracket();

  symbolTypes(transforms: Transforms): SymbolType[] {
    const ast = this.getOrTransformAstNode(transforms) as AstCollectionNode;
    return ast ? ast.items.map((i) => i.symbolType()) : [];
  }

  resolveSymbol(
    id: string | undefined,
    transforms: Transforms,
    initialScope: Frame,
  ): ElanSymbol {
    const ast = this.getOrTransformAstNode(transforms) as AstCollectionNode;

    if (ast) {
      for (const n of ast.items as AstIdNode[]) {
        if (n.id === id) {
          return {
            symbolId: id,
            symbolType: () => n.symbolType(),
            symbolScope: SymbolScope.parameter,
          };
        }
      }
    }
    return new UnknownSymbol(id);
  }
}

import { CodeSource } from "../code-source";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { ElanSymbol } from "../interfaces/symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { CSV } from "../parse-nodes/csv";
import { ParamDefNode } from "../parse-nodes/param-def-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../status-enums";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { isAstCollectionNode, isAstIdNode, transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";

export class ParamList extends AbstractField implements Scope {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("parameter definitions");
    this.useHtmlTags = true;
    this.setOptional(true);
    this.help = `Zero or more parameter definitions comma-separated. Each parameter definition consists of a parameter name followed by the 'as' keyword and a Type. A parameter name follows the same rules as for a variable name - starting with a lower-case letter.`;
  }

  getParentScope(): Scope {
    return this.getHolder();
  }

  symbolMatches(id: string, all: boolean, initialScope?: Scope): ElanSymbol[] {
    const ast = this.getOrTransformAstNode(transforms());

    if (isAstCollectionNode(ast)) {
      const matches: ElanSymbol[] = [];
      for (const n of ast.items) {
        if (isAstIdNode(n)) {
          if (n.id.startsWith(id) || all) {
            matches.push({
              symbolId: n.id,
              symbolType: () => n.symbolType(),
              symbolScope: n.symbolScope,
            });
          }
        }
      }
      return matches;
    }

    return [];
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

  symbolTypes(transforms?: Transforms): SymbolType[] {
    const ast = this.getOrTransformAstNode(transforms);

    if (isAstCollectionNode(ast)) {
      return ast.items.map((i) => i.symbolType());
    }

    return [];
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    const ast = this.getOrTransformAstNode(transforms);

    if (isAstCollectionNode(ast)) {
      const matches: ElanSymbol[] = [];
      for (const n of ast.items) {
        if (isAstIdNode(n)) {
          if (n.id === id) {
            matches.push({
              symbolId: id,
              symbolType: () => n.symbolType(),
              symbolScope: n.symbolScope,
            });
          }
        }
      }

      if (matches.length === 1) {
        return matches[0];
      }

      if (matches.length > 1) {
        return new DuplicateSymbol(matches);
      }
    }
    return new UnknownSymbol(id);
  }

  isEndMarker(key: string) {
    return this.text === "" && key === ")";
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    if (this.rootNode && this.rootNode.status === ParseStatus.valid) {
      const parms = this.getOrTransformAstNode(transforms);

      if (isAstCollectionNode(parms)) {
        if (parms.items.length > 1) {
          const ids = parms.items;

          for (const idNode of ids) {
            if (isAstIdNode(idNode)) {
              mustBeUniqueNameInScope(idNode.id, this, transforms, this.compileErrors, this.htmlId);
            }
          }
        }

        return parms.compile();
      }
    }

    return "";
  }
}

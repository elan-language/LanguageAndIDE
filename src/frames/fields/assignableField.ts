import { CodeSource } from "../code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { propertyKeyword } from "../keywords";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { KeywordCompletion, SymbolCompletionSpec, TokenType } from "../symbol-completion-helpers";
import {
  filteredSymbols,
  isInsideClass,
  isProperty,
  removeIfSingleFullMatch,
} from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";

export class AssignableField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>variable</i>");
    this.help = `A previously defined variable, but NOT a parameter. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)`;
  }

  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new AssignableNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/(\s+to\s+)|\r|\n/);

  allPropertiesInScope() {
    const all = this.getHolder().symbolMatches("", true, this.getHolder());
    return all.filter((s) => isProperty(s)) as ElanSymbol[];
  }

  override matchingSymbolsForId(spec: SymbolCompletionSpec, transforms: Transforms): ElanSymbol[] {
    const scope = this.getHolder();
    let symbols = filteredSymbols(spec, transforms, scope);
    if (isInsideClass(scope)) {
      if (propertyKeyword.startsWith(spec.toMatch)) {
        const allProperties = this.allPropertiesInScope();
        symbols = symbols.filter((s) => !allProperties.includes(s)).concat(allProperties);
      } else if (spec.context === propertyKeyword) {
        const newSpec = new SymbolCompletionSpec(
          spec.toMatch,
          new Set<TokenType>([TokenType.id_property]),
          new Set<KeywordCompletion>(),
          "",
        );
        symbols = filteredSymbols(newSpec, transforms, scope);
      }
    }
    return removeIfSingleFullMatch(symbols, spec.toMatch);
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

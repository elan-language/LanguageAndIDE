import { CodeSource } from "../code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { propertyKeyword } from "../keywords";
import { Alternatives } from "../parse-nodes/alternatives";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import { SymbolCompletionSpec, TokenType } from "../symbol-completion-helpers";
import {
  filteredSymbols,
  filtersForTokenType,
  isInsideClass,
  isMemberOnFieldsClass,
  isProperty,
  removeIfSingleFullMatch,
} from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractField } from "./abstract-field";

export class AssignableField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("variable");
    this.help = `A previously defined variable, but NOT a parameter. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)`;
  }

  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    const varRef = () => new AssignableNode();
    const deconTup = () => new DeconstructedTuple();
    const deconList = () => new DeconstructedList();
    this.rootNode = new Alternatives([varRef, deconTup, deconList]);
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/(\s+to\s+)|\r|\n/);

  allPropertiesInScope() {
    const all = this.getHolder().symbolMatches("", true, this.getHolder());
    return all.filter((s) => isProperty(s)) as ElanSymbol[];
  }

  override matchingSymbolsForId(
    spec: SymbolCompletionSpec,
    transforms: Transforms,
  ): [string, ElanSymbol[]] {
    const scope = this.getHolder();
    let symbols = filteredSymbols(
      spec.toMatch,
      transforms,
      filtersForTokenType(spec.tokenTypes, transforms),
      scope,
    );

    if (isInsideClass(scope)) {
      const prefix = "property.";

      if (prefix.startsWith(spec.toMatch) && spec.toMatch.length <= prefix.length) {
        const [match, existing] = symbols;
        const allProperties = this.allPropertiesInScope();

        const updated = existing.filter((s) => !allProperties.includes(s)).concat(allProperties);
        symbols = [match, updated];
      } else if (spec.toMatch.startsWith(prefix)) {
        const [match] = symbols;
        const filter: (s?: ElanSymbol) => boolean = (s) => isProperty(s);
        symbols = filteredSymbols(match, transforms, [filter], scope);
      }
    }
    const [match, origSymbols] = symbols;

    return [match, removeIfSingleFullMatch(origSymbols, match)];
  }

  protected override getSymbolCompleteId(s: ElanSymbol) {
    if (isMemberOnFieldsClass(s, transforms(), this.getHolder())) {
      return `${propertyKeyword}.${s.symbolId}`;
    }
    return s.symbolId;
  }

  public textAsHtml(): string {
    return super.textAsHtml() + this.symbolCompletionAsHtml(transforms());
  }
}

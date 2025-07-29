import { ElanSymbol } from "../../compiler/compiler-interfaces/elan-symbol";
import { RootAstNode } from "../../compiler/compiler-interfaces/root-ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { propertyKeyword } from "../../compiler/keywords";
import { FunctionType } from "../../compiler/symbols/function-type";
import { NullScope } from "../../compiler/symbols/null-scope";
import { ProcedureType } from "../../compiler/symbols/procedure-type";
import {
  orderSymbol,
  isPureFunction,
  isSystemFunction,
  isConcreteTypeName,
  isAbstractTypeName,
  isEnum,
  isNotInheritableTypeName,
  isConstant,
  isVariable,
  isParameter,
  isOutParameter,
  isProperty,
  isEnumValue,
  isInsideClass,
  getClassScope,
  matchingSymbolsWithQualifier,
  isProcedure,
  isLet,
  allPropertiesInScope,
} from "../../compiler/symbols/symbol-helpers";

export enum TokenType {
  id_let,
  id_variable,
  id_property,
  id_parameter_regular,
  id_parameter_out,
  id_constant,
  id_enumValue,
  type_concrete,
  type_abstract,
  type_enum,
  type_notInheritable,
  method_procedure,
  method_function,
  method_system,
}

export class KeywordCompletion {
  private constructor(
    public readonly keyword: string,
    public readonly spaceAfter: boolean,
    public readonly dotAfter: boolean,
    public readonly openBracketAfter: boolean,
  ) {}

  private static map = new Map<string, KeywordCompletion>();

  static create(keyword: string, spaceAfter = true, dotAfter = false, openBracketAfter = false) {
    if (!this.map.has(keyword)) {
      this.map.set(keyword, new KeywordCompletion(keyword, spaceAfter, dotAfter, openBracketAfter));
    }

    return this.map.get(keyword)!;
  }

  static reset() {
    this.map.clear();
  }
}

export class SymbolCompletionSpec {
  constructor(
    public readonly toMatch: string,
    public readonly tokenTypes: Set<TokenType>,
    public readonly keywords: Set<KeywordCompletion>,
    public context: string,
  ) {}
}

export function matchingSymbols(spec: SymbolCompletionSpec, scope: Scope): ElanSymbol[] {
  if (spec.context) {
    return matchingSymbolsWithQualifier(spec.toMatch, spec.context, scope);
  }

  const allNotExtensions = scope.symbolMatches(spec.toMatch, !spec.toMatch, scope).filter((s) => {
    const st = s.symbolType();
    let isCall = false;
    let isExtension = false;

    if (st instanceof ProcedureType || st instanceof FunctionType) {
      isCall = true;
      isExtension = st.isExtension;
    }
    return !isCall || (isCall && !isExtension);
  });

  return allNotExtensions;
}

export function filteredSymbols(spec: SymbolCompletionSpec, scope: Scope): ElanSymbol[] {
  const matches = matchingSymbols(spec, scope);
  const filters = filtersForTokenType(spec.tokenTypes);
  const filtered = ensureUnique(filterSymbols(matches, filters));

  const startsWith = filtered
    .filter((s) => s.symbolId.toUpperCase().startsWith(spec.toMatch.toUpperCase()))
    .sort(orderSymbol);
  const includes = filtered.filter((s) => !startsWith.includes(s)).sort(orderSymbol);
  return startsWith.concat(includes);
}

function filterSymbols(matches: ElanSymbol[], filters: ((s: ElanSymbol) => boolean)[]) {
  let filtered: ElanSymbol[] = [];

  for (const f of filters) {
    filtered = filtered.concat(matches.filter(f));
  }

  return filtered.filter((e) => !e.symbolId.startsWith("_"));
}

function ensureUnique(symbols: ElanSymbol[]) {
  const uniqueNames = Array.from(new Set<string>(symbols.map((s) => s.symbolId)));
  return uniqueNames.map((n) => symbols.find((s) => s.symbolId === n)) as ElanSymbol[];
}

export function filterForTokenType(tt: TokenType): (s?: ElanSymbol) => boolean {
  switch (tt) {
    case TokenType.method_function:
      return (s?: ElanSymbol) => isPureFunction(s!);
    case TokenType.method_procedure:
      return (s?: ElanSymbol) => isProcedure(s!);
    case TokenType.method_system:
      return (s?: ElanSymbol) => isSystemFunction(s!);
    case TokenType.type_concrete:
      return isConcreteTypeName;
    case TokenType.type_abstract:
      return isAbstractTypeName;
    case TokenType.type_enum:
      return isEnum;
    case TokenType.type_notInheritable:
      return isNotInheritableTypeName;
    case TokenType.id_constant:
      return isConstant;
    case TokenType.id_let:
      return isLet;
    case TokenType.id_variable:
      return isVariable;
    case TokenType.id_parameter_regular:
      return isParameter;
    case TokenType.id_parameter_out:
      return isOutParameter;
    case TokenType.id_property:
      return isProperty;
    case TokenType.id_enumValue:
      return isEnumValue;
  }
}

export function filtersForTokenType(tokenTypes: Set<TokenType>): ((s?: ElanSymbol) => boolean)[] {
  const filters: ((s?: ElanSymbol) => boolean)[] = [];

  for (const f of tokenTypes) {
    filters.push(filterForTokenType(f));
  }

  return filters;
}

export function getFilteredSymbols(
  spec: SymbolCompletionSpec,
  ast: RootAstNode | undefined,
  htmlId: string,
) {
  const scope = ast?.getScopeById(htmlId) ?? NullScope.Instance;
  let symbols = filteredSymbols(spec, scope);
  if (isInsideClass(scope)) {
    if (propertyKeyword.startsWith(spec.toMatch)) {
      const allProperties = allPropertiesInScope(getClassScope(scope)).sort(orderSymbol);
      symbols = symbols.filter((s) => !allProperties.includes(s)).concat(allProperties);
    } else if (spec.context === propertyKeyword) {
      const newSpec = new SymbolCompletionSpec(
        spec.toMatch,
        new Set<TokenType>([TokenType.id_property]),
        new Set<KeywordCompletion>(),
        "",
      );
      symbols = filteredSymbols(newSpec, scope);
    }
  }
  return symbols;
}

export function removeIfSingleFullMatch(symbols: ElanSymbol[], id: string): ElanSymbol[] {
  if (symbols.length === 1 && symbols[0].symbolId === id) {
    return [];
  } else {
    return symbols;
  }
}

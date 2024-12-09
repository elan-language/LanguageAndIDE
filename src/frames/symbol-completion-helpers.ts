export enum TokenType {
  method_function,
  method_procedure,
  method_system,
  type_concrete,
  type_abstract,
  type_enum,
  id_constant,
  id_let,
  id_variable,
  id_parameter_regular,
  id_parameter_out,
  id_property,
  id_enumValue,
}

export class KeywordCompletion {
  private constructor(
    public readonly keyword: string,
    public readonly spaceAfter = true,
    public readonly dotAfter = false,
  ) {}

  private static map = new Map<string, KeywordCompletion>();

  static create(keyword: string, spaceAfter = true, dotAfter = false) {
    if (!this.map.has(keyword)) {
      this.map.set(keyword, new KeywordCompletion(keyword, spaceAfter, dotAfter));
    }

    return this.map.get(keyword)!;
  }
}

export class SymbolCompletionSpec {
  constructor(
    toMatch: string,
    tokenTypes: Set<TokenType>,
    keywords: Set<KeywordCompletion>,
    context: string,
  ) {
    this.toMatch = toMatch;
    this.tokenTypes = tokenTypes;
    this.keywords = keywords;
    this.context = context;
  }
  toMatch: string = "";
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  keywords: Set<KeywordCompletion>;
  context: string;
}

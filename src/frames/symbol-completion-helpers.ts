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
    public readonly spaceAfter: boolean,
    public readonly dotAfter: boolean,
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
    public readonly toMatch: string,
    public readonly tokenTypes: Set<TokenType>,
    public readonly keywords: Set<KeywordCompletion>,
    public context: string,
  ) {}
}

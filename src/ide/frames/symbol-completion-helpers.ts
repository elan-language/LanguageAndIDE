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

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

export class SymbolCompletionSpec {
  constructor(
    toMatch: string,
    tokenTypes: Set<TokenType>,
    keywords: Set<string>,
    context: string,
  ) {
    this.toMatch = toMatch;
    this.tokenTypes = tokenTypes;
    this.keywords = keywords;
    this.context = context;
  }
  toMatch: string = "";
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  keywords: Set<string>;
  context: string;
}

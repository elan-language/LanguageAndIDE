export enum TokenType {
  none, // TODO Need eventually for this to be removed. Since all methods deal with Set<TokenType>, 'none' is signified by an empty array
  assignable, //TODO remove - use [variable, parameterOut]
  type, // TODO to go, in favour of more specific entries below
  idOrProcedure, // TODO remove - should not be needed as list will be made up of more specific sub-lists
  expression, // TODO, remove
  method_function,
  method_procedure,
  method_system,
  type_concrete,
  type_abstract,
  id_constant,
  id_let,
  id_variable,
  id_parameter_regular,
  id_parameter_out,
  id_property,
  id_enumValue,
}

export class SymbolCompletionSpec_Old {
  constructor(toMatch: string, tokenTypes: Set<TokenType>) {
    this.toMatch = toMatch;
    this.tokenTypes = tokenTypes;
  }
  toMatch: string = "";
  tokenTypes: Set<TokenType>;
}

export class SymbolCompletionSpec {
  constructor(toMatch: string, tokenTypes: Set<TokenType>, keywords: Set<string>, constrainingId: string) {
    this.toMatch = toMatch;
    this.tokenTypes = tokenTypes;
    this.keywords = keywords;
    this.constrainingId = constrainingId;
  }
  toMatch: string = "";
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  keywords: Set<string>;
  constrainingId: string;
}

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
  constructor(toMatch: string, tts: Set<TokenType>) {
    this.toMatch = toMatch;
    this.addTokenTypes(tts);
  }
  toMatch: string = "";
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  addTokenTypes(tokenTypes: Set<TokenType>): void {
    const toAdd = new Set<TokenType>(tokenTypes);
    // TODO Correct code is:
    // this.tokenTypes.union(toAdd);
    // Due to a build issue (on RP machine only), need to do it without 'union'
    toAdd.forEach((tt) => this.tokenTypes.add(tt));
  }
}

export class SymbolCompletionSpec {
  constructor(toMatch: string, tts: Set<TokenType>, keywords: Set<string>, constrainingId: string) {
    this.toMatch = toMatch;
    this.addTokenTypes(tts);
    this.keywords = keywords;
    this.constrainingId = constrainingId;
  }
  toMatch: string = "";
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  keywords: Set<string>;
  constrainingId: string;

  addTokenTypes(tokenTypes: Set<TokenType>): void {
    // TODO Correct code is:
    // this.tokenTypes.union(toAdd);
    // Due to a build issue (on RP machine only), need to do it without 'union'
    tokenTypes.forEach((tt) => this.tokenTypes.add(tt));
  }

  addKeyword(keyword: string) {
    const trimmed = keyword.trim();
    if (trimmed.length > 0 && !this.keywords.has(trimmed)) {
      this.keywords.add(trimmed + " ");
    }
  }
}

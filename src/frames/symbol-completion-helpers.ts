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
    constrainingId: string,
  ) {
    this.toMatch = toMatch;
    this.tokenTypes = tokenTypes;
    this.keywords = keywords;
    this.constrainingId = this.stripConstrainingId(constrainingId); 
  }
  toMatch: string = "";
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  keywords: Set<string>;
  constrainingId: string;

  // strip off trailing dot and/or arguments & brackets
  stripConstrainingId(input: string) {
    let output = input;
    if (output.endsWith(".")) {
      output = output.slice(0, output.length - 1);
    }
    if (output.endsWith(")")) {
      //TODO: needs to be more sophisticated - to ensure we get the *matching* bracket if there are multiple
      const open = output.indexOf("(");
      output = output.slice(0,open);
    }
    return output;
  }
}

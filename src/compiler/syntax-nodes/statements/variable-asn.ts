import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { AbstractDefinitionAsn } from "./abstract-definition-asn";

export class VariableAsn extends AbstractDefinitionAsn implements ElanSymbol {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  getJsKeyword(): string {
    return "let";
  }

  isLet() {
    return false;
  }
  isVariable() {
    return true;
  }
}

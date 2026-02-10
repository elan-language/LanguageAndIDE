import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { AbstractDefinitionAsn } from "./abstract-definition-asn";

export class LocalConstantAsn extends AbstractDefinitionAsn implements ElanSymbol {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  getJsKeyword(): string {
    return "const";
  }

  isLocalConstant() {
    return true;
  }

  isVariable() {
    return false;
  }
}

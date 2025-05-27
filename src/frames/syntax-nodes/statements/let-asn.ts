import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { AbstractDefinitionAsn } from "./abstract-definition-asn";

export class LetAsn extends AbstractDefinitionAsn implements ElanSymbol {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  getJsKeyword(): string {
    return "const";
  }

  isLet = true;
}

import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { AbstractDefinitionAsn } from "./abstract-definition-asn";

export class VariableAsn extends AbstractDefinitionAsn implements ElanSymbol {
  isVariableStatement = true;
  isStatement = true;

  constructor(name: AstNode, expr: AstNode, fieldId: string, scope: Scope) {
    super(name, expr, fieldId, scope);
  }

  isLet = true;

  getJsKeyword(): string {
    return "let";
  }
}

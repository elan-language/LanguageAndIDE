import { Language } from "../../ide/frames/frame-interfaces/language";
import { AstNode } from "../compiler-interfaces/ast-node";
import { IntType } from "../symbols/int-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class IntTypeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly language: Language,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return IntType.Instance.languageSpecificName(this.language);
  }

  symbolType() {
    return IntType.Instance;
  }

  toString() {
    return `${this.symbolType()}`;
  }
}

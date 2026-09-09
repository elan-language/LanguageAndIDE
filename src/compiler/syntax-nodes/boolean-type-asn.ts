import { Language } from "../../ide/frames/frame-interfaces/language";
import { AstNode } from "../compiler-interfaces/ast-node";
import { BooleanType } from "../symbols/boolean-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class BooleanTypeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly language: Language,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return BooleanType.Instance.languageSpecificName(this.language);
  }

  compileToEmptyObjectCode(): string {
    return this.symbolType().initialValue;
  }

  symbolType() {
    return BooleanType.Instance;
  }

  toString() {
    return `${this.symbolType()}`;
  }
}

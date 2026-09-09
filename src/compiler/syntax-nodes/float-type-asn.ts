import { Language } from "../../ide/frames/frame-interfaces/language";
import { AstNode } from "../compiler-interfaces/ast-node";
import { FloatType } from "../symbols/float-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class FloatTypeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly language: Language,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return FloatType.Instance.languageSpecificName(this.language);
  }

  compileToEmptyObjectCode(): string {
    return this.symbolType().initialValue;
  }

  symbolType() {
    return FloatType.Instance;
  }

  toString() {
    return `${this.symbolType()}`;
  }
}

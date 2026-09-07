import { Language } from "../../ide/frames/frame-interfaces/language";
import { AstNode } from "../compiler-interfaces/ast-node";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class StringTypeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly language: Language,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return StringType.Instance.languageSpecificName(this.language);
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return `${this.symbolType()}`;
  }
}

import { libraryKeyword } from "../../../compiler/keywords";
import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { DotAfter } from "./dot-after";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { TypeSimpleName } from "./type-simple-name";

export class TypeNameQualifiedNode extends AbstractSequence {
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  private unqualifiedName: TypeSimpleName | undefined;
  libraryQualifier: OptionalNode | undefined;

  constructor(
    file: File,
    tokenTypes: Set<TokenType> = new Set<TokenType>([
      TokenType.type_abstract,
      TokenType.type_concrete,
      TokenType.type_notInheritable,
      TokenType.type_enum,
    ]),
  ) {
    super(file);
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }

  elanSimpleTypeName(): string {
    const lang = this.file.language();
    const text = this.unqualifiedName!.matchedText;
    let elan = text;
    if (text === lang.INT_NAME) {
      elan = "Int";
    } else if (text === lang.FLOAT_NAME) {
      elan = "Float";
    } else if (text === lang.BOOL_NAME) {
      elan = "Boolean";
    } else if (text === lang.STRING_NAME) {
      elan = "String";
    } else if (text === lang.LIST_NAME) {
      elan = "List";
    }
    return elan;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.libraryQualifier = new OptionalNode(
        this.file,
        new DotAfter(this.file, new KeywordNode(this.file, libraryKeyword, false, true)),
      );
      this.addElement(this.libraryQualifier);
      this.unqualifiedName = new TypeSimpleName(this.file);
      this.addElement(this.unqualifiedName);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    let name = this.unqualifiedName?.renderAsElanSource();
    const lang = this.file.language();
    if (name === "Int") {
      name = lang.INT_NAME;
    } else if (name === "Float") {
      name = lang.FLOAT_NAME;
    } else if (name === "Boolean") {
      name = lang.BOOL_NAME;
    } else if (name === "String") {
      name = lang.STRING_NAME;
    }
    const qualifier = this.libraryQualifier?.matchedNode ? `<el-kw>${libraryKeyword}</el-kw>.` : ``;
    return `${qualifier}<el-type>${name}</el-type>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }
}

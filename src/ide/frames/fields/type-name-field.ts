import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { TypeSimpleName } from "../parse-nodes/type-simple-name";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractField } from "./abstract-field";

export class TypeNameField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.useHtmlTags = true;
    this.setPlaceholder("Name");
  }

  helpId(): string {
    return "TypeNameField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new TypeSimpleName(
      this.getFile(),
      new Set<TokenType>(),
      false /* allowBuiltIns */,
    );
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/[^a-zA-Z0-9_]/);

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_type`;
  }
  public textAsHtml(): string {
    if (this.selected) {
      return super.textAsHtml();
    } else {
      return `<el-type>${this.text}</el-type>`;
    }
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

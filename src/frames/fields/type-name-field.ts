import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";

import { ParseNode } from "../parse-nodes/parse-node";
import { TypeSimpleNode } from "../parse-nodes/type-simple-node";
import { AbstractField } from "./abstract-field";

export class TypeNameField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.useHtmlTags = true;
    this.placeholder = "Name";
    this.help = `A class name, like any type name, must begin with an upper-case letter, , optionally followed by any letters (lower or upper case), and/or numeric digits, and/or underscores - nothing else.`;
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new TypeSimpleNode();
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/[^a-zA-Z0-9_]/);

  getIdPrefix(): string {
    return "type";
  }
  public textAsHtml(): string {
    if (this.selected) {
      return super.textAsHtml();
    } else {
      return `<el-type>${this.text}</el-type>`;
    }
  }
}

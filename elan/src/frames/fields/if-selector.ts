import { AbstractField } from "./abstract-field";
import { editorEvent } from "../interfaces/editor-event";
import { Else } from "../statements/else";
import { ParseStatus } from "../status-enums";
import { CodeSource } from "../code-source";
import { ParseNode } from "../parse-nodes/parse-node";
import { Regexes } from "./regexes";

export class IfSelector extends AbstractField {
  protected placeholderIsCode: boolean = true;
  private else: Else;

  constructor(holder: Else) {
    super(holder);
    this.else = holder;
    this.setPlaceholder("if");
    this.setOptional(true);
    this.setParseStatus(ParseStatus.valid);
    this.help = `Type 'i' to add an 'if condition' to this 'else clause'.`;
  }

  initialiseRoot(): ParseNode {
    throw new Error("Method not implemented.");
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) => "";

  parseFrom(source: CodeSource): void {
    if (source.isMatchRegEx(Regexes.ifClause)) {
      source.remove("if ");
      this.else.setIfExtension(true);
    }
  }

  getIdPrefix(): string {
    return "elif";
  }

  indent(): string {
    return "";
  }

  renderAsSource(): string {
    return ``;
  }

  processKey(keyEvent: editorEvent): boolean {
    this.codeHasChanged = false;
    const char = keyEvent.key;
    const empty = this.text === "";
    if (empty && char === "i") {
      this.else.setIfExtension(true);
      this.else.condition.select();
      this.codeHasChanged = true;
    } else {
      this.codeHasChanged = super.processKey(keyEvent);
    }
    return this.codeHasChanged;
  }
}

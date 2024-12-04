import { CodeSource } from "../code-source";
import { editorEvent } from "../interfaces/editor-event";
import { ifKeyword } from "../keywords";
import { KeywordNode } from "../parse-nodes/keyword-node";
import { OptionalNode } from "../parse-nodes/optional-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { Else } from "../statements/else";
import { ParseStatus } from "../status-enums";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class IfSelector extends AbstractField {
  protected placeholderIsCode: boolean = true;
  private else: Else;

  constructor(holder: Else) {
    super(holder);
    this.else = holder;
    this.setPlaceholder("<i>if</i>");
    this.setOptional(true);
    this.setParseStatus(ParseStatus.valid);
    this.help = `Type 'i' to add an 'if condition' to this 'else clause'.`;
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new OptionalNode(new KeywordNode(ifKeyword));
    return this.rootNode;
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
    if (char?.length === 1) {
      if (char === "i" && this.text === "") {
        this.else.setIfExtension(true);
        this.else.condition.select();
        this.codeHasChanged = true;
      }
    } else {
      this.codeHasChanged = super.processKey(keyEvent);
    }
    return this.codeHasChanged;
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

import { ifKeyword } from "../../../compiler/keywords";
import { CodeSource } from "../frame-interfaces/code-source";
import { editorEvent } from "../frame-interfaces/editor-event";
import { ParseNode } from "../frame-interfaces/parse-node";
import { KeywordNode } from "../parse-nodes/keyword-node";
import { OptionalNode } from "../parse-nodes/optional-node";
import { Else } from "../statements/else";
import { ParseStatus } from "../status-enums";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class IfSelectorField extends AbstractField {
  protected placeholderIsCode: boolean = true;
  private else: Else;

  constructor(holder: Else) {
    super(holder);
    this.else = holder;
    this.setPlaceholder("<i>if</i>");
    this.setOptional(true);
    this.setParseStatus(ParseStatus.valid);
  }

  helpId(): string {
    return "IfSelectorField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new OptionalNode(new KeywordNode(ifKeyword));
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (_source: CodeSource) => "";

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

  renderAsElanSource(): string {
    return ``;
  }

  processKey(keyEvent: editorEvent): boolean {
    this.codeHasChanged = false;
    const char = keyEvent.key;
    if (!keyEvent.modKey.control && char?.length === 1) {
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
    return ""; //Because *syntax* completion kicks in as soon as you type 'i' and symbol completion is confusing (and causes problems)
  }
}

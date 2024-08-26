import { CodeSource } from "../code-source";
import { editorEvent } from "../interfaces/editor-event";
import { Frame } from "../interfaces/frame";
import { KeywordNode } from "../parse-nodes/keyword-node";
import { OptionalNode } from "../parse-nodes/optional-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class OptionalKeyword extends AbstractField {
  isParseByNodes = true;
  protected placeholderIsCode: boolean = true;
  private optionalKeyword = true;
  private keyword: string;

  constructor(holder: Frame, keyword: string) {
    super(holder);
    this.setOptional(true);
    this.keyword = keyword;
    this.placeholder = keyword;
    this.help = `Type one or more letters of the keyword shown to add this optional keyword into the code.`;
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new OptionalNode(new KeywordNode(this.keyword));
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readMatching(/[^\S\r\n]*[a-z]*/);

  keywordExists(): boolean {
    return this.text.trim() === this.keyword;
  }

  specify(): void {
    this.text = this.keyword;
    this.alertHolderToUpdate();
  }

  processKey(e: editorEvent): boolean {
    this.codeHasChanged = true;
    const key = e.key;
    if (key && key.length === 1 && this.keyword.startsWith(key.toLowerCase())) {
      if (this.overtyper.hasNotConsumed(key)) {
        this.text = this.keyword;
        this.alertHolderToUpdate();
        this.getHolder().selectFieldAfter(this);
        this.codeHasChanged = true;
      }
    } else if (key === "Delete" || key === "Backspace") {
      this.text = "";
      this.alertHolderToUpdate();
      this.getHolder().selectFieldAfter(this);
      this.codeHasChanged = true;
    } else {
      this.codeHasChanged = super.processKey(e);
    }
    return this.codeHasChanged;
  }

  public textAsHtml(): string {
    if (this.selected) {
      return super.textAsHtml();
    } else {
      const c = this.keywordExists() ? `<keyword> ${this.text}</keyword>` : ``;
      return c;
    }
  }
}

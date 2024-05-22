import { Selectable } from "../interfaces/selectable";
import { CompileStatus, DisplayStatus, ParseStatus } from "../status-enums";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { editorEvent } from "../interfaces/editor-event";
import { CodeSource } from "../code-source";
import {
  escapeAngleBrackets,
  helper_compileMsgAsHtml,
  helper_deriveCompileStatusFromErrors,
  helper_CompileOrParseAsDisplayStatus,
  isCollapsible,
} from "../helpers";
import { ParseNode } from "../parse-nodes/parse-node";
import { AstNode } from "../interfaces/ast-node";
import { CSV } from "../parse-nodes/csv";
import { CompileError } from "../compile-error";
import { UnknownType } from "../symbols/unknown-type";
import { Transforms } from "../syntax-nodes/transforms";
import { Overtyper } from "../overtyper";

export abstract class AbstractField implements Selectable, Field {
  public isField: boolean = true;
  text: string = "";
  protected placeholder: string = "";
  protected placeholderIsCode: boolean = false;
  protected useHtmlTags: boolean = false;
  protected htmlId: string = "";
  protected selected: boolean = false;
  private focused: boolean = false;
  private _classes = new Array<string>();
  private holder: Frame;
  private _optional: boolean = false;
  protected map: Map<string, Selectable>;
  private _parseStatus: ParseStatus;
  private _compileStatus: CompileStatus = CompileStatus.default;
  cursorPos: number = 0; //Relative to LH end of text
  protected rootNode?: ParseNode;
  protected astNode?: AstNode;
  protected completion: string = "";
  parseErrorMsg: string = "";
  protected help: string = "help TBD";
  overtyper = new Overtyper();

  constructor(holder: Frame) {
    this.holder = holder;
    const map = holder.getMap();
    this.htmlId = `${this.getIdPrefix()}${map.size}`;
    map.set(this.htmlId, this);
    this.map = map;
    this._parseStatus = ParseStatus.incomplete; // (see setOptional)
  }
  getHtmlId(): string {
    return this.htmlId;
  }
  abstract initialiseRoot(): ParseNode;
  abstract readToDelimiter: (source: CodeSource) => string;

  alertHolderToUpdate(): void {
    this.getHolder().fieldUpdated(this);
  }

  parseCurrentText(): void {
    const root = this.initialiseRoot();
    this.parseCompleteTextUsingNode(this.text, root);
  }

  parseFrom(source: CodeSource): void {
    const text = this.readToDelimiter(source);
    const root = this.initialiseRoot();
    this.parseCompleteTextUsingNode(text, root);
    if (this._parseStatus !== ParseStatus.valid) {
      throw new Error(`Parse error at ${source.getRemainingCode()}`);
    }
  }

  parseCompleteTextUsingNode(text: string, root: ParseNode): void {
    this.parseErrorMsg = "";
    if (text.length === 0) {
      this.setParseStatus(
        this.isOptional() ? ParseStatus.valid : ParseStatus.incomplete,
      );
    } else {
      root.parseText(text.trimStart());
      if (
        root.remainingText.trim().length > 0 ||
        root.status === ParseStatus.invalid
      ) {
        this.setParseStatus(ParseStatus.invalid);
        this.text = text.trimStart();
      } else {
        this.setParseStatus(root.status);
        this.text = root.renderAsSource();
      }
    }
    if (this._parseStatus === ParseStatus.invalid) {
      this.parseErrorMsg = root.errorMessage;
    }
  }

  getCompletion(): string {
    return this.rootNode ? this.rootNode.getCompletionAsHtml() : "";
  }

  getPlainTextCompletion(): string {
    const comps = this.getCompletion();
    const i = comps.indexOf("<pr>");
    return i === -1 ? comps : comps.substring(0, i);
  }

  setOptional(optional: boolean): void {
    this._optional = optional;
    if (this.text === "" && optional) {
      this._parseStatus = ParseStatus.valid;
    } else if (this.text === "" && !optional) {
      this._parseStatus === ParseStatus.incomplete;
    }
  }

  getOptional(): boolean {
    return this._optional;
  }

  isOptional(): boolean {
    return this._optional;
  }
  processKey(e: editorEvent): boolean {
    let codeHasChanged = false;
    const key = e.key;
    const textLen = this.text.length;
    switch (key) {
      case "Escape": {
        this.holder.select(true, false);
        break;
      }
      case "Home": {
        this.cursorPos = 0;
        break;
      }
      case "End": {
        this.cursorPos = textLen;
        break;
      }
      case "Tab": {
        this.tab(e.modKey.shift);
        break;
      }
      case "Enter": {
        this.enter(e.modKey.shift);
        break;
      }
      case "ArrowLeft": {
        if (this.cursorPos > 0) {
          this.cursorPos--;
        }
        break;
      }
      case "ArrowRight": {
        this.cursorRight();
        break;
      }
      case "ArrowUp": {
        this.getHolder().getPreviousFrameInTabOrder().select(true, false);
        break;
      }
      case "ArrowDown": {
        this.getHolder().getNextFrameInTabOrder().select(true, false);
        break;
      }
      case "Backspace": {
        if (this.cursorPos > 0) {
          const reduced =
            this.text.slice(0, this.cursorPos - 1) +
            this.text.slice(this.cursorPos);
          this.text = reduced;
          this.cursorPos--;
          const cursorBeforeParse = this.cursorPos;
          this.parseCurrentText();
          const afterParse = this.text.length;
          if (this.text.length > reduced.length) {
            this.text = reduced;
            this.cursorPos = cursorBeforeParse;
          }
          codeHasChanged = true;
        }
        break;
      }
      case "Delete": {
        if (this.cursorPos < textLen) {
          this.text =
            this.text.slice(0, this.cursorPos) +
            this.text.slice(this.cursorPos + 1);
          this.parseCurrentText();
          codeHasChanged = true;
        }
        break;
      }
      default: {
        if (key === "o" && e.modKey.control && isCollapsible(this.holder)) {
          this.holder.expandCollapse();
        } else if (key === "O" && e.modKey.control) {
          this.holder.expandCollapseAll();
        } else if (key?.length === 1) {
          this.processInput(key);
          codeHasChanged = true;
        }
      }
    }
    return codeHasChanged;
  }

  private processInput(key: string) {
    if (this.overtyper.preProcessor(key)) {
      this.text =
        this.text.slice(0, this.cursorPos) +
        key +
        this.text.slice(this.cursorPos);
      const preParse = this.text.length;
      this.parseCurrentText();
      const afterParse = this.text.length;
      this.cursorPos = this.cursorPos + 1 + afterParse - preParse;
    }
  }

  private cursorRight() {
    const textLen = this.text.length;
    if (this.cursorPos < textLen) {
      this.cursorPos++;
    } else {
      const completions = this.getPlainTextCompletion();
      if (completions.length > 0) {
        this.text = this.text + completions;
        this.parseCurrentText();
        this.cursorPos = this.text.length;
      }
    }
  }

  private tab(back: boolean) {
    if (back) {
      this.holder.selectFieldBefore(this);
    } else {
      this.holder.selectFieldAfter(this);
    }
  }

  private enter(before: boolean) {
    const peerFields = this.holder.getFields();
    const last = peerFields.length - 1;
    const thisField = peerFields.indexOf(this);
    if (before && thisField === 0) {
      this.holder.insertPeerSelector(before);
    } else if (!before && thisField === last) {
      this.holder.insertSelectorAfterLastField();
    } else {
      this.tab(before);
    }
  }

  isFocused(): boolean {
    return this.focused;
  }
  getHolder(): Frame {
    return this.holder;
  }
  getIdPrefix(): string {
    return "text";
  }
  focus(): void {
    this.focused = true;
  }
  defocus(): void {
    this.focused = false;
  }

  deselectAll() {
    for (const f of this.map.values()) {
      if (f.isSelected()) {
        f.deselect();
      }
    }
  }
  protected setParseStatus(newStatus: ParseStatus) {
    this._parseStatus = newStatus;
  }
  readParseStatus(): ParseStatus {
    return this._parseStatus!;
  }
  resetCompileStatusAndErrors(): void {
    this._compileStatus = CompileStatus.default;
    this.compileErrors = [];
  }
  readCompileStatus(): CompileStatus {
    return this._compileStatus;
  }
  updateCompileStatus(): void {
    this.compileErrors = this.aggregateCompileErrors(); //Needed in this case because the compile errors will be on the ASTNodes
    this._compileStatus = helper_deriveCompileStatusFromErrors(this.compileErrors);
  }
  select(withFocus?: boolean, multiSelect?: boolean, selection?: number): void {
    this.deselectAll();
    this.selected = true;
    this.focus();
    this.cursorPos = selection ?? this.text.length;
  }

  isSelected(): boolean {
    return this.selected === true;
  }

  deselect(): void {
    this.selected = false;
    this.defocus();
  }

  setPlaceholder(placeholder: string): void {
    this.placeholder = placeholder;
  }

  public textAsHtml(): string {
    let html = "";
    if (this.selected) {
      html = `<input spellcheck="false" data-cursor="${this.cursorPos}" size="${this.charCount()}" style="width: ${this.fieldWidth()}" value="${this.escapeDoubleQuotes(this.text)}">`;
    } else {
      if (this.rootNode && this._parseStatus === ParseStatus.valid) {
        html = this.rootNode.renderAsHtml();
      } else {
        html = escapeAngleBrackets(this.text);
      }
    }
    return html;
  }

  public charCount(): number {
    return this.text ? (this.text.length > 1 ? this.text.length - 1 : 1) : 1;
  }

  public fieldWidth(): string {
    return this.text.length === 0 ? "2px" : `${this.text.length}ch`;
  }

  private escapeDoubleQuotes(str: string): string {
    return str.replace(/"/g, "&quot;");
  }

  public textAsSource(): string {
    return this.text;
  }

  protected setClasses() {
    this._classes = new Array<string>();
    this.pushClass(this.selected, "selected");
    this.pushClass(this.focused, "focused");
    this.pushClass(!this.text, "empty");
    this.pushClass(this.isOptional(), "optional");
    this._classes.push(DisplayStatus[this.readDisplayStatus()]);
  }

  private readDisplayStatus(): DisplayStatus {
    return helper_CompileOrParseAsDisplayStatus(this);
  }

  protected pushClass(flag: boolean, cls: string) {
    if (flag) {
      this._classes.push(cls);
    }
  }

  protected cls(): string {
    this.setClasses();
    return this._classes.join(" ");
  }

  protected getMessage(): string {
    return this.parseErrorMsg !== ""
      ? `<msg class="${DisplayStatus[DisplayStatus.error]}"> ${this.parseErrorMsg}</msg>`
      : helper_compileMsgAsHtml(this);
  }

  renderAsHtml(): string {
    return `<field id="${this.htmlId}" class="${this.cls()}" tabindex=0><text>${this.textAsHtml()}</text><placeholder>${this.placeholder}</placeholder><completion>${this.getCompletion()}</completion>${this.getMessage()}<help title="${this.help}">?</help></field>`;
  }

  indent(): string {
    return "";
  }

  renderAsSource(): string {
    return this.textAsSource();
  }

  setFieldToKnownValidText(text: string) {
    this.text = text;
    this._parseStatus = ParseStatus.valid;
  }

  getOrTransformAstNode(transforms: Transforms) {
    if (!this.astNode) {
      if (this.rootNode instanceof CSV) {
        const scope = this.getHolder();
        this.astNode = transforms.transformMany(
          this.rootNode as CSV,
          this.htmlId,
          scope,
        );
      } else {
        this.astNode = transforms.transform(
          this.rootNode,
          this.htmlId,
          this.getHolder(),
        );
      }
    }
    return this.astNode;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    if (this.rootNode && this.rootNode.status === ParseStatus.valid) {
      return this.getOrTransformAstNode(transforms)?.compile() ?? "";
    }

    return "";
  }

  compileErrors: CompileError[] = [];
  aggregateCompileErrors(): CompileError[] {
    const cc = this.astNode ? this.astNode.aggregateCompileErrors() : [];
    return this.compileErrors.concat(cc);
  }

  symbolType(transforms: Transforms) {
    const astNode = this.getOrTransformAstNode(transforms);
    if (astNode) {
      return astNode.symbolType();
    }
    return UnknownType.Instance;
  }
}

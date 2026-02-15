import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { propertyKeyword } from "../../../compiler/keywords";
import {
  escapeHtmlChars,
  helper_compileMsgAsHtmlNew,
  helper_CompileOrParseAsDisplayStatus,
  helper_deriveCompileStatusFromErrors,
  isCollapsible,
  removeHtmlTags,
} from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { editorEvent } from "../frame-interfaces/editor-event";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { Selectable } from "../frame-interfaces/selectable";
import { Overtyper } from "../overtyper";
import { CompileStatus, DisplayColour, ParseStatus } from "../status-enums";
import {
  getFilteredSymbols,
  KeywordCompletion,
  removeIfSingleFullMatch,
  SymbolCompletionSpec,
} from "../symbol-completion-helpers";
import { SymbolWrapper } from "../symbol-wrapper";

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
  protected _parseStatus: ParseStatus;
  cursorPos: number = 0; //Relative to LH end of text
  selectionEnd: number = 0; //Relative to LH end of text
  protected rootNode?: ParseNode;
  protected completion: string = "";
  overtyper = new Overtyper();
  codeHasChanged: boolean = false;
  allPossibleSymbolCompletions: SymbolWrapper[] = [];
  protected symbolToMatch: string = "";
  protected selectedSymbolCompletion?: SymbolWrapper;
  protected showingSymbolCompletion: boolean = false;
  helpActive: boolean = false;

  constructor(holder: Frame) {
    this.holder = holder;
    const map = holder.getMap();
    this.htmlId = `${this.getIdPrefix()}${this.getFile().getNextId()}`;
    map.set(this.htmlId, this);
    this.map = map;
    this._parseStatus = ParseStatus.incomplete; // (see setOptional)
  }

  getRootNode(): ParseNode | undefined {
    return this.rootNode;
  }

  getFile(): File {
    return this.holder.getFile();
  }

  abstract helpId(): string;

  getHtmlId(): string {
    return this.htmlId;
  }
  abstract initialiseRoot(): ParseNode;
  abstract readToDelimiter: (source: CodeSource) => string;

  showHelp() {
    this.helpActive = true;
  }

  alertHolderToUpdate(): void {
    this.getHolder().fieldUpdated(this);
  }

  parseCurrentText(): void {
    const root = this.initialiseRoot();
    this.parseCompleteTextUsingNode(this.text, root);
  }

  parseFrom(source: CodeSource): void {
    this.holder.hasBeenAddedTo();
    const text = this.readToDelimiter(source);
    const root = this.initialiseRoot();
    this.parseCompleteTextUsingNode(text, root);
    if (this.isOptional() && this._parseStatus === ParseStatus.empty) {
      this._parseStatus = ParseStatus.valid;
    } else if (this._parseStatus === ParseStatus.invalid) {
      throw new Error(`Parse error at ${source.getRemainingCode()}`);
    }
  }

  parseCompleteTextUsingNode(text: string, root: ParseNode): void {
    if (text.length === 0) {
      this.setParseStatus(this.isOptional() ? ParseStatus.valid : ParseStatus.incomplete);
    } else {
      root.parseText(text.trimStart());
      if (root.remainingText.trim().length > 0 || root.status === ParseStatus.invalid) {
        this.setParseStatus(ParseStatus.invalid);
        this.text = text.trimStart();
      } else {
        this.setParseStatus(root.status);
        this.text = root.renderAsElanSource();
      }
    }
  }

  getCompletion(): string {
    return this.rootNode ? this.rootNode.getSyntaxCompletionAsHtml() : "";
  }

  getPlainTextCompletion(): string {
    const comps = this.getCompletion();
    const i = comps.indexOf("<i>");
    return i === -1 ? comps : comps.substring(0, i);
  }

  setOptional(optional: boolean): void {
    this._optional = optional;
    if (this.text === "" && optional) {
      this._parseStatus = ParseStatus.valid;
    } else if (this.text === "" && !optional) {
      this._parseStatus = ParseStatus.incomplete;
    }
  }

  getOptional(): boolean {
    return this._optional;
  }

  isOptional(): boolean {
    return this._optional;
  }

  processAutocompleteText(txt: string | undefined) {
    if (txt) {
      this.selectedSymbolCompletion = this.allPossibleSymbolCompletions.find(
        (s) => s.displayName === txt,
      );
    }
  }

  setSelection(start: number, end?: number) {
    this.cursorPos = start;
    this.selectionEnd = end ?? start;
  }

  deleteSelection(selection: [number, number]) {
    const [start, end] = selection;
    const textLen = this.text.length;
    if (start !== textLen) {
      const endMod = start === end ? start + 1 : end;
      this.text = this.text.slice(0, start) + this.text.slice(endMod);
      this.setSelection(start);
    }
  }

  deleteNewSelection(e: editorEvent) {
    if (e.selection) {
      this.deleteSelection(e.selection);
    }
  }

  hasSelection() {
    return this.cursorPos !== this.selectionEnd;
  }

  deleteExistingSelection() {
    if (this.hasSelection()) {
      this.deleteSelection([this.cursorPos, this.selectionEnd]);
    }
  }

  private controlKeys = ["o", "O", "ArrowLeft", "ArrowRight", "a", "v", "?"];

  processKey(e: editorEvent): boolean {
    this.codeHasChanged = false;
    const key = e.key;

    if (e.modKey.control && !this.controlKeys.includes(key ?? "")) {
      return false;
    }

    const textLen = this.text.length;
    this.processAutocompleteText(e.optionalData);
    switch (key) {
      case "Home": {
        this.setSelection(0);
        break;
      }
      case "End": {
        this.setSelection(textLen);
        break;
      }
      case "Tab": {
        this.tab(e.modKey.shift);
        this.noLongerEditingField();
        break;
      }
      case "Enter": {
        this.enter();
        break;
      }
      case "ArrowLeft": {
        if (e.modKey.control) {
          this.cursorWordLeft(e.modKey.shift);
        } else {
          this.cursorLeft(e.modKey.shift);
        }
        break;
      }
      case "ArrowRight": {
        if (e.modKey.control) {
          this.cursorWordRight(e.modKey.shift);
        } else {
          this.cursorRight(e.modKey.shift);
        }
        break;
      }
      case "ArrowUp": {
        if (this.showingSymbolCompletion) {
          this.selectFromAutoCompleteItems(true);
        }
        break;
      }
      case "ArrowDown": {
        if (this.showingSymbolCompletion) {
          this.selectFromAutoCompleteItems(false);
        }
        break;
      }
      case "ContextMenu": {
        if (this.getHolder().isSelected()) {
          return this.getHolder().processKey(e);
        }
      }
      case "Backspace": {
        if (this.holder.isNew) {
          this.holder.deleteIfPermissible();
          this.codeHasChanged = true;
        } else if (this.hasSelection()) {
          this.deleteExistingSelection();
          this.parseCurrentText();
        } else if (this.cursorPos > 0) {
          const reduced = this.text.slice(0, this.cursorPos - 1) + this.text.slice(this.cursorPos);
          this.text = reduced;
          this.setSelection(this.cursorPos - 1);
          const cursorBeforeParse = this.cursorPos;
          this.parseCurrentText();
          if (this.text.length > reduced.length) {
            this.text = reduced;
            this.setSelection(cursorBeforeParse);
          }
          this.codeHasChanged = true;
          this.editingField();
        }
        break;
      }
      case "Delete": {
        this.deleteNewSelection(e);
        this.parseCurrentText();
        this.codeHasChanged = true;
        this.editingField();
        break;
      }
      case "t": {
        if (e.modKey.alt) {
          this.getFile().removeAllSelectorsThatCanBe();
          break;
        }
      }
      case "a": {
        if (e.modKey.control) {
          this.setSelection(0, this.text.length);
          break;
        }
      }
      case "?": {
        if (e.modKey.control) {
          this.showHelp();
          break;
        }
      }
      case "v": {
        if (e.modKey.control) {
          const toPaste = e.optionalData ?? "";
          this.deleteExistingSelection();
          for (const c of toPaste) {
            this.processInput(c);
          }
          this.codeHasChanged = true;
          this.holder.hasBeenAddedTo();
          this.editingField();
          this.getFile().removeAllSelectorsThatCanBe();
          break;
        }
      }
      default: {
        if (key === "o" && e.modKey.control && isCollapsible(this.holder)) {
          this.holder.expandCollapse();
          this.noLongerEditingField();
        } else if (key === "O" && e.modKey.control) {
          this.holder.expandCollapseAll();
          this.noLongerEditingField();
        } else if (key?.length === 1) {
          this.deleteExistingSelection();
          this.processInput(key);
          this.codeHasChanged = true;
          this.holder.hasBeenAddedTo();
          this.editingField();
        }
      }
    }
    if (this.codeHasChanged) {
      this.selectedSymbolCompletion = undefined;
    }

    return this.codeHasChanged;
  }

  editingField(): void {
    this.getFile().setFieldBeingEdited(true);
  }

  noLongerEditingField(): void {
    this.getFile().setFieldBeingEdited(false);
    this.codeHasChanged = true;
  }

  isEndMarker(_key: string) {
    return false;
  }

  private processInput(key: string) {
    if (this.overtyper.hasNotConsumed(key)) {
      if (this.isEndMarker(key)) {
        this.enter();
      } else {
        this.text = this.text.slice(0, this.cursorPos) + key + this.text.slice(this.cursorPos);
        const preParse = this.text.length;
        this.parseCurrentText();
        const afterParse = this.text.length;
        this.setSelection(this.cursorPos + 1 + afterParse - preParse);
      }
    }
  }

  private cursorSelectRight() {
    const textLen = this.text.length;
    if (this.selectionEnd < textLen) {
      this.setSelection(this.cursorPos, this.selectionEnd + 1);
    }
  }

  private cursorSelectLeft() {
    if (this.cursorPos > 0) {
      this.setSelection(this.cursorPos - 1, this.selectionEnd);
    }
  }

  private cursorMoveRight() {
    const textLen = this.text.length;
    if (this.cursorPos < textLen) {
      this.setSelection(this.cursorPos + 1);
    } else {
      const completions = this.getPlainTextCompletion();
      if (completions.length > 0) {
        this.text = this.text + completions;
        this.parseCurrentText();
        this.setSelection(this.text.length);
        this.codeHasChanged = true;
      }
    }
  }

  private cursorMoveLeft() {
    if (this.cursorPos > 0) {
      this.setSelection(this.cursorPos - 1);
    }
  }

  private cursorRight(shift: boolean) {
    if (shift) {
      this.cursorSelectRight();
    } else {
      this.cursorMoveRight();
    }
  }

  private cursorLeft(shift: boolean) {
    if (shift) {
      this.cursorSelectLeft();
    } else {
      this.cursorMoveLeft();
    }
  }

  private isWordBreakCharRight(c: string) {
    return c === " " || c === "." || c === "(";
  }

  private isWordBreakCharLeft(c: string) {
    return c === " " || c === "." || c === ")";
  }

  private cursorSelectWordRight() {
    const textLen = this.text.length;
    if (this.selectionEnd < textLen) {
      for (let i = this.selectionEnd + 1; i < textLen; i++) {
        const nextChar = this.text[i];

        if (this.isWordBreakCharRight(nextChar)) {
          this.setSelection(this.cursorPos, i);
          return;
        }
      }
      this.setSelection(this.cursorPos, textLen);
    }
  }

  private cursorMoveWordRight() {
    const textLen = this.text.length;
    if (this.cursorPos < textLen) {
      for (let i = this.cursorPos + 1; i < textLen; i++) {
        const nextChar = this.text[i];

        if (this.isWordBreakCharRight(nextChar)) {
          this.setSelection(i);
          return;
        }
      }
      this.setSelection(textLen);
    }
  }

  private cursorWordRight(shift: boolean) {
    if (shift) {
      this.cursorSelectWordRight();
    } else {
      this.cursorMoveWordRight();
    }
  }

  private cursorSelectWordLeft() {
    if (this.cursorPos > 0) {
      // if we start next to a break we should skip over it
      const startIndex = this.isWordBreakCharLeft(this.text[this.cursorPos - 1])
        ? this.cursorPos - 1
        : this.cursorPos;

      for (let i = startIndex; i > 0; i--) {
        const nextChar = this.text[i - 1];

        if (this.isWordBreakCharLeft(nextChar)) {
          this.setSelection(i, this.selectionEnd);
          return;
        }
      }
      this.setSelection(0, this.selectionEnd);
    }
  }

  private cursorMoveWordLeft() {
    if (this.cursorPos > 0) {
      // if we start next to a break we should skip over it
      const startIndex = this.isWordBreakCharLeft(this.text[this.cursorPos - 1])
        ? this.cursorPos - 1
        : this.cursorPos;

      for (let i = startIndex; i > 0; i--) {
        const nextChar = this.text[i - 1];

        if (this.isWordBreakCharLeft(nextChar)) {
          this.setSelection(i);
          return;
        }
      }
      this.setSelection(0);
    }
  }

  private cursorWordLeft(shift: boolean) {
    if (shift) {
      this.cursorSelectWordLeft();
    } else {
      this.cursorMoveWordLeft();
    }
  }

  private replaceAutocompletedText() {
    // todo this will need refinement

    if (this.symbolToMatch !== "") {
      const li = this.text.lastIndexOf(this.symbolToMatch);
      this.text = this.text.slice(0, li);
    }

    const propertyPrefix = `${propertyKeyword}.`;
    const appendText = this.selectedSymbolCompletion?.insertedText ?? "";

    if (this.text === propertyPrefix && appendText.startsWith(propertyPrefix)) {
      this.text = "";
    }

    const optSpace = this.text && this.selectedSymbolCompletion?.isKeyword ? " " : "";

    this.text = `${this.text}${optSpace}${appendText}`;
    this.selectedSymbolCompletion = undefined;
    this.parseCurrentText();
    this.setSelection(this.text.length);
    this.codeHasChanged = true;
    this.holder.hasBeenAddedTo();
  }

  private tab(back: boolean) {
    if (back) {
      this.holder.selectFieldBefore(this);
    } else if (this.selectedSymbolCompletion) {
      this.replaceAutocompletedText();
    } else {
      const completions = this.getPlainTextCompletion();
      if (completions.length > 0) {
        this.cursorRight(false);
      } else {
        this.holder.selectFieldAfter(this);
      }
    }
  }

  private enter() {
    if (this.selectedSymbolCompletion) {
      this.replaceAutocompletedText();
    } else {
      const completions = this.getPlainTextCompletion();
      if (completions.length > 0) {
        this.cursorRight(false);
      } else {
        const peerFields = this.holder.getFields();
        const last = peerFields.length - 1;
        const thisField = peerFields.indexOf(this);
        if (thisField === last) {
          this.holder.selectNextFrame();
        } else {
          this.tab(false);
        }
        this.noLongerEditingField();
      }
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
    this.noLongerEditingField();
  }
  protected setParseStatus(newStatus: ParseStatus) {
    this._parseStatus = newStatus;
  }
  readParseStatus(): ParseStatus {
    return this._parseStatus!;
  }

  readCompileStatus(): CompileStatus {
    return helper_deriveCompileStatusFromErrors(
      this.getFile().getAst(false)?.getCompileErrorsFor(this.htmlId) ?? [],
    );
  }

  onClick(withFocus?: boolean, multiSelect?: boolean, selection?: [number, number]): void {
    if (!this.isWithinAGhostedFrame()) {
      const parentSelected = this.getHolder().isSelected();
      if (this.selected || parentSelected || (selection && selection[0] !== selection[1])) {
        this.select(withFocus, multiSelect, selection);
      } else {
        this.getHolder().select(true);
      }
    }
  }

  select(_withFocus?: boolean, _multiSelect?: boolean, selection?: [number, number]): void {
    if (!this.isWithinAGhostedFrame()) {
      this.deselectAll();
      this.selected = true;
      this.focus();
      if (selection) {
        let [start, end] = selection;

        if (start === this.cursorPos && end === this.selectionEnd) {
          // selecting same range so clear selection
          // ie we select on first click but if you then click on the selected input we send same selection and clear it
          start = end = this.cursorPos;
        }

        this.setSelection(start, end);
      } else {
        this.setSelection(this.text.length);
      }
    }
  }

  isSelected(): boolean {
    return this.selected === true;
  }

  deselect(): void {
    this.selected = false;
    this.defocus();
    this.noLongerEditingField();
  }

  setPlaceholder(placeholder: string): void {
    this.placeholder = placeholder;
  }

  public textAsHtml(): string {
    let html = "";
    if (this.selected) {
      html = this.fieldAsInput() + this.symbolCompletion();
    } else {
      if (this.rootNode && this._parseStatus === ParseStatus.valid) {
        html = this.rootNode.renderAsHtml();
      } else {
        html = escapeHtmlChars(this.text);
      }
    }
    return html;
  }

  public textAsExport(): string {
    return this.rootNode && this._parseStatus === ParseStatus.valid
      ? this.rootNode.renderAsExport()
      : "";
  }

  protected fieldAsInput(): string {
    return `<input spellcheck="false" data-cursorstart="${this.cursorPos}" data-cursorend="${this.selectionEnd}" size="${this.charCount()}" style="width: ${this.fieldWidth()}" value="${this.escapeDoubleQuotesAndEscapes(this.text)}" tabindex="-1">`;
  }

  public charCount(): number {
    return this.text ? (this.text.length > 1 ? this.text.length - 1 : 1) : 1;
  }

  public fieldWidth(): string {
    return this.text.length === 0 ? "2px" : `${this.text.length}ch`;
  }

  private escapeDoubleQuotesAndEscapes(str: string): string {
    return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
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
    this._classes.push(DisplayColour[this.readDisplayStatus()]);
  }

  private readDisplayStatus(): DisplayColour {
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
    const cls = DisplayColour[DisplayColour.error];
    return this._parseStatus === ParseStatus.invalid
      ? `<el-msg class="${cls}"> Invalid.${this.helpAsHtml()}</el-msg>`
      : helper_compileMsgAsHtmlNew(this.getFile(), this);
  }

  helpAsHtml(): string {
    const active = this.helpActive ? ` class="active"` : "";
    this.helpActive = false;

    return `<el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#${this.helpId()}" target="help-iframe" tabindex="-1"${active}>?</a></el-help>`;
  }

  renderAsHtml(): string {
    return `<el-field id="${this.htmlId}" class="${this.cls()}" tabindex="-1"><el-txt>${this.textAsHtml()}</el-txt><el-place>${this.placeholder}</el-place><el-compl>${this.getCompletion().replace("<of", "&lt;of")}</el-compl>${this.getMessage()}${this.helpAsHtml()}</el-field>`;
  }

  renderAsExport(): string {
    return removeHtmlTags(this.textAsHtml());
  }

  indent(): string {
    return "";
  }

  renderAsElanSource(): string {
    return this.textAsSource();
  }

  setFieldToKnownValidText(text: string) {
    this.text = text;
    const root = this.initialiseRoot();
    this.parseCompleteTextUsingNode(this.text, root);
    this._parseStatus = ParseStatus.valid;
  }

  matchingSymbolsForId(spec: SymbolCompletionSpec): ElanSymbol[] {
    const ast = this.getFile().getAst(false);
    const symbols = getFilteredSymbols(spec, ast, this.getHolder().getHtmlId());
    return removeIfSingleFullMatch(symbols, spec.toMatch);
  }

  protected popupAsHtml() {
    const symbols = this.allPossibleSymbolCompletions;
    const symbolAsHtml: string[] = [];
    const count = this.allPossibleSymbolCompletions.length;
    // we're doing a ref equality below so make sure same objects!
    this.selectedSymbolCompletion = this.selectedSymbolCompletion
      ? symbols.filter((s) => s.matches(this.selectedSymbolCompletion))[0]
      : undefined;
    const selectedIndex = this.selectedSymbolCompletion
      ? symbols.indexOf(this.selectedSymbolCompletion)
      : 0;
    let popupAsHtml = "";
    let startIndex = 0;
    let lastIndex = count > 10 ? 10 : count;
    let lastName = "";

    if (count > 10 && selectedIndex > 5) {
      startIndex = selectedIndex - 5;
      lastIndex = selectedIndex + 5;
      lastIndex = lastIndex > count ? count : lastIndex;
    }

    if (count === 0) {
      this.selectedSymbolCompletion = undefined;
    }

    for (let i = startIndex; i < lastIndex; i++) {
      const symbol = symbols[i];
      const name = symbol.displayName;
      const cls = symbol.class;
      const selected = this.markIfSelected(symbol) ? " selected" : "";
      lastName = name;

      symbolAsHtml.push(
        `<div class="autocomplete-item${selected}${cls}" data-id="${this.htmlId}">${name}</div>`,
      );
    }

    if (count > 10 && selectedIndex + 5 < count) {
      symbolAsHtml.push(
        `<div class="autocomplete-ellipsis" data-id="${this.htmlId}" data-selected="${lastName}" >...</div>`,
      );
    }

    if (symbolAsHtml.length > 0) {
      popupAsHtml = `<div class="autocomplete-popup">${symbolAsHtml.join("")}</div>`;
    }

    return popupAsHtml;
  }

  private markIfSelected(symbol: SymbolWrapper) {
    return symbol === this.selectedSymbolCompletion;
  }

  selectFromAutoCompleteItems(up: boolean) {
    const options = this.allPossibleSymbolCompletions;
    let matched = false;
    for (let i = 0; i < options.length; i++) {
      if (!matched && options[i] === this.selectedSymbolCompletion) {
        if (i > 0 && up) {
          this.selectedSymbolCompletion = options[i - 1];
          matched = true;
        } else if (i < options.length - 1 && !up) {
          this.selectedSymbolCompletion = options[i + 1];
          matched = true;
        }
      }
    }
    if (!matched && options.length > 0) {
      this.selectedSymbolCompletion = options[0];
    }
  }

  protected showAutoComplete(spec: SymbolCompletionSpec) {
    return (
      (spec.tokenTypes.size > 0 || spec.keywords.size > 0) &&
      this.selected &&
      this.cursorPos === this.text.length &&
      this.readParseStatus() !== ParseStatus.invalid
    );
  }

  public getSymbolCompletionSpec(): SymbolCompletionSpec {
    KeywordCompletion.reset(); // to clear static map
    const rn = this.rootNode ?? this.initialiseRoot();
    const spec = rn.symbolCompletion_getSpec();
    if (spec.context === "") {
      spec.context = this.extractContextFromText();
    } else if (spec.context === "none") {
      spec.context = "";
    }
    return spec;
  }

  orderSymbol(s1: SymbolWrapper, s2: SymbolWrapper) {
    return s1.name.localeCompare(s2.name);
  }

  extractContextFromText(): string {
    const rgx = /([[A-Za-z][A-Za-z0-9_]*)(\(.*\))?\.([[A-Za-z][A-Za-z0-9_]*)?$/;
    return rgx.test(this.text) ? this.text.match(rgx)![1] : "";
  }

  protected symbolCompletionAsHtml(): string {
    let popupAsHtml = "";
    const spec = this.getSymbolCompletionSpec();
    if (this.showAutoComplete(spec)) {
      this.symbolToMatch = spec.toMatch;
      const scope = this.getFile().getAst(false)?.getScopeById(this.getHolder().getHtmlId());
      const keywords = Array.from(spec.keywords)
        .map((k) => new SymbolWrapper(k, scope!))
        .sort(this.orderSymbol);
      const symbols = this.matchingSymbolsForId(spec).map((s) => new SymbolWrapper(s, scope!));
      this.allPossibleSymbolCompletions = keywords.concat(symbols);
      popupAsHtml = this.popupAsHtml();
    }
    this.showingSymbolCompletion = !!popupAsHtml;
    return popupAsHtml;
  }

  abstract symbolCompletion(): string;

  isWithinAGhostedFrame() {
    return this.getHolder().isGhostedOrWithinAGhostedFrame();
  }

  resetText() {
    this.text = this.textAsExport();
  }
}

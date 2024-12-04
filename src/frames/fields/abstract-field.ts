import { CodeSource } from "../code-source";
import { CompileError } from "../compile-error";
import {
  escapeHtmlChars,
  helper_CompileOrParseAsDisplayStatus,
  helper_compileMsgAsHtml,
  helper_deriveCompileStatusFromErrors,
  isCollapsible,
} from "../helpers";
import { AstNode } from "../interfaces/ast-node";
import { editorEvent } from "../interfaces/editor-event";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { Selectable } from "../interfaces/selectable";
import { propertyKeyword } from "../keywords";
import { Overtyper } from "../overtyper";
import { CSV } from "../parse-nodes/csv";
import { ParseNode } from "../parse-nodes/parse-node";
import { CompileStatus, DisplayStatus, ParseStatus } from "../status-enums";
import { SymbolCompletionSpec } from "../symbol-completion-helpers";
import { filteredSymbols, removeIfSingleFullMatch } from "../symbols/symbol-helpers";
import { SymbolWrapper } from "../symbols/symbol-wrapper";
import { UnknownType } from "../symbols/unknown-type";
import { EmptyAsn } from "../syntax-nodes/empty-asn";
import { Transforms } from "../syntax-nodes/transforms";

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
  selectionEnd: number = 0; //Relative to LH end of text
  protected rootNode?: ParseNode;
  protected astNode?: AstNode;
  protected completion: string = "";
  parseErrorMsg: string = "";
  protected help: string = "help TBD";
  overtyper = new Overtyper();
  codeHasChanged: boolean = false;
  autocompleteSymbols: SymbolWrapper[] = [];
  autocompleteMatch: string = "";
  protected autoCompSelected?: SymbolWrapper;

  constructor(holder: Frame) {
    this.holder = holder;
    const map = holder.getMap();
    this.htmlId = `${this.getIdPrefix()}${this.getFile().getNextId()}`;
    map.set(this.htmlId, this);
    this.map = map;
    this._parseStatus = ParseStatus.incomplete; // (see setOptional)
  }

  getFile(): File {
    return this.holder.getFile();
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
    this.holder.hasBeenAddedTo();
    const text = this.readToDelimiter(source);
    const root = this.initialiseRoot();
    this.parseCompleteTextUsingNode(text, root);
    if (this.isOptional() && this._parseStatus === ParseStatus.empty) {
      this._parseStatus = ParseStatus.valid;
    } else if (this._parseStatus !== ParseStatus.valid) {
      throw new Error(`Parse error at ${source.getRemainingCode()}`);
    }
  }

  parseCompleteTextUsingNode(text: string, root: ParseNode): void {
    this.parseErrorMsg = "";
    if (text.length === 0) {
      this.setParseStatus(this.isOptional() ? ParseStatus.valid : ParseStatus.incomplete);
    } else {
      root.parseText(text.trimStart());
      if (root.remainingText.trim().length > 0 || root.status === ParseStatus.invalid) {
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
      this._parseStatus === ParseStatus.incomplete;
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
      this.autoCompSelected = this.autocompleteSymbols.find((s) => s.name === txt);
    }
  }

  setSelection(start: number, end?: number) {
    this.cursorPos = start;
    this.selectionEnd = end ?? start;
  }

  processKey(e: editorEvent): boolean {
    this.codeHasChanged = false;
    const key = e.key;
    const textLen = this.text.length;
    this.processAutocompleteText(e.autocomplete);
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
        this.selectFromAutoCompleteItems(true);
        break;
      }
      case "ArrowDown": {
        this.selectFromAutoCompleteItems(false);
        break;
      }
      case "Backspace": {
        if (this.holder.isNew) {
          this.holder.deleteIfPermissible();
          this.codeHasChanged = true;
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
        if (e.selection || this.cursorPos < textLen) {
          const [start, end] = e.selection ?? [this.cursorPos, this.cursorPos + 1];
          this.text = this.text.slice(0, start) + this.text.slice(end);
          this.setSelection(start);
          this.parseCurrentText();
          this.codeHasChanged = true;
          this.editingField();
        }
        break;
      }
      case "t": {
        if (e.modKey.alt) {
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
          this.processInput(key);
          this.codeHasChanged = true;
          this.holder.hasBeenAddedTo();
          this.editingField();
        } else if (key && key.length > 1) {
          for (const c of key) {
            this.processInput(c);
          }
          this.codeHasChanged = true;
          this.holder.hasBeenAddedTo();
          this.editingField();
        }
      }
    }
    if (this.codeHasChanged) {
      this.autoCompSelected = undefined;
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

  isEndMarker(key: string) {
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

    if (this.autocompleteMatch !== "") {
      const li = this.text.lastIndexOf(this.autocompleteMatch);
      this.text = this.text.slice(0, li);
    }

    const propertyPrefix = `${propertyKeyword}.`;
    const appendText = this.autoCompSelected?.insertedText ?? "";

    if (this.text === propertyPrefix && appendText.startsWith(propertyPrefix)) {
      this.text = "";
    }

    const optSpace = this.text && this.autoCompSelected?.isKeyword ? " " : "";

    this.text = `${this.text}${optSpace}${appendText}`;
    this.autoCompSelected = undefined;
    this.parseCurrentText();
    this.setSelection(this.text.length);
    this.codeHasChanged = true;
  }

  private tab(back: boolean) {
    if (back) {
      this.holder.selectFieldBefore(this);
    } else if (this.autoCompSelected) {
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
    if (this.autoCompSelected) {
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
          this.holder.insertSelectorAfterLastField();
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
  select(withFocus?: boolean, multiSelect?: boolean, selection?: [number, number]): void {
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

  protected fieldAsInput(): string {
    return `<input spellcheck="false" data-cursorstart="${this.cursorPos}" data-cursorend="${this.selectionEnd}" size="${this.charCount()}" style="width: ${this.fieldWidth()}" value="${this.escapeDoubleQuotesAndEscapes(this.text)}">`;
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
      ? `<el-msg class="${DisplayStatus[DisplayStatus.error]}"> ${this.parseErrorMsg}</el-msg>`
      : helper_compileMsgAsHtml(this);
  }

  renderAsHtml(): string {
    return `<el-field id="${this.htmlId}" class="${this.cls()}" tabindex=0><el-txt>${this.textAsHtml()}</el-txt><el-place>${this.placeholder}</el-place><el-compl>${this.getCompletion()}</el-compl>${this.getMessage()}<el-help title="${this.help}">?</el-help></el-field>`;
  }

  indent(): string {
    return "";
  }

  renderAsSource(): string {
    return this.textAsSource();
  }

  setFieldToKnownValidText(text: string) {
    this.text = text;
    const root = this.initialiseRoot();
    this.parseCompleteTextUsingNode(this.text, root);
    this._parseStatus = ParseStatus.valid;
  }

  getOrTransformAstNode(transforms?: Transforms) {
    if (transforms && (!this.astNode || this.codeHasChanged)) {
      if (this.rootNode instanceof CSV && this.rootNode.status === ParseStatus.valid) {
        const scope = this.getHolder();
        this.astNode = transforms.transformMany(this.rootNode, this.htmlId, scope);
      } else if (this.rootNode && this.rootNode.status === ParseStatus.valid) {
        this.astNode = transforms.transform(this.rootNode, this.htmlId, this.getHolder());
      }
      this.codeHasChanged = false;
    }
    return this.astNode ?? new EmptyAsn(this.htmlId);
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

  symbolType(transforms?: Transforms) {
    const astNode = this.getOrTransformAstNode(transforms);
    if (astNode) {
      return astNode.symbolType();
    }
    return UnknownType.Instance;
  }

  matchingSymbolsForId(spec: SymbolCompletionSpec, transforms: Transforms): ElanSymbol[] {
    const symbols = filteredSymbols(spec, transforms, this.getHolder());
    return removeIfSingleFullMatch(symbols, spec.toMatch);
  }

  protected popupAsHtml() {
    const symbols = this.autocompleteSymbols;
    const symbolAsHtml: string[] = [];
    const count = this.autocompleteSymbols.length;
    // we're doing a ref equality below so make sure same objects!
    this.autoCompSelected = this.autoCompSelected
      ? symbols.filter((s) => s.matches(this.autoCompSelected))[0]
      : undefined;
    const selectedIndex = this.autoCompSelected ? symbols.indexOf(this.autoCompSelected) : 0;
    let popupAsHtml = "";
    let startIndex = 0;
    let lastIndex = count > 10 ? 10 : count;

    if (count > 10 && selectedIndex > 5) {
      startIndex = selectedIndex - 5;
      lastIndex = selectedIndex + 5;
      lastIndex = lastIndex > count ? count : lastIndex;
    }

    if (count === 0) {
      this.autoCompSelected = undefined;
    }

    if (count === 1) {
      this.autoCompSelected = symbols[0];
    }

    for (let i = startIndex; i < lastIndex; i++) {
      const symbol = symbols[i];
      const name = symbol.displayName;
      const selected = count === 1 || this.markIfSelected(symbol) ? " selected" : "";

      symbolAsHtml.push(
        // Can add back in ${isP}  and ${symbolType}
        `<div class="autocomplete-item${selected}" data-id="${this.htmlId}">${name}</div>`,
      );
    }

    if (count > 10 && selectedIndex + 5 < count) {
      symbolAsHtml.push(`<div>...</div>`);
    }

    if (symbolAsHtml.length > 0) {
      popupAsHtml = `<div class="autocomplete-popup">${symbolAsHtml.join("")}</div>`;
    }

    return popupAsHtml;
  }

  private markIfSelected(symbol: SymbolWrapper) {
    return symbol === this.autoCompSelected;
  }

  selectFromAutoCompleteItems(up: boolean) {
    const options = this.autocompleteSymbols;
    let matched = false;
    for (let i = 0; i < options.length; i++) {
      if (!matched && options[i] === this.autoCompSelected) {
        if (i > 0 && up) {
          this.autoCompSelected = options[i - 1];
          matched = true;
        } else if (i < options.length - 1 && !up) {
          this.autoCompSelected = options[i + 1];
          matched = true;
        }
      }
    }
    if (!matched && options.length > 0) {
      this.autoCompSelected = options[0];
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

  protected getSymbolCompletionSpec(): SymbolCompletionSpec {
    const rn = this.rootNode ?? this.initialiseRoot();
    return rn.symbolCompletion_getSpec();
  }

  orderSymbol(s1: SymbolWrapper, s2: SymbolWrapper) {
    return s1.name.localeCompare(s2.name);
  }

  extractContextFromText(): string {
    const rgx = /(.*\.)*(([A-Za-z_]*)(\(.*\))*)\..*/;
    return rgx.test(this.text) ? this.text.match(rgx)![3] : "";
  }

  protected symbolCompletionAsHtml(transforms: Transforms): string {
    let popupAsHtml = "";
    const spec = this.getSymbolCompletionSpec();
    if (spec.context === "") {
      spec.context = this.extractContextFromText();
    } else if (spec.context === "none") {
      spec.context = "";
    }
    if (this.showAutoComplete(spec)) {
      this.autocompleteMatch = spec.toMatch;
      const scope = this.getHolder();
      const keywords = Array.from(spec.keywords)
        .map((k) => new SymbolWrapper(k, transforms, scope))
        .sort(this.orderSymbol);
      const symbols = this.matchingSymbolsForId(spec, transforms).map(
        (s) => new SymbolWrapper(s, transforms, scope),
      );
      this.autocompleteSymbols = keywords.concat(symbols);
      popupAsHtml = this.popupAsHtml();
    }
    return popupAsHtml;
  }

  abstract symbolCompletion(): string;
}

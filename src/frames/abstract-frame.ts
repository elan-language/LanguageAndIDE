import { ElanCutCopyPasteError } from "../elan-cut-copy-paste-error";
import { CodeSource } from "./code-source";
import { CompileError } from "./compile-error";
import {
  expandCollapseAll,
  helper_compileMsgAsHtml,
  helper_CompileOrParseAsDisplayStatus,
  helper_deriveCompileStatusFromErrors,
  isCollapsible,
  isFrame,
  isParent,
  singleIndent,
} from "./frame-helpers";
import { editorEvent } from "./interfaces/editor-event";
import { ElanSymbol } from "./interfaces/elan-symbol";
import { Field } from "./interfaces/field";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { Scope } from "./interfaces/scope";
import { Selectable } from "./interfaces/selectable";
import {
  parentHelper_getAllSelectedChildren,
  parentHelper_getChildAfter,
  parentHelper_removeAllSelectedChildren,
} from "./parent-helpers";
import { ScratchPad } from "./scratch-pad";
import { CompileStatus, DisplayStatus, ParseStatus } from "./status-enums";
import { orderSymbol } from "./symbols/symbol-helpers";
import { SymbolScope } from "./symbols/symbol-scope";
import { UnknownType } from "./symbols/unknown-type";
import { Transforms } from "./syntax-nodes/transforms";

export abstract class AbstractFrame implements Frame {
  isFrame = true;
  isNew = true;
  private _parent: File | Parent;
  private _map?: Map<string, Selectable>;
  private selected: boolean = false;
  private focused: boolean = false;
  private collapsed: boolean = false;
  private _classes = new Array<string>();
  protected htmlId: string = "";
  protected movable: boolean = true;
  private _parseStatus: ParseStatus = ParseStatus.default;
  private _compileStatus: CompileStatus = CompileStatus.default;

  protected showContextMenu = false;
  protected hasBreakPoint = false;
  protected paused = false;
  protected bpAsHtml = `<el-bp>&#x1f5f2;</el-bp>`;

  constructor(parent: Parent) {
    this._parent = parent;
    const file = this.getFile();
    const map = file.getMap();
    this.htmlId = `${this.getIdPrefix()}${file.getNextId()}`;
    map.set(this.htmlId, this);
    this.setMap(map);
  }
  hasBeenAddedTo(): void {
    this.isNew = false;
  }

  get symbolId() {
    return "__";
  }

  symbolType(_transforms?: Transforms) {
    return UnknownType.Instance;
  }

  get symbolScope() {
    return SymbolScope.unknown;
  }

  isMovable(): boolean {
    return this.movable;
  }

  getFile(): File {
    return this.getParent().getFile();
  }

  abstract initialKeywords(): string;

  getScratchPad(): ScratchPad {
    return this.getFile().getScratchPad();
  }

  getHtmlId(): string {
    return this.htmlId;
  }

  getFrNo(): string {
    return this.getFile().getFrNo();
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, _initialScope: Frame): ElanSymbol {
    return this.getParent().resolveSymbol(id, transforms, this);
  }

  symbolMatches(id: string, all: boolean, _initialScope?: Scope): ElanSymbol[] {
    return this.getParent().symbolMatches(id, all, this);
  }

  compile(_transforms: Transforms): string {
    throw new Error("Method not implemented.");
  }

  fieldUpdated(_field: Field): void {
    //Does nothing - for sub-classes to override as needed
  }

  abstract getFields(): Field[];

  getFirstPeerFrame(): Frame {
    return this.getParent().getFirstChild();
  }
  getLastPeerFrame(): Frame {
    return this.getParent().getLastChild();
  }
  getPreviousPeerFrame(): Frame {
    return this.getParent().getChildBefore(this);
  }
  getNextPeerFrame(): Frame {
    return this.getParent().getChildAfter(this);
  }

  selectFieldBefore(current: Field) {
    const fields = this.getFields();
    const i = fields.indexOf(current);
    if (i > 0) {
      this.getFields()[i - 1].select(true, false);
    } else {
      this.select(true, false);
    }
  }

  selectFieldAfter(current: Field) {
    const fields = this.getFields();
    const i = fields.indexOf(current);
    if (i < fields.length - 1) {
      fields[i + 1].select(true, false);
    } else {
      this.select(true, false);
    }
  }

  getNextFrameInTabOrder(): Frame {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let result: Frame = this;
    if (this.getNextPeerFrame() !== this) {
      result = this.getNextPeerFrame();
    } else {
      const parent = this.getParent();
      if (isFrame(parent)) {
        const parentNextPeer = parent.getNextFrameInTabOrder();
        if (parentNextPeer !== parent) {
          result = parentNextPeer;
        }
      }
    }
    return result;
  }

  getPreviousFrameInTabOrder(): Frame {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let result: Frame = this;
    if (this.getPreviousPeerFrame() !== this) {
      result = this.getPreviousPeerFrame();
    } else {
      const parent = this.getParent();
      if (isFrame(parent)) {
        result = parent.getPreviousFrameInTabOrder();
      }
    }
    return result;
  }

  //Overridden by any frames that have children
  selectFirstField(): boolean {
    let result = false;
    if (this.getFields().length > 0) {
      this.getFields()[0].select(true, false);
      result = true;
    }
    return result;
  }

  selectLastField(): boolean {
    let result = false;
    const length = this.getFields().length;
    if (length > 0) {
      this.getFields()[length - 1].select(true, false);
      result = true;
    }
    return result;
  }

  processKey(e: editorEvent): boolean {
    let codeHasChanged = false;
    const key = e.key;
    switch (key) {
      case "Home": {
        this.getFirstPeerFrame().select(true, false);
        break;
      }
      case "End": {
        this.getLastPeerFrame().select(true, false);
        break;
      }
      case "Tab": {
        if (e.modKey.shift) {
          this.selectLastField();
        } else {
          this.selectFirstField();
        }
        break;
      }
      case "Enter": {
        this.insertPeerSelector(e.modKey.shift);
        break;
      }
      case "o": {
        if (e.modKey.control && isCollapsible(this)) {
          this.expandCollapse();
        }
        break;
      }
      case "O": {
        if (e.modKey.control) {
          this.expandCollapseAll();
        }
        break;
      }
      case "t": {
        if (e.modKey.alt) {
          this.getFile().removeAllSelectorsThatCanBe();
        }
        break;
      }
      case "ArrowUp": {
        if (e.modKey.control && this.movable) {
          this.getParent().moveSelectedChildrenUpOne();
          codeHasChanged = true;
        } else {
          this.selectSingleOrMulti(this.getPreviousPeerFrame(), e.modKey.shift);
        }
        break;
      }
      case "ArrowDown": {
        if (e.modKey.control && this.movable) {
          this.getParent().moveSelectedChildrenDownOne();
          codeHasChanged = true;
        } else {
          this.selectSingleOrMulti(this.getNextPeerFrame(), e.modKey.shift);
        }
        break;
      }
      case "ArrowLeft": {
        const pt = this.getParent();
        if (isFrame(pt)) {
          pt.select(true, false);
        }
        break;
      }
      case "ArrowRight": {
        if (isParent(this)) {
          this.getFirstChild().select(true, false);
        }
        break;
      }
      case "Delete": {
        if (e.modKey.control) {
          this.getParent().deleteSelectedChildren();
          codeHasChanged = true;
        }
        break;
      }
      case "d": {
        if (e.modKey.control) {
          this.getParent().deleteSelectedChildren();
          codeHasChanged = true;
        }
        break;
      }
      case "Backspace": {
        if (this.isNew) {
          this.deleteIfPermissible();
          codeHasChanged = true;
        }
        break;
      }
      case "x": {
        if (e.modKey.control) {
          this.cut();
          codeHasChanged = true;
        }
        break;
      }
      case "ContextMenu": {
        // todo renamethis to data say
        if (e.autocomplete) {
          const map = this.getContextMenuItems();
          map.get(e.autocomplete)![1]?.();
        } else {
          this.showContextMenu = true;
        }
        break;
      }
    }
    return codeHasChanged;
  }
  cut(): void {
    const selected = parentHelper_getAllSelectedChildren(this.getParent());
    const nonSelectors = selected.filter((s) => !(s.initialKeywords() === "selector"));
    if (nonSelectors.length === 0) {
      throw new ElanCutCopyPasteError("Cut Failed: No code to cut");
    }
    const movable = nonSelectors.filter((s) => s.isMovable());
    const last = selected[selected.length - 1];
    if (movable.length !== selected.length) {
      throw new ElanCutCopyPasteError("Cut Failed: At least one selected frame is not moveable");
    }
    parentHelper_removeAllSelectedChildren(this.getParent());
    const newFocus = parentHelper_getChildAfter(this.getParent(), last);
    newFocus.select(true, false);
    const sp = this.getScratchPad();
    sp.addSnippet(selected);
    if (!("isSelector" in newFocus) && !newFocus.getParent().minimumNumberOfChildrenExceeded()) {
      newFocus.insertPeerSelector(false);
    }
  }

  deleteIfPermissible(): void {
    if (this.movable) {
      this.insertNewSelectorIfNecessary();
      this.delete();
    }
  }

  delete(): void {
    const parent = this.getParent();
    const newFocus = this.getAdjacentPeer();
    parent.removeChild(this);
    this.getMap().delete(this.htmlId);
    newFocus.select(true, false);
  }

  insertNewSelectorIfNecessary() {
    if (!this.getParent().minimumNumberOfChildrenExceeded()) {
      this.insertPeerSelector(true);
    }
  }

  protected getAdjacentPeer(): Frame {
    const parent = this.getParent();
    let adjacent = parent.getChildAfter(this);
    if (adjacent === this) {
      adjacent = parent.getChildBefore(this);
    }
    return adjacent;
  }
  insertSelectorAfterLastField(): void {
    //intended to overridden byFrameWithStatements
    this.insertPeerSelector(false);
  }

  selectNextFrame(): void {
    const parent = this.getParent();
    let next = parent.getChildAfter(this);
    if (next === this) {
      if (!("isFile" in parent)) {
        next = parent as unknown as Frame;
      }
    }
    next.select(true, false);
  }

  insertPeerSelector(before: boolean): void {
    const parent = this.getParent();
    if (before && this.canInsertBefore()) {
      parent.insertOrGotoChildSelector(false, this);
    } else if (!before && this.canInsertAfter()) {
      parent.insertOrGotoChildSelector(true, this);
    }
  }

  canInsertBefore(): boolean {
    return true;
  }

  canInsertAfter(): boolean {
    return true;
  }

  private selectSingleOrMulti(other: Frame, multiSelect: boolean) {
    if (multiSelect && other.isSelected()) {
      this.deselect();
      other.select(true, true);
    } else if (multiSelect) {
      this.select(false, true);
      other.select(true, true);
    } else {
      other.select(true, false);
    }
  }

  getMap(): Map<string, Selectable> {
    if (this._map) {
      return this._map;
    }
    throw new Error(`Frame : ${this.htmlId} has no Map`);
  }

  setMap(Map: Map<string, Selectable>) {
    this._map = Map;
  }

  abstract getIdPrefix(): string;

  protected pushClass(flag: boolean, cls: string) {
    if (flag) {
      this._classes.push(cls);
    }
  }

  protected setClasses() {
    this._classes = new Array<string>();
    this.pushClass(this.collapsed, "collapsed");
    this.pushClass(this.selected, "selected");
    this.pushClass(this.focused, "focused");
    this.pushClass(this.hasBreakPoint, "breakpoint");
    this.pushClass(this.paused, "paused");
    this._classes.push(DisplayStatus[this.readDisplayStatus()]);
  }

  protected readDisplayStatus(): DisplayStatus {
    return helper_CompileOrParseAsDisplayStatus(this);
  }

  protected cls(): string {
    this.setClasses();
    return this._classes.join(" ");
  }

  abstract renderAsHtml(): string;

  indent(): string {
    if (this.hasParent()) {
      return this.getParent()?.indent() + singleIndent();
    } else {
      return singleIndent();
    }
  }

  abstract renderAsSource(): string;

  isSelected(): boolean {
    return this.selected;
  }

  select(withFocus: boolean, multiSelect: boolean): void {
    if (!multiSelect) {
      this.deselectAll();
    }
    this.selected = true;
    this.focused = withFocus;
  }

  deselect(): void {
    this.selected = false;
    this.focused = false;
  }

  deselectAll() {
    for (const f of this.getMap().values()) {
      if (f.isSelected()) {
        f.deselect();
      }
    }
  }

  getAllSelected(): Selectable[] {
    const selected = [];
    for (const f of this.getMap().values()) {
      if (f.isSelected()) {
        selected.push(f);
      }
    }
    return selected;
  }

  hasParent(): boolean {
    return !!this._parent;
  }

  setParent(parent: Parent): void {
    this._parent = parent;
  }

  getParent(): Parent {
    if (this._parent) {
      return this._parent;
    }
    throw new Error(`Frame : ${this.htmlId} has no Parent`);
  }

  getParentScope(): Scope {
    return this.getParent();
  }

  expandCollapse(): void {
    if (this.isCollapsed()) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  expandCollapseAll() {
    expandCollapseAll(this.getFile());
  }

  isCollapsed(): boolean {
    return this.collapsed;
  }

  collapse(): void {
    if ("isCollapsible" in this) {
      this.collapsed = true;
    }
  }

  expand(): void {
    if ("isCollapsible" in this) {
      this.collapsed = false;
    }
  }

  isFocused(): boolean {
    return this.focused;
  }

  focus(): void {
    this.focused = true;
  }

  defocus(): void {
    this.focused = false;
  }

  isComplete(): boolean {
    return true;
  }

  updateParseStatus(): void {
    this._parseStatus = this.worstParseStatusOfFields();
  }
  worstParseStatusOfFields(): ParseStatus {
    return this.getFields()
      .map((g) => g.readParseStatus())
      .reduce((prev, cur) => (cur < prev ? cur : prev), ParseStatus.valid);
  }
  readParseStatus(): ParseStatus {
    return this._parseStatus;
  }
  protected setParseStatus(newStatus: ParseStatus): void {
    this._parseStatus = newStatus;
  }

  protected worstCompileStatusOfFields(): CompileStatus {
    return this.getFields()
      .map((g) => g.readCompileStatus())
      .reduce((prev, cur) => (cur < prev ? cur : prev), CompileStatus.default);
  }
  readCompileStatus(): CompileStatus {
    return this._compileStatus;
  }

  updateCompileStatus(): void {
    const own = helper_deriveCompileStatusFromErrors(this.compileErrors);
    this.getFields().forEach((f) => f.updateCompileStatus());
    const worstField = this.worstCompileStatusOfFields();
    this._compileStatus = Math.min(own, worstField);
  }

  protected setCompileStatus(newStatus: CompileStatus) {
    this._compileStatus = newStatus;
  }
  resetCompileStatusAndErrors(): void {
    this.compileErrors = [];
    this.getFields().forEach((f) => f.resetCompileStatusAndErrors());
    this._compileStatus = CompileStatus.default;
  }

  abstract parseFrom(source: CodeSource): void;

  compileErrors: CompileError[] = [];

  aggregateCompileErrors(): CompileError[] {
    const cc = this.getFields()
      .map((s) => s.aggregateCompileErrors())
      .reduce((prev, cur) => prev.concat(cur), []);
    return this.compileErrors.concat(cc);
  }
  compileMsgAsHtml() {
    return helper_compileMsgAsHtml(this);
  }

  setBreakPoint = () => {
    this.hasBreakPoint = true;
  };

  clearBreakPoint = () => {
    this.hasBreakPoint = false;
  };

  getContextMenuItems() {
    const map = new Map<string, [string, () => void]>();

    // Must be arrow functions for this binding
    if (this.hasBreakPoint) {
      map.set("clearBP", ["clear Break Point", this.clearBreakPoint]);
    } else {
      map.set("setBP", ["set Break Point", this.setBreakPoint]);
    }

    return map;
  }

  contextMenu() {
    if (this.showContextMenu) {
      this.showContextMenu = false;
      const items: string[] = [];
      const map = this.getContextMenuItems();

      for (const k of map.keys()) {
        const val = map.get(k)!;
        items.push(
          `<div class='context-menu-item' data-id='${this.htmlId}' data-func='${k}'>${val[0]}</div>`,
        );
      }

      return `<div class='context-menu'>${items.join("")}</div>`;
    }
    return "";
  }

  breakPoint(scopedSymbols: () => ElanSymbol[]) {
    if (!this.hasBreakPoint) {
      return "";
    }

    const resolveId: string[] = [];
    const symbols = scopedSymbols().sort(orderSymbol);

    for (const symbol of symbols) {
      const idPrefix = symbol.symbolScope === SymbolScope.program ? "global." : "";

      const scopePrefix =
        symbol.symbolScope === SymbolScope.stdlib
          ? "_stdlib."
          : symbol.symbolScope === SymbolScope.program
            ? "global."
            : "";
      const id = `${idPrefix}${symbol.symbolId}`;
      const value = `${scopePrefix}${symbol.symbolId}`;
      resolveId.push(`_scopedIds${this.htmlId}.push(["${id}", _stdlib.asString(${value})]);`);
    }

    const resolve = `const _scopedIds${this.htmlId} = [];
  ${resolveId.join("\r")}`;

    return `${resolve}
await system.breakPoint(_scopedIds${this.htmlId}, "${this.htmlId}");`;
  }
}

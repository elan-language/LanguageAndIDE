import {
  expandCollapseAll,
  helper_compileMsgAsHtmlNew,
  helper_CompileOrParseAsDisplayStatus,
  helper_deriveCompileStatusFromErrors,
  isCollapsible,
  isFrame,
  isParent,
  isSelector,
  singleIndent,
} from "./frame-helpers";
import { CodeSource } from "./frame-interfaces/code-source";
import { editorEvent } from "./frame-interfaces/editor-event";
import { Field } from "./frame-interfaces/field";
import { File } from "./frame-interfaces/file";
import { Frame } from "./frame-interfaces/frame";
import { Parent } from "./frame-interfaces/parent";
import { Selectable } from "./frame-interfaces/selectable";
import {
  parentHelper_getAllSelectedChildren,
  parentHelper_getChildAfter,
  parentHelper_removeAllSelectedChildren,
} from "./parent-helpers";
import { ScratchPad } from "./scratch-pad";
import {
  BreakpointEvent,
  BreakpointStatus,
  CompileStatus,
  DisplayColour,
  ParseStatus,
} from "./status-enums";

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
  breakpointStatus: BreakpointStatus = BreakpointStatus.none;
  protected paused = false;

  pasteError: string = "";

  helpActive: boolean = false;

  constructor(parent: Parent) {
    this._parent = parent;
    const file = this.getFile();
    const map = file.getMap();
    this.htmlId = `${this.getIdPrefix()}${file.getNextId()}`;
    map.set(this.htmlId, this);
    this.setMap(map);
  }

  helpId(): string {
    return this.initialKeywords().replace(/\s/g, "");
  }

  helpAsHtml(): string {
    const active = this.helpActive ? ` class="active"` : "";
    this.helpActive = false;

    return this.selected
      ? `<el-help title="Click to open Help for this instruction"> <a href="documentation/LangRef.html#${this.helpId()}" target="help-iframe" tabindex="-1"${active}>?</a></el-help>`
      : ``;
  }

  showHelp() {
    this.helpActive = true;
  }

  hasBeenAddedTo(): void {
    this.isNew = false;
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

  private controlKeys = ["o", "O", "ArrowUp", "ArrowDown", "Backspace", "Delete", "x", "m", "?"];

  processKey(e: editorEvent): boolean {
    let codeHasChanged = false;
    const key = e.key;

    if (e.modKey.control && !this.controlKeys.includes(key ?? "")) {
      return false;
    }

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
          this.deleteSelected();
          codeHasChanged = true;
        }
        break;
      }
      case "Backspace": {
        if (e.modKey.control) {
          this.deleteSelected();
          codeHasChanged = true;
        } else if (this.isNew) {
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
      case "?": {
        if (e.modKey.control) {
          this.showHelp();
        }
        break;
      }
      case "m": {
        if (!e.modKey.control) {
          break;
        }
        // fall through
      }
      case "ContextMenu": {
        if (e.optionalData) {
          // This case is when user has selected an item FROM the context menu
          const map = this.getContextMenuItems();
          map.get(e.optionalData)![1]?.();
        } else {
          // Bringup the context menu
          if (!this.isSelected()) {
            this.select(true, false);
          }
          this.showContextMenu = true;
        }
        break;
      }
    }
    return codeHasChanged;
  }
  deleteSelected = () => {
    this.getParent().deleteSelectedChildren();
  };

  cut = () => {
    const selected = parentHelper_getAllSelectedChildren(this.getParent());
    const nonSelectors = selected.filter((s) => !(s.initialKeywords() === "selector"));
    if (nonSelectors.length === 0) {
      this.pasteError = "Cut Failed: No code to cut";
      return;
    }
    const movable = nonSelectors.filter((s) => s.isMovable());

    if (movable.length !== nonSelectors.length) {
      this.pasteError = "Cut Failed: At least one selected frame is not moveable";
      return;
    }

    parentHelper_removeAllSelectedChildren(this.getParent());

    const last = selected[selected.length - 1];
    const newFocus = parentHelper_getChildAfter(this.getParent(), last);
    newFocus.select(true, false);
    const sp = this.getScratchPad();
    sp.addSnippet(nonSelectors);
    if (!isSelector(newFocus) && !newFocus.getParent().minimumNumberOfChildrenExceeded()) {
      newFocus.insertPeerSelector(false);
    }
  };

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
      if (isFrame(parent)) {
        next = parent;
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
    this.pushClass(this.breakpointStatus !== BreakpointStatus.none, "breakpoint");
    this.pushClass(this.paused, "paused");
    this._classes.push(DisplayColour[this.readDisplayStatus()]);
  }

  protected readDisplayStatus(): DisplayColour {
    return helper_CompileOrParseAsDisplayStatus(this);
  }

  protected cls(): string {
    this.setClasses();
    return this._classes.join(" ");
  }

  abstract renderAsHtml(): string;

  indent(): string {
    if (this.hasParent()) {
      return this.getParent().indent() + singleIndent();
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
    if (isCollapsible(this)) {
      this.collapsed = true;
    }
  }

  expand(): void {
    if (isCollapsible(this)) {
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
    const own = helper_deriveCompileStatusFromErrors(
      this.getFile().getAst(false)?.getCompileErrorsFor(this.htmlId) ?? [],
    );
    this.getFields().forEach((f) => f.updateCompileStatus());
    const worstField = this.worstCompileStatusOfFields();
    this._compileStatus = Math.min(own, worstField);
  }

  protected setCompileStatus(newStatus: CompileStatus) {
    this._compileStatus = newStatus;
  }

  abstract parseFrom(source: CodeSource): void;

  compileMsgAsHtml() {
    return helper_compileMsgAsHtmlNew(this.getFile(), this);
  }

  getNextState(currentState: BreakpointStatus, event: BreakpointEvent) {
    switch (currentState) {
      case BreakpointStatus.none:
        switch (event) {
          case BreakpointEvent.clear:
            return BreakpointStatus.none;
          case BreakpointEvent.activate:
            return BreakpointStatus.singlestep;
          case BreakpointEvent.disable:
            return BreakpointStatus.none;
        }
      case BreakpointStatus.disabled:
        switch (event) {
          case BreakpointEvent.clear:
            return BreakpointStatus.none;
          case BreakpointEvent.activate:
            return BreakpointStatus.active;
          case BreakpointEvent.disable:
            return BreakpointStatus.disabled;
        }
      case BreakpointStatus.active:
        switch (event) {
          case BreakpointEvent.clear:
            return BreakpointStatus.none;
          case BreakpointEvent.activate:
            return BreakpointStatus.active;
          case BreakpointEvent.disable:
            return BreakpointStatus.disabled;
        }
      case BreakpointStatus.singlestep:
        switch (event) {
          case BreakpointEvent.clear:
            return BreakpointStatus.none;
          case BreakpointEvent.activate:
            return BreakpointStatus.singlestep;
          case BreakpointEvent.disable:
            return BreakpointStatus.none;
        }
    }
  }

  updateBreakpoints(event: BreakpointEvent): void {
    this.breakpointStatus = this.getNextState(this.breakpointStatus, event);
  }

  setBreakPoint = () => {
    this.breakpointStatus = BreakpointStatus.active;
  };

  clearBreakPoint = () => {
    this.breakpointStatus = BreakpointStatus.none;
  };

  toggleBreakPoint = () => {
    if (this.hasBreakpoint()) {
      this.clearBreakPoint();
    } else {
      this.setBreakPoint();
    }
  };

  clearAllBreakPoints = () => {
    this.getFile().updateBreakpoints(BreakpointEvent.clear);
  };

  hasBreakpoint() {
    return (
      this.breakpointStatus === BreakpointStatus.active ||
      this.breakpointStatus === BreakpointStatus.disabled
    );
  }

  getContextMenuItems() {
    const map = new Map<string, [string, (() => void) | undefined]>();
    // Must be arrow functions for this binding
    if (this.hasBreakpoint()) {
      map.set("clearBP", ["clear breakpoint", this.clearBreakPoint]);
      map.set("clearAllBP", ["clear all breakpoints", this.clearAllBreakPoints]);
    } else {
      map.set("setBP", ["set breakpoint", this.setBreakPoint]);
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
          `<div class='context-menu-item' data-id='${this.htmlId}' data-func='${k}' title="">${val[0]}</div>`,
        );
      }

      return `<div class='context-menu'>${items.join("")}</div>`;
    }
    return "";
  }

  bpAsHtml(): string {
    return this.hasBreakpoint() ? `<el-bp>&#x1f5f2;</el-bp>` : "";
  }

  protected toolTip(): string {
    return ``; // Currently not used
  }
}

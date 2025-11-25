import { BreakpointEvent } from "../../compiler/debugging/breakpoint-event";
import { BreakpointStatus } from "../../compiler/debugging/breakpoint-status";
import { focusedAnnotation, ghostedAnnotation, importedAnnotation } from "../../compiler/keywords";
import {
  addDeleteToContextMenu,
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
  parentHelper_copySelectedChildren,
  parentHelper_getAllSelectedChildren,
  parentHelper_getChildAfter,
  parentHelper_removeAllSelectedChildren,
} from "./parent-helpers";
import { CompileStatus, DisplayColour, ParseStatus } from "./status-enums";

export abstract class AbstractFrame implements Frame {
  isFrame = true;
  isNew = true;
  breakpointStatus: BreakpointStatus = BreakpointStatus.none;
  pasteError: string = "";
  helpActive: boolean = false;

  protected htmlId: string = "";
  protected ghostable: boolean = true;
  protected canHaveBreakPoint = true;
  protected showContextMenu = false;
  protected paused = false;

  private _parent: File | Parent;
  private _map?: Map<string, Selectable>;
  private _selected: boolean = false;
  private _focused: boolean = false;
  private _collapsed: boolean = false;
  private _classes = new Array<string>();
  private _movable: boolean = true;
  private _parseStatus: ParseStatus = ParseStatus.default;
  private _ghosted: boolean = false;
  private _imported: boolean = false;

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

    return this._selected
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
    return this._movable && !this.isImported();
  }

  isDeletable(): boolean {
    return true;
  }

  getFile(): File {
    return this.getParent().getFile();
  }

  abstract initialKeywords(): string;

  getHtmlId(): string {
    return this.htmlId;
  }

  getFrNo(): string {
    return this.isGhostedOrWithinAGhostedFrame() || this.isWithinAnImportedFrame()
      ? ""
      : this.getFile().getFrNo();
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

  private controlKeys = [
    "o",
    "O",
    "ArrowUp",
    "ArrowDown",
    "Backspace",
    "Delete",
    "x",
    "m",
    "c",
    "?",
  ];

  processKey(e: editorEvent): boolean {
    let codeHasChanged = false;
    const key = e.key;

    if (e.modKey.control && !this.controlKeys.includes(key ?? "")) {
      return false;
    }
    //Always applicable
    switch (key) {
      case "Home": {
        this.getFirstPeerFrame().select(true, false);
        break;
      }
      case "End": {
        this.getLastPeerFrame().select(true, false);
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
        if (e.modKey.control) {
          this.up();
        } else {
          this.selectSingleOrMulti(this.getPreviousPeerFrame(), e.modKey.shift);
        }
        break;
      }
      case "ArrowDown": {
        if (e.modKey.control) {
          this.down();
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
      case "Enter": {
        this.insertPeerSelector(e.modKey.shift);
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
      case "Delete": {
        if (e.modKey.control) {
          this.deleteSelected();
          codeHasChanged = true;
        }
        break;
      }
      case "Backspace": {
        if (e.modKey.control || this.isNew) {
          this.deleteSelected();
          codeHasChanged = true;
        }
        break;
      }
      case "c": {
        if (e.modKey.control) {
          this.copySelected();
          codeHasChanged = true;
        }
        break;
      }
      case "x": {
        if (e.modKey.control) {
          this.cutSelected();
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
        if (e.command) {
          // This case is when user has selected an item FROM the context menu
          const map = this.getContextMenuItems();
          codeHasChanged = map.get(e.command)![1]?.(e.optionalData);
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

  up = () => {
    if (this.isMovable()) {
      this.getParent().moveSelectedChildrenUpOne();
      return true;
    }
    return false;
  };

  down = () => {
    if (this.isMovable()) {
      this.getParent().moveSelectedChildrenDownOne();
      return true;
    }
    return false;
  };

  deleteSelected = () => {
    this.getParent().deleteSelectedChildren();
    return true;
  };

  copySelected = () => {
    if (!this.getParent().copySelectedChildren()) {
      this.pasteError = "Copy Failed: At least one selected frame does not parse";
      return true;
    }
    return false;
  };

  cutSelected = () => {
    const selected = parentHelper_getAllSelectedChildren(this.getParent());
    const nonSelectors = selected.filter((s) => !(s.initialKeywords() === "selector"));
    if (nonSelectors.length === 0) {
      this.pasteError = "Cut Failed: No code to cut";
      return true;
    }
    const movable = nonSelectors.filter((s) => s.isMovable());

    if (movable.length !== nonSelectors.length) {
      this.pasteError = "Cut Failed: At least one selected frame is not moveable";
      return true;
    }

    if (!parentHelper_copySelectedChildren(this.getParent())) {
      this.pasteError = "Cut Failed: At least one selected frame does not parse";
      return true;
    }
    parentHelper_removeAllSelectedChildren(this.getParent());

    const last = selected[selected.length - 1];
    const newFocus = parentHelper_getChildAfter(this.getParent(), last);
    newFocus.select(true, false);
    if (!isSelector(newFocus) && !newFocus.getParent().minimumNumberOfChildrenExceeded()) {
      newFocus.insertPeerSelector(false);
    }
    return true;
  };

  deleteIfPermissible(): void {
    if (this.isDeletable()) {
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

  above = () => {
    this.insertPeerSelector(true);
    return false;
  };

  below = () => {
    this.insertPeerSelector(false);
    return false;
  };

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
    this.pushClass(this._collapsed, "collapsed");
    this.pushClass(this._selected, "selected");
    this.pushClass(this._focused, "focused");
    this.pushClass(this.breakpointStatus !== BreakpointStatus.none, "breakpoint");
    this.pushClass(this.paused, "paused");
    this.pushClass(this.isGhosted(), ghostedAnnotation);
    this.pushClass(this.isImported(), importedAnnotation);
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
    return this._selected;
  }

  select(withFocus: boolean, multiSelect: boolean): void {
    // if parsing a file allow focusedAnnotation to do selection/focus
    if (!this.getFile().isParsing()) {
      if (!multiSelect) {
        this.deselectAll();
      }
      this._selected = true;
      this._focused = withFocus;
    }
  }

  selectFromAnnotation(): void {
    this._selected = true;
    this._focused = true;
  }

  deselect(): void {
    this._selected = false;
    this._focused = false;
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
    return this._collapsed;
  }

  collapse(): void {
    if (isCollapsible(this)) {
      this._collapsed = true;
    }
  }

  expand(): void {
    if (isCollapsible(this)) {
      this._collapsed = false;
    }
  }

  isFocused(): boolean {
    return this._focused;
  }

  focus(): void {
    this._focused = true;
  }

  defocus(): void {
    this._focused = false;
  }

  isComplete(): boolean {
    return true;
  }

  updateParseStatus(): void {
    this._parseStatus = this.worstParseStatusOfFields();
  }

  updateDirectives() {}

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
    const own = helper_deriveCompileStatusFromErrors(
      this.getFile().getAst(false)?.getCompileErrorsFor(this.htmlId) ?? [],
    );
    const worstField = this.worstCompileStatusOfFields();
    return Math.min(own, worstField);
  }

  abstract parseFrom(source: CodeSource): void;

  compileMsgAsHtml() {
    return helper_compileMsgAsHtmlNew(this.getFile(), this);
  }

  copy = () => {
    const source = this.renderAsSource();
    this.getFile().addCopiedSource(source);
    return false;
  };

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
    return false;
  };

  clearBreakPoint = () => {
    this.breakpointStatus = BreakpointStatus.none;
    return false;
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
    return false;
  };

  hasBreakpoint() {
    return (
      this.breakpointStatus === BreakpointStatus.active ||
      this.breakpointStatus === BreakpointStatus.disabled
    );
  }

  isGhostable() {
    return this.ghostable;
  }

  setGhosted(flag: boolean) {
    this._ghosted = flag;
  }

  ghost = () => {
    this.getParent().ghostSelectedChildren();
    return true;
  };

  unGhost = () => {
    this.getParent().unghostSelectedChildren();
    return true;
  };

  isGhosted() {
    return this._ghosted;
  }

  isImported() {
    return this._imported;
  }

  setImported(flag: boolean) {
    this._imported = flag;
  }

  isGhostedOrWithinAGhostedFrame(): boolean {
    return this.isGhosted() || this.getParent().isGhostedOrWithinAGhostedFrame();
  }

  isWithinAnImportedFrame(): boolean {
    const parent = this.getParent();
    return parent.isImported() || parent.isWithinAnImportedFrame();
  }

  isOrHoldsFocus() {
    return (
      this.isSelected() ||
      this.isFocused() ||
      this.getFields().some((f) => f.isFocused() || f.isSelected())
    );
  }

  sourceAnnotations(): string {
    return this.isImported()
      ? `[${importedAnnotation}] `
      : this.isGhosted()
        ? `[${ghostedAnnotation}] `
        : this.isOrHoldsFocus() && this.getFile().addFocusedAnnotationToCode()
          ? `[${focusedAnnotation}] `
          : "";
  }

  getContextMenuItems() {
    const map = new Map<string, [string, (s?: string) => boolean]>();
    if (this.isGhostedOrWithinAGhostedFrame()) {
      if (this.isGhosted()) {
        map.set("unghost", ["unghost", this.unGhost]);
      }
    } else {
      if (this.canInsertAfter()) {
        map.set("below", ["insert new code below <span class='kb'>Enter</span>", this.below]);
      }
      if (this.canInsertBefore()) {
        map.set("above", ["insert new code above <span class='kb'>Shift+Enter</span>", this.above]);
      }
      if (this.isDeletable()) {
        addDeleteToContextMenu(this, map);
      }
      if (this.isMovable()) {
        map.set("up", ["move up <span class='kb'>Ctrl+↑</span>", this.up]);
        map.set("down", ["move down <span class='kb'>Ctrl+↓</span>", this.down]);
      }
      if (this.isDeletable()) {
        map.set("cut", ["cut <span class='kb'>Ctrl+x</span>", this.cutSelected]);
      }
      map.set("copy", ["copy <span class='kb'>Ctrl+c</span>", this.copySelected]);
      if (this.isGhostable()) {
        map.set("ghost", ["ghost", this.ghost]);
      }
      if (this.canHaveBreakPoint) {
        if (this.hasBreakpoint()) {
          map.set("clearBP", ["clear breakpoint", this.clearBreakPoint]);
          map.set("clearAllBP", ["clear all breakpoints", this.clearAllBreakPoints]);
        } else {
          map.set("setBP", ["set breakpoint", this.setBreakPoint]);
        }
      }
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
          `<div class='context-menu-item' data-id='${this.htmlId}' data-func='${k}' title="" tabindex="-1">${val[0]}</div>`,
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

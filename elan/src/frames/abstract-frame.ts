import { Parent } from "./interfaces/parent";
import { Selectable } from "./interfaces/selectable";
import {
  expandCollapseAll,
  helper_compileMsgAsHtml,
  helper_CompileOrParseAsDisplayStatus,
  isCollapsible,
  isFile,
  isFrame,
  isParent,
  singleIndent,
} from "./helpers";
import { CompileStatus, DisplayStatus, ParseStatus } from "./status-enums";
import { Frame } from "./interfaces/frame";
import { File } from "./interfaces/file";
import { Field } from "./interfaces/field";
import { editorEvent } from "./interfaces/editor-event";
import { CodeSource } from "./code-source";
import { ElanSymbol } from "./interfaces/symbol";
import { CompileError } from "./compile-error";
import { ScratchPad } from "./scratch-pad";
import { Transforms } from "./syntax-nodes/transforms";

export abstract class AbstractFrame implements Frame {
  isFrame = true;
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

  constructor(parent: Parent) {
    this._parent = parent;
    const map = this.getFile().getMap();
    this.htmlId = `${this.getIdPrefix()}${map.size}`;
    map.set(this.htmlId, this);
    this.setMap(map);
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

  resolveSymbol(
    id: string | undefined,
    transforms: Transforms,
    initialScope: Frame,
  ): ElanSymbol {
    return this.getParent().resolveSymbol(id, transforms, this);
  }

  compile(transforms: Transforms): string {
    throw new Error("Method not implemented.");
  }

  fieldUpdated(field: Field): void {
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
      fields[i - 1].select(true, false);
    } else {
      this.selectLastFieldAboveThisFrame();
    }
  }

  selectFieldAfter(current: Field) {
    const fields = this.getFields();
    const i = fields.indexOf(current);
    if (i < fields.length - 1) {
      fields[i + 1].select(true, false);
    } else {
      if (isParent(this)) {
        this.getFirstChild().selectFirstField();
      } else {
        const next = this.getNextFrameInTabOrder();
        if (next !== this) {
          next.selectFirstField();
        }
      }
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
    const n = this.getFields().length;
    if (n > 0) {
      this.getFields()[n - 1].select(true, false);
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
        this.tab(e.modKey.shift);
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
          this.deleteIfPermissible();
          codeHasChanged = true;
        }
        break;
      }
      case "d": {
        if (e.modKey.control) {
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
    }
    return codeHasChanged;
  }
  cut(): void {
    if (this.movable) {
      this.insertNewSelectorIfNecessary();
      const newFocus = this.getAdjacentPeer();
      this.deselect();
      const sp = this.getScratchPad();
      this.getParent().removeChild(this);
      sp.addSnippet(this);
      newFocus.select(true, false);
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
    //intende to overridden byFrameWithStatements
    this.insertPeerSelector(false);
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

  tab(back: boolean) {
    if (back) {
      this.selectLastFieldAboveThisFrame();
    } else {
      this.selectFirstField();
    }
  }

  selectLastFieldAboveThisFrame(): boolean {
    let result = false;
    const peer = this.getPreviousPeerFrame();
    if (peer !== this) {
      result = peer.selectLastField();
    } else {
      const parent = this.getParent();
      const fields = parent.getFields();
      const n = fields.length;
      if (n > 0) {
        fields[n - 1].select(true, false);
        result = true;
      } else {
        if (isFrame(parent) && parent.getFields().length === 0) {
          //e.g. main or default
          result = this.selectLastFieldInPreviousGlobal(
            parent.getParent() as File,
            parent,
          );
        } else if (isFile(parent)) {
          result = this.selectLastFieldInPreviousGlobal(parent, this);
        }
      }
    }
    return result;
  }

  private selectLastFieldInPreviousGlobal(file: File, frame: Frame): boolean {
    let result = false;
    const prior = file.getChildBefore(frame);
    if (prior !== frame) {
      prior.selectLastField();
      result = true;
    }
    return result;
  }

  private selectSingleOrMulti(s: Frame, multiSelect: boolean) {
    if (multiSelect) {
      this.select(false, true);
      s.select(true, true);
    } else {
      s.select(true, false);
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
    this.getFields().forEach((f) => f.updateCompileStatus());
    this._compileStatus = this.worstCompileStatusOfFields();
  }

  protected setCompileStatus(newStatus: CompileStatus) {
    this._compileStatus = newStatus;
  }
  resetCompileStatusAndErrors(): void {
    if (this._compileStatus !== CompileStatus.default) {
      this.compileErrors = [];
      this.getFields().forEach((f) => f.resetCompileStatusAndErrors());
      this._compileStatus = CompileStatus.default;
    }
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
}

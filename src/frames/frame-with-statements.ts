import { AbstractFrame } from "./abstract-frame";
import { AbstractSelector } from "./abstract-selector";
import { Regexes } from "./fields/regexes";
import { isSelector } from "./frame-helpers";
import { CodeSource } from "./interfaces/code-source";
import { Collapsible } from "./interfaces/collapsible";
import { ElanSymbol } from "./interfaces/elan-symbol";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { Profile } from "./interfaces/profile";
import { Scope } from "./interfaces/scope";
import { StatementFactory } from "./interfaces/statement-factory";
import { Transforms } from "./interfaces/transforms";
import {
  compileStatements,
  parentHelper_addChildAfter,
  parentHelper_addChildBefore,
  parentHelper_compileChildren,
  parentHelper_deleteSelectedChildren,
  parentHelper_getChildAfter,
  parentHelper_getChildBefore,
  parentHelper_getChildRange,
  parentHelper_getFirstChild,
  parentHelper_getFirstSelectorAsDirectChild,
  parentHelper_getLastChild,
  parentHelper_insertOrGotoChildSelector,
  parentHelper_moveSelectedChildrenDownOne,
  parentHelper_moveSelectedChildrenUpOne,
  parentHelper_readWorstCompileStatusOfChildren,
  parentHelper_readWorstParseStatusOfChildren,
  parentHelper_removeChild,
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
  parentHelper_selectFirstChild,
  parentHelper_updateBreakpoints,
} from "./parent-helpers";
import { AssertStatement } from "./statements/assert-statement";
import { StatementSelector } from "./statements/statement-selector";
import { BreakpointEvent } from "./status-enums";
import { getIds, handleDeconstruction, isSymbol, symbolMatches } from "./symbols/symbol-helpers";

export abstract class FrameWithStatements extends AbstractFrame implements Parent, Collapsible {
  isFrameWithStatements = true;
  isCollapsible: boolean = true;
  isParent: boolean = true;
  private _children: Array<Frame> = new Array<Frame>();

  constructor(parent: Parent) {
    super(parent);
    this.getChildren().push(new StatementSelector(this));
  }

  getProfile(): Profile {
    return this.getFile().getProfile();
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "multiline");
  }

  getFactory(): StatementFactory {
    return this.getParent().getFactory();
  }

  updateParseStatus(): void {
    this.getChildren().forEach((c) => c.updateParseStatus());
    const worstOfFieldsOrChildren = Math.min(
      this.worstParseStatusOfFields(),
      parentHelper_readWorstParseStatusOfChildren(this),
    );
    this.setParseStatus(worstOfFieldsOrChildren);
  }

  updateCompileStatus(): void {
    this.getChildren().forEach((c) => c.updateCompileStatus());
    const worstOfFieldsOrChildren = Math.min(
      this.worstCompileStatusOfFields(),
      parentHelper_readWorstCompileStatusOfChildren(this),
    );
    super.updateCompileStatus(); //will update it based on fields and its own direct compile errors
    const newStatus = Math.min(this.readCompileStatus(), worstOfFieldsOrChildren);
    this.setCompileStatus(newStatus);
  }

  resetCompileStatusAndErrors(): void {
    this.getChildren().forEach((f) => f.resetCompileStatusAndErrors());
    super.resetCompileStatusAndErrors();
  }

  getChildren(): Frame[] {
    return this._children;
  }

  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 1;
  }

  expandCollapse(): void {
    if (this.isCollapsed()) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  newChildSelector(): AbstractSelector {
    return new StatementSelector(this);
  }
  insertOrGotoChildSelector(after: boolean, child: Frame) {
    parentHelper_insertOrGotoChildSelector(this, after, child);
  }

  insertSelectorAfterLastField(): void {
    const firstChild = this._children[0];
    if (isSelector(firstChild)) {
      firstChild.select(true, false);
    } else {
      const selector = this.newChildSelector();
      this.addChildBefore(selector, firstChild);
      selector.select(true, false);
    }
  }
  selectNextFrame(): void {
    this._children[0]?.select(true, false);
  }
  removeChild(child: Frame): void {
    parentHelper_removeChild(this, child);
  }
  getFirstChild(): Frame {
    return parentHelper_getFirstChild(this);
  }
  getLastChild(): Frame {
    return parentHelper_getLastChild(this);
  }
  getChildAfter(child: Frame): Frame {
    return parentHelper_getChildAfter(this, child);
  }
  getChildBefore(child: Frame): Frame {
    return parentHelper_getChildBefore(this, child);
  }
  getChildRange(first: Frame, last: Frame): Frame[] {
    return parentHelper_getChildRange(this, first, last);
  }
  getFirstSelectorAsDirectChild(): AbstractSelector {
    return parentHelper_getFirstSelectorAsDirectChild(this);
  }
  selectFirstChild(multiSelect: boolean): boolean {
    return parentHelper_selectFirstChild(this, multiSelect);
  }
  addChildBefore(child: Frame, before: Frame): void {
    this.hasBeenAddedTo();
    parentHelper_addChildBefore(this, child, before);
  }
  addChildAfter(child: Frame, before: Frame): void {
    this.hasBeenAddedTo();
    parentHelper_addChildAfter(this, child, before);
  }

  protected renderChildrenAsHtml(): string {
    return parentHelper_renderChildrenAsHtml(this);
  }
  protected renderChildrenAsSource(): string {
    return parentHelper_renderChildrenAsSource(this);
  }
  protected compileChildren(transforms: Transforms): string {
    return parentHelper_compileChildren(this, transforms);
  }

  selectFirstField(): boolean {
    let result = super.selectFirstField();
    if (!result) {
      result = this.getChildren()[0].selectFirstField();
    }
    return result;
  }

  selectFirstChildIfAny(): boolean {
    let result = false;
    if (this.getChildren().length > 0) {
      this.getChildren()[0].select(true, false);
      result = true;
    }
    return result;
  }

  deleteSelectedChildren(): void {
    parentHelper_deleteSelectedChildren(this);
  }

  moveSelectedChildrenUpOne(): void {
    parentHelper_moveSelectedChildrenUpOne(this);
  }
  moveSelectedChildrenDownOne(): void {
    parentHelper_moveSelectedChildrenDownOne(this);
  }

  parseFrom(source: CodeSource): void {
    this.parseTop(source);
    while (!this.parseBottom(source)) {
      if (source.isMatchRegEx(Regexes.newLine)) {
        source.removeRegEx(Regexes.newLine, false);
      } else {
        this.getFirstSelectorAsDirectChild().parseFrom(source);
      }
      source.removeIndent();
    }
  }

  abstract parseTop(source: CodeSource): void;
  abstract parseBottom(source: CodeSource): boolean;

  protected parseStandardEnding(source: CodeSource, keywords: string): boolean {
    source.removeIndent();
    let result = false;
    if (source.isMatch(keywords)) {
      source.remove(keywords);
      result = true;
    }
    return result;
  }

  protected compileChildStatements(transforms: Transforms): string {
    return compileStatements(transforms, this._children);
  }

  multipleIds(sid: string) {
    return sid.includes(",") || sid.includes(":");
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    const fst = this.getFirstChild();
    let range = this.getChildRange(fst, initialScope as Frame);
    if (range.length > 1) {
      range = range.slice(0, range.length - 1);

      for (const f of range) {
        if (isSymbol(f) && id) {
          const sids = getIds(f.symbolId);
          if (sids.includes(id)) {
            return f;
          }
        }
      }
    }

    return this.getParentScope().resolveSymbol(id, transforms, this.getCurrentScope());
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = this.getParentScope().symbolMatches(id, all, this.getCurrentScope());
    let localMatches: ElanSymbol[] = [];

    const fst = this.getFirstChild();
    let range = this.getChildRange(fst, initialScope as Frame);
    if (range.length > 1) {
      range = range.slice(0, range.length - 1);
      const symbols = handleDeconstruction(range.filter((r) => isSymbol(r)));
      localMatches = symbolMatches(id, all, symbols);
    }

    return localMatches.concat(matches);
  }

  getAsserts() {
    const children = this.getChildren();
    let asserts = children.filter((c) => c instanceof AssertStatement) as AssertStatement[];

    for (const f of children.filter((c) => c instanceof FrameWithStatements)) {
      asserts = asserts.concat(f.getAsserts());
    }

    return asserts;
  }

  updateBreakpoints(event: BreakpointEvent): void {
    super.updateBreakpoints(event);
    parentHelper_updateBreakpoints(this, event);
  }
}

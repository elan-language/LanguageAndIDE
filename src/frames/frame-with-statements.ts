import { AbstractFrame } from "./abstract-frame";
import { AbstractSelector } from "./abstract-selector";
import { CodeSource } from "./code-source";
import { CompileError } from "./compile-error";
import { Regexes } from "./fields/regexes";
import { Collapsible } from "./interfaces/collapsible";
import { ElanSymbol } from "./interfaces/elan-symbol";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { Profile } from "./interfaces/profile";
import { StatementFactory } from "./interfaces/statement-factory";
import {
  isNotSelectorFrame,
  parentHelper_addChildAfter,
  parentHelper_addChildBefore,
  parentHelper_aggregateCompileErrorsOfChildren,
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
} from "./parent-helpers";
import { DefinitionAdapter } from "./statements/definition-adapter";
import { StatementSelector } from "./statements/statement-selector";
import { getDeconstructionIds, isSymbol, symbolMatches } from "./symbols/symbol-helpers";
import { Transforms } from "./syntax-nodes/transforms";

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
    if ("isSelector" in firstChild) {
      firstChild.select(true, false);
    } else {
      const selector = this.newChildSelector();
      this.addChildBefore(selector, firstChild);
      selector.select(true, false);
    }
  }
  selectNextFrame(): void {
    this._children[0]?.select(true,false);
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

  protected compileStatements(transforms: Transforms): string {
    let result = "";
    if (this._children.length > 0) {
      const ss: Array<string> = [];
      for (const frame of this._children.filter(isNotSelectorFrame)) {
        ss.push(frame.compile(transforms));
      }
      result = ss.join("\r\n");
    }
    return result;
  }

  multipleIds(sid: string) {
    return sid.includes(",") || sid.includes(":");
  }

  getIds(sid: string) {
    if (sid.includes(",")) {
      return sid.split(",").map((s) => s.trim());
    }
    if (sid.includes(":")) {
      return sid.split(":").map((s) => s.trim());
    }
    return [sid];
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    const fst = this.getFirstChild();
    let range = this.getChildRange(fst, initialScope);
    if (range.length > 1) {
      range = range.slice(0, range.length - 1);

      for (const f of range) {
        if (isSymbol(f) && id) {
          const sids = this.getIds(f.symbolId);
          if (sids.includes(id)) {
            return f;
          }
        }
      }
    }

    return this.getParent().resolveSymbol(id, transforms, this);
  }

  handleDeconstruction(ss: ElanSymbol[]) {
    const newSymbols: ElanSymbol[] = [];

    for (const s of ss) {
      const ids = getDeconstructionIds(s.symbolId);

      if (ids.length === 1) {
        newSymbols.push(s);
      } else {
        for (let i = 0; i < ids.length; i++) {
          newSymbols.push(new DefinitionAdapter(s, i));
        }
      }
    }

    return newSymbols;
  }

  symbolMatches(id: string, all: boolean, initialScope?: Frame): ElanSymbol[] {
    const matches = this.getParent().symbolMatches(id, all, this);
    let localMatches: ElanSymbol[] = [];

    const fst = this.getFirstChild();
    let range = this.getChildRange(fst, initialScope!);
    if (range.length > 1) {
      range = range.slice(0, range.length - 1);
      const symbols = this.handleDeconstruction(range.filter((r) => isSymbol(r)));
      localMatches = symbolMatches(id, all, symbols);
    }

    return localMatches.concat(matches);
  }

  aggregateCompileErrors(): CompileError[] {
    const cc = parentHelper_aggregateCompileErrorsOfChildren(this);
    return cc.concat(super.aggregateCompileErrors());
  }
}

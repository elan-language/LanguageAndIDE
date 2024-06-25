import { ElanSymbol } from "./interfaces/symbol";
import { isSymbol } from "./symbols/symbol-helpers";
import { AbstractFrame } from "./abstract-frame";
import { AbstractSelector } from "./abstract-selector";
import { CodeSource } from "./code-source";
import { Regexes } from "./fields/regexes";
import { Collapsible } from "./interfaces/collapsible";
import { Field } from "./interfaces/field";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { Profile } from "./interfaces/profile";
import { StatementFactory } from "./interfaces/statement-factory";
import {
  parentHelper_addChildAfter,
  parentHelper_addChildBefore,
  parentHelper_aggregateCompileErrorsOfChildren,
  parentHelper_getChildAfter,
  parentHelper_getChildBefore,
  parentHelper_getChildRange,
  parentHelper_getFirstChild,
  parentHelper_getFirstSelectorAsDirectChild,
  parentHelper_getLastChild,
  parentHelper_insertOrGotoChildSelector,
  parentHelper_moveSelectedChildrenDownOne,
  parentHelper_moveSelectedChildrenUpOne,
  parentHelper_removeChild,
  parentHelper_renderChildrenAsHtml,
  parentHelper_compileChildren,
  parentHelper_renderChildrenAsSource,
  parentHelper_selectFirstChild,
  parentHelper_readWorstParseStatusOfChildren,
  parentHelper_readWorstCompileStatusOfChildren,
} from "./parent-helpers";
import { StatementSelector } from "./statements/statement-selector";
import { CompileError } from "./compile-error";
import { Transforms } from "./syntax-nodes/transforms";

export abstract class FrameWithStatements extends AbstractFrame implements Parent, Collapsible {
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
    //intende to overridden byFrameWithStatements
    const firstChild = this._children[0];
    if ("isSelector" in firstChild) {
      firstChild.select(true, false);
    } else {
      const selector = this.newChildSelector();
      this.addChildBefore(selector, firstChild);
      selector.select(true, false);
    }
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
    parentHelper_addChildBefore(this, child, before);
  }
  addChildAfter(child: Frame, before: Frame): void {
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
      for (const frame of this._children.filter((s) => !("isSelector" in s))) {
        ss.push(frame.compile(transforms));
      }
      result = ss.join("\r\n");
    }
    return result;
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    const fst = this.getFirstChild();
    let range = this.getChildRange(fst, initialScope);
    if (range.length > 1) {
      range = range.slice(0, range.length - 1);

      for (const f of range) {
        if (isSymbol(f) && id) {
          // todo kludge
          const sid = f.symbolId;

          if (sid.startsWith("(")) {
            const sids = sid
              .slice(1, -1)
              .split(",")
              .map((s) => s.trim());

            if (sids.includes(id)) {
              return f;
            }
          } else if (sid === id) {
            return f;
          }
        }
      }
    }

    return this.getParent().resolveSymbol(id, transforms, this);
  }

  symbolMatches(id: string, all: boolean, initialScope?: Frame): ElanSymbol[] {
    const matches = this.getParent().symbolMatches(id, all);
    const localMatches: ElanSymbol[] = [];

    const fst = this.getFirstChild();
    let range = this.getChildRange(fst, initialScope!);
    if (range.length > 1) {
      range = range.slice(0, range.length - 1);

      for (const f of range) {
        if (isSymbol(f) && id) {
          // todo kludge
          const sid = f.symbolId;

          if (sid.startsWith("(")) {
            const sids = sid
              .slice(1, -1)
              .split(",")
              .map((s) => s.trim());

            if (sids.some((sid) => sid.startsWith(id) || all)) {
              localMatches.push(f);
            }
          } else if (sid.startsWith(id) || all) {
            localMatches.push(f);
          }
        }
      }
    }

    return localMatches.concat(matches);
  }

  aggregateCompileErrors(): CompileError[] {
    const cc = parentHelper_aggregateCompileErrorsOfChildren(this);
    return cc.concat(super.aggregateCompileErrors());
  }
}

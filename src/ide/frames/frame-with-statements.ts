import { BreakpointEvent } from "../../compiler/debugging/breakpoint-event";
import { AbstractFrame } from "./abstract-frame";
import { AbstractSelector } from "./abstract-selector";
import { Regexes } from "./fields/regexes";
import { isSelector } from "./frame-helpers";
import { CodeSource } from "./frame-interfaces/code-source";
import { Collapsible } from "./frame-interfaces/collapsible";
import { Frame } from "./frame-interfaces/frame";
import { Parent } from "./frame-interfaces/parent";
import { Profile } from "./frame-interfaces/profile";
import { StatementFactory } from "./frame-interfaces/statement-factory";
import {
  parentHelper_addChildAfter,
  parentHelper_addChildBefore,
  parentHelper_copySelectedChildren,
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
  setGhostOnSelectedChildren,
} from "./parent-helpers";
import { AssertStatement } from "./statements/assert-statement";
import { StatementSelector } from "./statements/statement-selector";
import { CompileStatus } from "./status-enums";

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

  readCompileStatus(): CompileStatus {
    const worstOfFieldsOrChildren = Math.min(
      this.worstCompileStatusOfFields(),
      parentHelper_readWorstCompileStatusOfChildren(this),
    );
    const newStatus = Math.min(super.readCompileStatus(), worstOfFieldsOrChildren);
    return newStatus;
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

  copySelectedChildren(): boolean {
    return parentHelper_copySelectedChildren(this);
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

  multipleIds(sid: string) {
    return sid.includes(",") || sid.includes(":");
  }

  getAsserts() {
    const children = this.getChildren();
    let asserts = children.filter(
      (c) => c instanceof AssertStatement && !c.isGhosted(),
    ) as AssertStatement[];

    for (const f of children.filter((c) => c instanceof FrameWithStatements)) {
      asserts = asserts.concat(f.getAsserts());
    }

    return asserts;
  }

  updateBreakpoints(event: BreakpointEvent): void {
    super.updateBreakpoints(event);
    parentHelper_updateBreakpoints(this, event);
  }

  ghostSelectedChildren(): void {
    setGhostOnSelectedChildren(this, true);
  }
  unghostSelectedChildren(): void {
    setGhostOnSelectedChildren(this, false);
  }

  override deleteAllGhosted(): void {
    if (this.isGhosted()) {
      this.delete();
    } else {
      const children = this._children.slice();
      for (const child of children) {
        child.deleteAllGhosted();
      }
    }
  }

  renderAsHtml(): string {
    return `<${this.outerHtmlTag} class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>${this.language().renderTopAsHtml(this)}
${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
${this.language().renderBottomAsHtml(this)}
</${this.outerHtmlTag}>`;
  }
}

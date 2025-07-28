import { BreakpointEvent } from "../../compiler/debugging/breakpoint-event";
import { AbstractSelector } from "./abstract-selector";
import { isSelector } from "./frame-helpers";
import { Frame } from "./frame-interfaces/frame";
import { Parent } from "./frame-interfaces/parent";
import { CompileStatus, ParseStatus } from "./status-enums";

export function worstParseStatus(prev: ParseStatus, cur: ParseStatus) {
  return cur < prev ? cur : prev;
}

export function parentHelper_readWorstParseStatusOfChildren(parent: Parent): ParseStatus {
  return parent
    .getChildren()
    .map((s) => s.readParseStatus())
    .reduce(worstParseStatus, ParseStatus.default);
}

export function parentHelper_readWorstCompileStatusOfChildren(parent: Parent): CompileStatus {
  return parent
    .getChildren()
    .map((s) => s.readCompileStatus())
    .reduce((prev, cur) => (cur < prev ? cur : prev), CompileStatus.default);
}

export function parentHelper_removeChild(parent: Parent, child: Frame): void {
  const i = parent.getChildren().indexOf(child);
  if (i >= 0) {
    parent.getChildren().splice(i, 1);
  } else {
    parent.getFile().getMap().delete(child.getHtmlId());
  }
  child.deselect();
}

export function parentHelper_removeAllSelectedChildren(parent: Parent): Frame[] {
  const selected = parentHelper_getAllSelectedChildren(parent);
  const nonSelectors = selected.filter((s) => !(s.initialKeywords() === "selector"));
  for (const child of nonSelectors) {
    parentHelper_removeChild(parent, child);
  }
  return selected;
}

export function parentHelper_getFirstChild(parent: Parent): Frame {
  return parent.getChildren()[0]; //Should always be one - if only a Selector
}

export function parentHelper_getLastChild(parent: Parent): Frame {
  return parent.getChildren()[parent.getChildren().length - 1];
}

export function parentHelper_getChildAfter(parent: Parent, child: Frame): Frame {
  const index = parent.getChildren().indexOf(child);
  return index < parent.getChildren().length - 1 ? parent.getChildren()[index + 1] : child;
}

export function parentHelper_getChildBefore(parent: Parent, child: Frame): Frame {
  const index = parent.getChildren().indexOf(child);
  return index > 0 ? parent.getChildren()[index - 1] : child;
}

export function parentHelper_getChildRange(parent: Parent, first: Frame, last: Frame): Frame[] {
  const fst = parent.getChildren().indexOf(first);
  const lst = parent.getChildren().indexOf(last);
  return fst < lst
    ? parent.getChildren().slice(fst, lst + 1)
    : parent.getChildren().slice(lst, fst + 1);
}

export function parentHelper_getFirstSelectorAsDirectChild(parent: Parent): AbstractSelector {
  return parent.getChildren().filter((g) => isSelector(g))[0];
}

export function parentHelper_selectFirstChild(parent: Parent, multiSelect: boolean): boolean {
  if (parent.getChildren().length > 0) {
    parent.getChildren()[0].select(true, multiSelect);
    return true;
  }
  return false;
}

export function parentHelper_addChildBefore(parent: Parent, child: Frame, before: Frame) {
  const i = parent.getChildren().indexOf(before);
  child.setParent(parent);
  parent.getChildren().splice(i, 0, child);
}

export function parentHelper_addChildAfter(parent: Parent, child: Frame, after: Frame) {
  const i = parent.getChildren().indexOf(after) + 1;
  parent.getChildren().splice(i, 0, child);
}

export function parentHelper_renderChildrenAsHtml(parent: Parent): string {
  const ss: Array<string> = [];
  for (const m of parent.getChildren()) {
    ss.push(m.renderAsHtml());
  }
  return ss.join("\n");
}

export function isNotSelectorFrame(f: Frame) {
  return !!f && !("isSelector" in f);
}

export function parentHelper_renderChildrenAsSource(parent: Parent): string {
  let result = "";
  if (parent.getChildren().length > 0) {
    const ss: Array<string> = [];
    for (const frame of parent.getChildren().filter(isNotSelectorFrame)) {
      ss.push(frame.renderAsSource());
    }
    result = ss.join("\r\n");
  }
  return result;
}

export function parentHelper_insertOrGotoChildSelector(
  parent: Parent,
  after: boolean,
  child: Frame,
) {
  if (after && child.canInsertAfter()) {
    insertOrGotoChildSelectorAfter(parent, child);
  } else if (!after && child.canInsertBefore()) {
    insertOrGotoChildSelectorBefore(parent, child);
  }
}

function insertOrGotoChildSelectorBefore(parent: Parent, child: Frame) {
  const prev = parent.getChildBefore(child);
  if (isSelector(prev)) {
    // if there is a selector before
    prev.select(true, false);
  } else {
    const selector = parent.newChildSelector();
    parent.addChildBefore(selector, child);
    selector.select(true, false);
  }
}

function insertOrGotoChildSelectorAfter(parent: Parent, child: Frame) {
  const follow = parent.getChildAfter(child);
  if (isSelector(follow)) {
    // if there is a selector before
    follow.select(true, false);
  } else {
    const selector = parent.newChildSelector();
    parent.addChildAfter(selector, child);
    selector.select(true, false);
  }
}

export function parentHelper_getAllSelectedChildren(parent: Parent): Frame[] {
  return parent.getChildren().filter((g) => g.isSelected());
}

export function parentHelper_deleteSelectedChildren(parent: Parent): void {
  const toDelete = parentHelper_getAllSelectedChildren(parent);
  //work in reverse order as selecting the next one
  for (let i = toDelete.length - 1; i >= 0; i--) {
    toDelete[i].deleteIfPermissible();
  }
}

export function parentHelper_moveSelectedChildrenUpOne(parent: Parent): void {
  const toMove = parentHelper_getAllSelectedChildren(parent);
  let cont = true;
  let i = 0;
  while (cont && i < toMove.length) {
    cont = moveUpOne(parent, toMove[i]);
    i++;
  }
}

export function parentHelper_moveSelectedChildrenDownOne(parent: Parent): void {
  const toMove = parentHelper_getAllSelectedChildren(parent);
  let cont = true;
  let i = toMove.length - 1;
  while (cont && i >= 0) {
    cont = moveDownOne(parent, toMove[i]);
    i--;
  }
}
function moveDownOne(parent: Parent, child: Frame): boolean {
  let result = false;
  const i = parent.getChildren().indexOf(child);
  if (i < parent.getChildren().length - 1 && parent.getChildren()[i + 1].canInsertAfter()) {
    parent.getChildren().splice(i, 1);
    parent.getChildren().splice(i + 1, 0, child);
    result = true;
  }
  return result;
}
function moveUpOne(parent: Parent, child: Frame): boolean {
  let result = false;
  const i = parent.getChildren().indexOf(child);
  if (i > 0 && parent.getChildren()[i - 1].canInsertBefore()) {
    parent.getChildren().splice(i, 1);
    parent.getChildren().splice(i - 1, 0, child);
    result = true;
  }
  return result;
}

export function parentHelper_updateBreakpoints(parent: Parent, event: BreakpointEvent) {
  for (const frame of parent.getChildren()) {
    frame.updateBreakpoints(event);
  }
}

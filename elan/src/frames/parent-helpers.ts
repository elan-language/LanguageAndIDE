import { AbstractSelector } from "./abstract-selector";
import { CompileError } from "./compile-error";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { CompileStatus, ParseStatus } from "./status-enums";
import { Transforms } from "./syntax-nodes/transforms";


export function parentHelper_worstParseStatusOfChildren(parent: Parent): ParseStatus {
        return parent.getChildren().map(s => s.getParseStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
}
export function parentHelper_aggregateCompileErrorsOfChildren(parent: Parent): CompileError[] {
    return parent.getChildren().map(s => s.aggregateCompileErrors()).reduce((prev, cur) => prev.concat(cur), []);
}
    
export function parentHelper_worstCompileStatusOfChildren(parent: Parent): CompileStatus {
    return parent.getChildren().map(s => s.getCompileStatus()).reduce((prev, cur) => cur < prev ? cur : prev, CompileStatus.ok);
}

export function parentHelper_removeChild(parent: Parent, child: Frame): void {
        const i = parent.getChildren().indexOf(child);
        parent.getChildren().splice(i,1);
}

export function parentHelper_getFirstChild(parent: Parent): Frame {
        return parent.getChildren()[0]; //Should always be one - if only a Selector
    }

export function parentHelper_getLastChild(parent: Parent): Frame {
    return parent.getChildren()[parent.getChildren().length - 1];
}

export function parentHelper_getChildAfter(parent: Parent, child: Frame): Frame {
    const index = parent.getChildren().indexOf(child);
    return index < parent.getChildren().length -1 ? parent.getChildren()[index +1] : child;
}

export function parentHelper_getChildBefore(parent: Parent, child: Frame): Frame {
    const index = parent.getChildren().indexOf(child);
    return index > 0 ? parent.getChildren()[index -1] : child;
}

export function parentHelper_getChildRange(parent: Parent, first: Frame, last: Frame): Frame[] {
    const fst = parent.getChildren().indexOf(first);
    const lst = parent.getChildren().indexOf(last);
    return fst < lst ? parent.getChildren().slice(fst, lst + 1) : parent.getChildren().slice(lst, fst + 1);
}

export function parentHelper_getFirstSelectorAsDirectChild(parent: Parent) : AbstractSelector {
    return parent.getChildren().filter(g => ('isSelector' in g))[0] as AbstractSelector;
}

export function parentHelper_selectFirstChild(parent: Parent, multiSelect: boolean): boolean {
    if (parent.getChildren().length > 0){
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

export function parentHelper_renderChildrenAsSource(parent: Parent) : string {
    let result = "";
    if (parent.getChildren().length > 0 ) {
        const ss: Array<string> = [];
        for (const frame of parent.getChildren().filter(s => !('isSelector' in s))) {
            ss.push(frame.renderAsSource());
        }
        result = ss.join("\r\n");
    }
    return result;
}

export function parentHelper_compileChildren(parent: Parent, transforms : Transforms) : string {
    let result = "";
    if (parent.getChildren().length > 0 ) {
        const ss: Array<string> = [];
        for (const frame of parent.getChildren().filter(s => !('isSelector' in s))) {
            ss.push(frame.compile(transforms));
        }
        result = ss.join("\r\n");
    }
    return result;
}

export function parentHelper_insertOrGotoChildSelector(parent: Parent, after: boolean, child: Frame) {
    if (after && child.canInsertAfter()) {
       insertOrGotoChildSelectorAfter(parent, child);
    } else if (!after && child.canInsertBefore()) {
        insertOrGotoChildSelectorBefore(parent, child);
    }
}

function insertOrGotoChildSelectorBefore(parent: Parent, child: Frame) {
    const prev = parent.getChildBefore(child);
    if ('isSelector' in prev) { // if there is a selector before
        prev.select(true, false);
     } else {
        const selector = parent.newChildSelector();
        parent.addChildBefore(selector, child);
        selector.select(true, false);
     }
}

function insertOrGotoChildSelectorAfter(parent: Parent, child: Frame) {
    const follow = parent.getChildAfter(child);
    if ('isSelector' in follow) { // if there is a selector before
        follow.select(true, false);
     } else {
        const selector = parent.newChildSelector();
        parent.addChildAfter(selector, child);
        selector.select(true, false);
     }
}

export function parentHelper_moveSelectedChildrenUpOne(parent: Parent): void {
    const toMove = parent.getChildren().filter(g => g.isSelected()); 
    let cont = true;
    let i = 0;
    while (cont && i < toMove.length) {
        cont = moveUpOne(parent, toMove[i]);
        i++;
    }
}
export function parentHelper_moveSelectedChildrenDownOne(parent: Parent): void {
    const toMove = parent.getChildren().filter(g => g.isSelected()); 
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
    if ((i < parent.getChildren().length - 1) && (parent.getChildren()[i+1].canInsertAfter())) {
        parent.getChildren().splice(i,1);
        parent.getChildren().splice(i+1,0,child);  
        result = true;
    }
    return result;
}
function moveUpOne(parent: Parent, child: Frame): boolean {
    let result = false;
    const i = parent.getChildren().indexOf(child);
    if ((i > 0) && (parent.getChildren()[i-1].canInsertBefore())) {
        parent.getChildren().splice(i,1);
        parent.getChildren().splice(i-1,0,child);
        result = true;     
    }
    return result;
}

export function parentHelper_selectLastField(parent: Parent): boolean {
    const n = parent.getChildren().length;
    return parent.getChildren()[n-1].selectLastField();
} 



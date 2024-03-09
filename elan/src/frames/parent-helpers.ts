import { AbstractFrame } from "./abstract-frame";
import { AbstractSelector } from "./abstract-selector";
import { CodeSource } from "./code-source";
import { Regexes } from "./fields/regexes";
import { Collapsible } from "./interfaces/collapsible";
import { Field } from "./interfaces/field";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { StatementFactory } from "./interfaces/statement-factory";
import { ParseStatus } from "./parse-status";


export function parentHelper_worstStatusOfChildren(parent: Parent): ParseStatus {
        return parent.getChildren().map(s => s.getStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
}

export function parentHelper_removeChild(parent: Parent, child: Frame): void {
        var i = parent.getChildren().indexOf(child);
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
    var fst = parent.getChildren().indexOf(first);
    var lst = parent.getChildren().indexOf(last);
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
    var i = parent.getChildren().indexOf(before);
    parent.getChildren().splice(i, 0, child);
}

export function parentHelper_addChildAfter(parent: Parent, child: Frame, after: Frame) {
    var i = parent.getChildren().indexOf(after) + 1;
    parent.getChildren().splice(i, 0, child);   
}

export function parentHelper_renderChildrenAsHtml(parent: Parent): string {
    const ss: Array<string> = [];
    for (var m of parent.getChildren()) {
        ss.push(m.renderAsHtml());
    }
    return ss.join("\n");
}

export function parentHelper_renderChildrenAsSource(parent: Parent) : string {
    var result = "";
    if (parent.getChildren().length > 0 ) {
        const ss: Array<string> = [];
        for (var frame of parent.getChildren().filter(s => !('isSelector' in s))) {
            ss.push(frame.renderAsSource());
        }
        result = ss.join("\r\n");
    }
    return result;
}

export function parentHelper_insertChildSelector(parent: Parent, after: boolean, child: Frame) {
    var selector = parent.newChildSelector();
    if (after && child.canInsertAfter()) {
        parent.addChildAfter(selector, child);
    } else if (!after && child.canInsertBefore()) {
        parent.addChildBefore(selector, child);
    }
    selector.select(true, false);
}

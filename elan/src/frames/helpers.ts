import { Selectable } from "./interfaces/selectable";

import { Member } from "./interfaces/member";
import { Field } from "./interfaces/field";
import { Collapsible } from "./interfaces/collapsible";
import { Parent } from "./interfaces/parent";
import { Frame } from "./interfaces/frame";

export function isCollapsible(f?: Selectable): f is Collapsible {
    return !!f && 'isCollapsible' in f;
}

export function isFrame(f?: any): f is Frame {
    return !!f && 'isFrame' in f;
}

export function isParent(f?: any): f is Parent {
    return !!f && 'isParent' in f;
}

export function isMember(f?: Selectable): f is Member {
    return !!f && 'isMember' in f;
} 

export function isField(f?: Selectable): f is Field {
    return !!f && 'isField' in f;
} 

export function singleIndent() {
    return "  ";
}

export function safeSelectAfter(toSelect: Array<{ select: (withFocus: boolean, multiSelect: boolean) => void }>, index: number, multiSelect: boolean) {
    if (index === -1) {
        return;
    }
    if (index < toSelect.length - 1) {
        toSelect[index + 1].select(true, multiSelect);
    }
    else {
        toSelect[toSelect.length - 1].select(true, multiSelect);
    }
}

export function safeSelectBefore(toSelect: Array<{ select: (withFocus: boolean, multiSelect: boolean) => void }>, index: number, multiSelect: boolean) {
    if (index === -1) {
        return;
    }
    if (index > 0) {
        toSelect[index - 1].select(true, multiSelect);
    }
    else {
        toSelect[0].select(true, multiSelect);
    }
}

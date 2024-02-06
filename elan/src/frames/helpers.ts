import { Selectable } from "./interfaces/selectable";
import { Statement } from "./interfaces/statement";
import { Member } from "./interfaces/member";
import { Field } from "./interfaces/field";
import { Collapsible } from "./interfaces/collapsible";
import { ParentFrame } from "./interfaces/parent-frame";
import { Frame } from "./interfaces/frame";

export function isCollapsible(f?: Selectable): f is Collapsible {
    return !!f && 'isCollapsible' in f;
}

export function isParent(f?: Selectable): f is ParentFrame {
    return !!f && 'isParent' in f;
}

export function isFrame(f?: Selectable): f is Frame {
    return !!f && 'isFrame' in f;
}

export function isStatement(f?: Selectable): f is Statement {
    return !!f && 'isStatement' in f;
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

export function selectChildRange(ff: Array<Selectable>, multiSelect: boolean): void {
    const selected = ff.filter(f => f.isSelected());
    if (selected.length > 1) {
        const firstSelectedIndex = ff.indexOf(selected[0]);
        const lastSelectedIndex = ff.indexOf(selected[selected.length - 1]);

        if (lastSelectedIndex > firstSelectedIndex + 1) {
            for (var i = firstSelectedIndex + 1; i <= lastSelectedIndex - 1; i++) {
                ff[i].select(false, multiSelect);
            }
        }
        else if (firstSelectedIndex > lastSelectedIndex + 1) {
            for (var i = lastSelectedIndex + 1; i <= firstSelectedIndex - 1; i++) {
                ff[i].select(false, multiSelect);
            }
        }
    }
}


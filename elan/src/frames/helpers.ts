import { Renderable } from "./frame";
import { Statement } from "./statements/statement";
import { Global } from "./globals/global";
import { Member } from "./class-members/member";
import { Field } from "./text-fields/field"; 

var id = 0;
export function nextId() {
    return id++;
}

export function resetId() {
    id = 0;
}

export function isGlobal(f?: Renderable): f is Global {
    return !!f && 'isGlobal' in f;
}

export function isStatement(f?: Renderable): f is Statement {
    return !!f && 'isStatement' in f;
}

export function isMember(f?: Renderable): f is Member {
    return !!f && 'isMember' in f;
} 

export function isText(f?: Renderable): f is Field {
    return !!f && 'enterText' in f;
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

export function selectChildRange(ff: Array<Renderable>, multiSelect: boolean): void {
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


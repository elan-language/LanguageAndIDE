import { Frame } from "./frame";
import { Statement } from "./statements/statement";
import { Global } from "./globals/global";
import { Member } from "./class-members/member";

var id = 0;
export function nextId() {
    return id++;
}

export function resetId() {
    id = 0;
}

export function isGlobal(f?: Frame): f is Global {
    return !!f && 'isGlobal' in f;
}

export function isStatement(f?: Frame): f is Statement {
    return !!f && 'isStatement' in f;
}

export function isMember(f?: Frame): f is Member {
    return !!f && 'isMember' in f;
} 
export function singleIndent() {
    return "  ";
}

export function safeSelectAfter(toSelect: Array<{ select: (withFocus: boolean) => void }>, index: number) {
    if (index === -1) {
        return;
    }
    if (index < toSelect.length - 1) {
        toSelect[index + 1].select(true);
    }
    else {
        toSelect[toSelect.length - 1].select(true);
    }
}

export function safeSelectBefore(toSelect: Array<{ select: (withFocus: boolean) => void }>, index: number) {
    if (index === -1) {
        return;
    }
    if (index > 0) {
        toSelect[index - 1].select(true);
    }
    else {
        toSelect[0].select(true);
    }
}

export function selectChildRange(ff: Array<Frame>): void {
    const selected = ff.filter(f => f.isSelected());
    if (selected.length > 1) {
        const firstSelectedIndex = ff.indexOf(selected[0]);
        const lastSelectedIndex = ff.indexOf(selected[selected.length - 1]);

        for (var i = firstSelectedIndex; i <= lastSelectedIndex; i++) {
            ff[i].select(false);
        }
    }
}


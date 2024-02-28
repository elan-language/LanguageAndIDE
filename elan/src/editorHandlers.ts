import { isFrame } from './frames/helpers';
import { Collapsible } from './frames/interfaces/collapsible';
import { File } from './frames/interfaces/file';
import { Frame } from './frames/interfaces/frame';
import { Selectable } from './frames/interfaces/selectable';

export interface editorEvent {
    type: "click" | "dblclick" | "key"
    target: "frame" | "window"
    key?: string,
    modKey: { control: boolean, shift: boolean, alt: boolean },
    id?: string
}

function getAllSelected(file: File) {
    const v = file?.getMap().values()!;
    return [...v].filter(s => s.isSelected());
}

export function handleClick(e: editorEvent, file: File) {
    switch (e.target) {
        case 'frame': {
            const s = file.getById(e.id!);

            if (e.modKey.shift && isFrame(s)) {
                const parent = s.getParent();
                // all current selections with same parent
                const curSel = getAllSelected(file).filter(i => isFrame(i) && i.getParent() === parent);

                if (curSel.length > 0) {
                    const toSelect = new Set<Selectable>();

                    for (var cs of curSel) {
                        const range = parent.getChildRange(cs as Frame, s);
                        for (var r of range) {
                            toSelect.add(r);
                        }
                    }

                    // this should clear all other selections
                    s?.select(true, false);
                    // select all in range
                    for (var ts of toSelect) {
                        ts.select(false, true);
                    }
                    // select with focus clicked on frame
                    s?.select(true, true);
                }
                else {
                    s?.select(true, false);
                }
            }
            else {
                s?.select(true, false);
            }
            break;
        }
    }
}

export function handleDblClick(e: editorEvent, file: File) {
    switch (e.target) {
        case 'frame': {
            const s = file.getById(e.id!) as Collapsible;
            s.expandCollapse();
            break;
        }
    }
}

export function handleKey(e: editorEvent, file: File) {
    switch (e.target) {
        case 'frame': {
            handleModelKey(e, file);
            break;
        }
        case 'window': {
            handleWindowKey(e, file);
            break;
        }
    }
}

function handleModelKey(e: editorEvent, file: File) {
    switch (e.key) {
        case 'Shift':
        case 'Control':
        case 'Alt': break; // consume
        case 'Escape': {
            file.deselectAll();
            break;
        }
        case 'O': {
            if (e.modKey.control) {
                file.expandCollapseAll();
            }
        }
        default:
            const s = file.getById(e.id!);
            s?.processKey({ key: e.key, shift: e.modKey.shift, control: e.modKey.control, alt: e.modKey.alt });
    }
}

function handleWindowKey(e: editorEvent, file: File) {
    switch (e.key) {
        case 'Home': {
            const g = file.getFirstChild();
            g?.select(true, false);
            break;
        }
        case 'Enter': {
            const g = file.getFirstChild();
            g?.select(true, false);
            break;
        }
        case 'ArrowDown': {
            const g = file.getFirstChild();
            g?.select(true, false);
            break;
        }
        case 'ArrowRight': {
            const g = file.getFirstChild();
            g?.select(true, false);
            break;
        }
        case 'End': {
            const g = file.getLastChild();
            g?.select(true, false);
            break;
        }
        case 'O': {
            if (e.modKey.control) {
                file.expandCollapseAll();
            }
            break;
        }
    }
}
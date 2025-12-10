import { isCollapsible, isFrame } from "../frames/frame-helpers";
import { editorEvent } from "../frames/frame-interfaces/editor-event";
import { Frame } from "../frames/frame-interfaces/frame";
import { Selectable } from "../frames/frame-interfaces/selectable";
import { ICodeEditorViewModel } from "./ui-helpers";

function getAllSelected(file: ICodeEditorViewModel) {
  const v = file.getMap().values();
  return [...v].filter((s) => s.isSelected());
}

export function handleClick(e: editorEvent, file: ICodeEditorViewModel) {
  switch (e.target) {
    case "frame": {
      const s = file.getById(e.id!);

      if (e.modKey.shift && isFrame(s)) {
        const parent = s.getParent();
        // all current selections with same parent
        const curSel = getAllSelected(file).filter((i) => isFrame(i) && i.getParent() === parent);

        if (curSel.length > 0) {
          const toSelect = new Set<Selectable>();

          for (const cs of curSel) {
            const range = parent.getChildRange(cs as Frame, s);
            const fr = range.filter((c) => c);

            if (range.length !== fr.length) {
              console.warn(
                `getChildRange returned undefined element - cs: ${cs?.constructor?.name}  s: ${s?.constructor?.name}`,
              );
            }

            for (const r of fr) {
              toSelect.add(r);
            }
          }

          // this should clear all other selections
          s?.select(true, false);
          // select all in range
          for (const ts of toSelect) {
            ts.select(false, true);
          }
          // select with focus clicked on frame
          s?.select(true, true);
        } else {
          s?.select(true, false);
        }
      } else {
        s?.select(true, false, e.selection);
      }
      return true;
    }
  }
  return false;
}
export function handleDblClick(e: editorEvent, file: ICodeEditorViewModel) {
  switch (e.target) {
    case "frame": {
      const s = file.getById(e.id!);
      if (isCollapsible(s)) {
        s.expandCollapse();
      }
      return true;
    }
  }
  return false;
}

export function handleKey(e: editorEvent, file: ICodeEditorViewModel) {
  switch (e.key) {
    case "Shift":
      break; //Short circuit repeat from modifier held-down before other key
    case "Control":
      break;
    case "Alt":
      break;
    default: {
      if (e.target === "frame") {
        return file.getById(e.id!).processKey(e);
      } else {
        return file.processKey(e);
      }
    }
  }
  return false;
}

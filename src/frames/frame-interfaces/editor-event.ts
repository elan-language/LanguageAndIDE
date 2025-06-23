export interface editorEvent {
  type: "click" | "dblclick" | "key" | "paste" | "contextmenu";
  target: "frame";
  key?: string;
  modKey: { control: boolean; shift: boolean; alt: boolean };
  id?: string;
  selection?: [number, number];
  optionalData?: string;
}

export function modKeyString(mk: { control: boolean; shift: boolean; alt: boolean }) {
  return `control:${mk.control}, shift:${mk.shift}, alt:${mk.alt}`;
}

export function toDebugString(ee: editorEvent | undefined) {
  return ee
    ? `editorEvent: {
type: ${ee.type},
target: ${ee.target},
key: ${ee?.key ?? "not set"},
modKey: ${modKeyString(ee.modKey)},
id: ${ee?.id ?? "not set"},
selection: ${ee.selection ? ee.selection : "not set"},
optionalData: ${ee?.optionalData ?? "not set"}
}`
    : "no editor event recorded";
}

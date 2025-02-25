export interface editorEvent {
  type: "click" | "dblclick" | "key" | "paste" | "contextmenu";
  target: "frame";
  key?: string;
  modKey: { control: boolean; shift: boolean; alt: boolean };
  id?: string;
  selection?: [number, number];
  optionalData?: string;
}

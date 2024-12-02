export interface editorEvent {
  type: "click" | "dblclick" | "key" | "paste";
  target: "frame" | "window";
  key?: string;
  modKey: { control: boolean; shift: boolean; alt: boolean };
  id?: string;
  selection?: [number, number];
  autocomplete?: string;
}

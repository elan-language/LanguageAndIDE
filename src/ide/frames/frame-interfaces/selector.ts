import { Frame } from "./frame";

export interface Selector extends Frame {
  paste(code?: string): boolean;
}

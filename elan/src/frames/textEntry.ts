import { Frame } from "./frame";

export interface TextEntry extends Frame {

    enterText(text: string): void;

}
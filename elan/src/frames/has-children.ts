import { Frame } from "./frame";

export interface HasChildren extends Frame {
    selectFirstChild(): void; //Cursor right
    selectLastChild(): void; //Cursor right
    selectChildAfter(child: Frame): void;
    selectChildBefore(child: Frame): void;
    selectChildRange(): void;
}
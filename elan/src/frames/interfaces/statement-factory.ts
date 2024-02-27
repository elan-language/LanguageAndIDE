import { Frame } from "./frame";

export interface StatementFactory {
    addFrameBeforeAndSelectFirstField(frameType: string, selector: Frame): Frame;
}

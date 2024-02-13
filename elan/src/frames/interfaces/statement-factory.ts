import { Frame } from "./frame";

export interface StatementFactory {
    addFrameBefore(frameType: string, selector: Frame): Frame;
}

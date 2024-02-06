import { Frame } from "./frame";

export interface StatementFactory {
    addCallBefore(s: Frame): void;
    addEachBefore(s: Frame): void;
    addForBefore(s: Frame): void;
    addIfThenBefore(s: Frame): void;
    addPrintBefore(s: Frame): void;
    addRepeatBefore(s: Frame): void;
    addSetBefore(s: Frame): void;
    addSwitchBefore(s: Frame): void;
    addThrowBefore(s: Frame): void;
    addTryBefore(s: Frame): void;
    addVarBefore(s: Frame): void;
    addWhileBefore(s: Frame): void;
}

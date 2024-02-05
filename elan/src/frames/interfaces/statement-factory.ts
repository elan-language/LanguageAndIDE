import { Statement } from "./statement";

export interface StatementFactory {
    addCallBefore(s: Statement): void;
    addEachBefore(s: Statement): void;
    addForBefore(s: Statement): void;
    addIfThenBefore(s: Statement): void;
    addPrintBefore(s: Statement): void;
    addRepeatBefore(s: Statement): void;
    addSetBefore(s: Statement): void;
    addSwitchBefore(s: Statement): void;
    addThrowBefore(s: Statement): void;
    addTryBefore(s: Statement): void;
    addVarBefore(s: Statement): void;
    addWhileBefore(s: Statement): void;
}

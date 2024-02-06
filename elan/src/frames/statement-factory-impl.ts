
import { Each } from "./statements/each";
import { FrameWithStatements } from "./frame-with-statements";
import { Call } from "./statements/call";
import { For } from "./statements/for";
import { IfThen } from "./statements/if-then";
import { Print } from "./statements/print";
import { Repeat } from "./statements/repeat";
import { Throw } from "./statements/throw";
import { While } from "./statements/while";
import { TryCatch } from "./statements/try-catch";
import { Variable } from "./statements/variable";
import { SetStatement } from "./statements/set-statement";
import { StatementFactory } from "./interfaces/statement-factory";
import { Frame } from "./interfaces/frame";

export class StatementFactoryImpl implements StatementFactory {

    addCallBefore(s: Frame): void {
        var newS = new Call(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addEachBefore(s: Frame): void {
        var newS = new Each(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addForBefore(s: Frame): void {
        var newS = new For(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addIfThenBefore(s: Frame): void {
        var newS = new IfThen(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addPrintBefore(s: Frame): void {
        var newS = new Print(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addRepeatBefore(s: Frame): void {
        var newS = new Repeat(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addSetBefore(s: Frame): void {
        var newS = new SetStatement(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addSwitchBefore(s: Frame): void {
        throw new Error("Method not implemented.");
    }
    addThrowBefore(s: Frame): void {
        var newS = new Throw(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addTryBefore(s: Frame): void {
        var newS = new TryCatch(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addVarBefore(s: Frame): void {
        var newS = new Variable(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addWhileBefore(s: Frame): void {
        var newS = new While(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
  
    private addStatementBeforeAndSelect(s: Frame, before: Frame) {
        (before.getParent() as FrameWithStatements).addStatementBefore(s, before);
        s.select(true, false);
    }
}
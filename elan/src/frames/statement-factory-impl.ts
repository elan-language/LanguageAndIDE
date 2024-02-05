import { Statement } from "./interfaces/statement";
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

export class StatementFactoryImpl implements StatementFactory {

    addCallBefore(s: Statement): void {
        var newS = new Call(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addEachBefore(s: Statement): void {
        var newS = new Each(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addForBefore(s: Statement): void {
        var newS = new For(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addIfThenBefore(s: Statement): void {
        var newS = new IfThen(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addPrintBefore(s: Statement): void {
        var newS = new Print(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addRepeatBefore(s: Statement): void {
        var newS = new Repeat(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addSetBefore(s: Statement): void {
        var newS = new SetStatement(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addSwitchBefore(s: Statement): void {
        throw new Error("Method not implemented.");
    }
    addThrowBefore(s: Statement): void {
        var newS = new Throw(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addTryBefore(s: Statement): void {
        var newS = new TryCatch(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addVarBefore(s: Statement): void {
        var newS = new Variable(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addWhileBefore(s: Statement): void {
        var newS = new While(s.getParentFrame());
        this.addStatementBeforeAndSelect(newS,s);
    }
  
    private addStatementBeforeAndSelect(s: Statement, before: Statement) {
        (before.getParentFrame() as FrameWithStatements).addStatementBefore(s, before);
        s.select(true, false);
    }
}
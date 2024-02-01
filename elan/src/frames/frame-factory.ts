import { Statement } from "./statements/statement";
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

export interface FrameFactory {
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

export class FrameFactoryImpl implements FrameFactory {

    addCallBefore(s: Statement): void {
        var newS = new Call(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addEachBefore(s: Statement): void {
        var newS = new Each(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addForBefore(s: Statement): void {
        var newS = new For(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addIfThenBefore(s: Statement): void {
        var newS = new IfThen(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addPrintBefore(s: Statement): void {
        var newS = new Print(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addRepeatBefore(s: Statement): void {
        var newS = new Repeat(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addSetBefore(s: Statement): void {
        var newS = new SetStatement(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addSwitchBefore(s: Statement): void {
        throw new Error("Method not implemented.");
    }
    addThrowBefore(s: Statement): void {
        var newS = new Throw(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addTryBefore(s: Statement): void {
        var newS = new TryCatch(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addVarBefore(s: Statement): void {
        var newS = new Variable(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addWhileBefore(s: Statement): void {
        var newS = new While(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
  
    private addStatementBeforeAndSelect(s: Statement, before: Statement) {
        (before.getParent() as FrameWithStatements).addStatementBefore(s, before);
        s.select(true, false);
    }
}
import { AbstractField } from "./abstract-field";
import { singleIndent } from "../helpers";
import { Statement } from "../interfaces/statement";
import { FrameWithStatements } from "../frame-with-statements";
import { KeyEvent } from "../interfaces/key-event";
import { StatementFactory } from "../interfaces/statement-factory";
import { ParentFrame } from "../interfaces/parent-frame";

export class SelectStatement extends AbstractField implements Statement {  
    isStatement: boolean = true;
    statementHolder: FrameWithStatements;
    factory: StatementFactory;
    
    constructor(holder: FrameWithStatements) {
        super(holder);
        this.statementHolder = holder;
        this.factory = holder.getFactory();
        this.setPrompt("call each for if print repeat set switch throw try var while #");
    }
    getParentFrame(): ParentFrame {
        throw new Error("Method not implemented.");
    }

    getPrefix(): string {
        return 'statementSelect';
    }

    renderAsHtml(): string {
        return `<statement>${super.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}`;
    }

    indent(): string {
        return this.statementHolder.indent() + singleIndent();
    }

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        var empty = this.text ==="";
        if (empty && (char ==='c')) {
            this.factory.addCallBefore(this);
            return;
        }
        if (empty && (char ==='e')) {
            this.factory.addEachBefore(this);
            return;
        } 
        if (empty && (char ==='f')) {
            this.factory.addForBefore(this);
            return;
        }
        if (empty && (char ==='i')) {
            this.factory.addIfThenBefore(this);
            return;
        }
        if (empty && (char ==='p')) {
            this.factory.addPrintBefore(this);
            return;
        }
        if (empty && (char ==='r')) {
            this.factory.addRepeatBefore(this);
            return;
        }
        if (this.text ==="s" && (char ==='e')) {
            this.factory.addSetBefore(this);
            this.text = "";
            return;
        }
        if (this.text ==="s" && (char ==='w')) {
            this.factory.addSwitchBefore(this);
            this.text = "";
            return;
        }
        if (this.text ==="t" && (char ==='h')) {
            this.factory.addThrowBefore(this);
            this.text = "";
            return;
        }
        if (this.text ==="t" && (char ==='r')) {
            this.factory.addTryBefore(this);
            this.text = "";
            return;
        }
        if (empty && (char ==='v')) {
            this.factory.addVarBefore(this);
            return;
        }
        if (empty && (char ==='w')) {
            this.factory.addWhileBefore(this);
            return;
        }
        super.processKey(keyEvent);
    }
} 

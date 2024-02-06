import { AbstractField } from "./abstract-field";
import { singleIndent } from "../helpers";
import { KeyEvent } from "../interfaces/key-event";
import { StatementFactory } from "../interfaces/statement-factory";
import { StatementSelector } from "../statements/statement-selector";
import { Frame } from "../interfaces/frame";

export class StatementSelectorField extends AbstractField  {  
    isStatement: boolean = true;
    statementSelector: StatementSelector;
    factory: StatementFactory;
    
    constructor(holder: StatementSelector) {
        super(holder);
        this.statementSelector = holder;
        this.factory = holder.getFactory();
        this._help ="call each for if print repeat set switch throw try var while #";
        this.setPrompt("new statement");
        this.setOptional(true);
    }

    private getFrame(): Frame {
        return (this.getHolder() as Frame);
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
        return this.statementSelector.indent() + singleIndent();
    }

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        var empty = this.text ==="";
        if (empty && (char ==='c')) {
            this.factory.addCallBefore(this.getFrame());
            return;
        }
        if (empty && (char ==='e')) {
            this.factory.addEachBefore(this.getFrame());
            return;
        } 
        if (empty && (char ==='f')) {
            this.factory.addForBefore(this.getFrame());
            return;
        }
        if (empty && (char ==='i')) {
            this.factory.addIfThenBefore(this.getFrame());
            return;
        }
        if (empty && (char ==='p')) {
            this.factory.addPrintBefore(this.getFrame());
            return;
        }
        if (empty && (char ==='r')) {
            this.factory.addRepeatBefore(this.getFrame());
            return;
        }
        if (this.text ==="s" && (char ==='e')) {
            this.factory.addSetBefore(this.getFrame());
            this.text = "";
            return;
        }
        if (this.text ==="s" && (char ==='w')) {
            this.factory.addSwitchBefore(this.getFrame());
            this.text = "";
            return;
        }
        if (this.text ==="t" && (char ==='h')) {
            this.factory.addThrowBefore(this.getFrame());
            this.text = "";
            return;
        }
        if (this.text ==="t" && (char ==='r')) {
            this.factory.addTryBefore(this.getFrame());
            this.text = "";
            return;
        }
        if (empty && (char ==='v')) {
            this.factory.addVarBefore(this.getFrame());
            return;
        }
        if (empty && (char ==='w')) {
            this.factory.addWhileBefore(this.getFrame());
            return;
        }
        super.processKey(keyEvent);
    }
} 

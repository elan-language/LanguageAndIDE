import { Field } from "./field";
import { singleIndent } from "../helpers";
import { TextFieldHolder } from "../TextFieldHolder";
import { Statement } from "../statements/statement";
import { StatementFactory } from "../statement-factory";
import { FrameWithStatements } from "../frame-with-statements";

export class SelectStatementField extends Field implements Statement {  
    isStatement: boolean = true;
    holder: FrameWithStatements;
    factory: StatementFactory;
    
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.holder = holder as FrameWithStatements;
        this.factory = this.holder.getFactory();
        this.setPrompt("call each for if print repeat set switch throw try var while #");
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
        return this.holder.indent() + singleIndent();
    }

    enterText(char: string): void {
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
        super.enterText(char);
    }
} 

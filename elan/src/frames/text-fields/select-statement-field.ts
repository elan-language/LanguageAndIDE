import { Text } from "./text";
import { singleIndent } from "../helpers";
import { TextFieldHolder } from "../TextFieldHolder";
import { FrameFactory } from "../frame-factory";
import { Statement } from "../statements/statement";

export class SelectStatementField extends Text {  
    statement: Statement;
    
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.statement = holder as Statement;
        this.setPrompt("call each for if print repeat set switch throw try var while");
    }

    getPrefix(): string {
        return 'statementSelect';
    }

    renderAsHtml(): string {
        return `<statement>${super.renderAsHtml()}</statement>`;
    }

    indent(): string {
        return this.getParent()?.indent() + singleIndent();
    }

    renderAsSource(): string {
        return `${this.indent()}`;
    }

    enterText(char: string): void {
        var empty = this.text ==="";
        if (empty && (char ==='c')) {
            this.getFactory().addCallBefore(this.statement);
            return;
        }
        if (empty && (char ==='e')) {
            this.getFactory().addEachBefore(this.statement);
            return;
        } 
        if (empty && (char ==='f')) {
            this.getFactory().addForBefore(this.statement);
            return;
        }
        if (empty && (char ==='i')) {
            this.getFactory().addIfThenBefore(this.statement);
            return;
        }
        if (empty && (char ==='p')) {
            this.getFactory().addPrintBefore(this.statement);
            return;
        }
        if (empty && (char ==='r')) {
            this.getFactory().addRepeatBefore(this.statement);
            return;
        }
        if (this.text ==="s" && (char ==='e')) {
            this.getFactory().addSetBefore(this.statement);
            this.text = "";
            return;
        }
        if (this.text ==="s" && (char ==='w')) {
            this.getFactory().addSwitchBefore(this.statement);
            this.text = "";
            return;
        }
        if (this.text ==="t" && (char ==='h')) {
            this.getFactory().addThrowBefore(this.statement);
            this.text = "";
            return;
        }
        if (this.text ==="t" && (char ==='r')) {
            this.getFactory().addTryBefore(this.statement);
            this.text = "";
            return;
        }
        if (empty && (char ==='v')) {
            this.getFactory().addVarBefore(this.statement);
            return;
        }
        if (empty && (char ==='w')) {
            this.getFactory().addWhileBefore(this.statement);
            return;
        }
        super.enterText(char);
    }
} 

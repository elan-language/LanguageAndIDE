import { Statement } from "../statements/statement";
import { Frame } from "../frame";
import { Text } from "./text";
import { singleIndent } from "../helpers";
import {FrameWithStatements} from "../frame-with-statements";
import { Call } from "../statements/call";
import { Each } from "../statements/each";
import { For } from "../statements/for";
import { IfThen } from "../statements/if-then";
import { Print } from "../statements/print";
import { Repeat } from "../statements/repeat";
import { SetStatement } from "../statements/set-statement";
import { Throw } from "../statements/throw";
import { TryCatch } from "../statements/try-catch";
import { Variable } from "../statements/variable";
import { While } from "../statements/while";

export class SelectStatement extends Text implements Statement {  
    isStatement = true;

    constructor(parent: Frame) {
        super(parent);
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

    private addBeforeAndSelect(statement: Statement) {
        (this.parent as FrameWithStatements).addStatementBefore(statement, this);
        this.deselectAll(); //TODO should happen automatically
        statement.select(true, false);
    }

    //call each for if print repeat set switch throw try var while
    enterText(char: string): void {
        var empty = this.text ==="";
        if (empty && (char ==='c')) {
            var c = new Call(this.parent);
            this.addBeforeAndSelect(c);
            return;
        }
       /* if (empty && (char ==='e')) {
            var e = new Each(this.parent);
            this.addBeforeAndSelect(e);
            return;
        } 
        if (empty && (char ==='f')) {
            var f = new For(this.parent);
            this.addBeforeAndSelect(f);
            return;
        }
        if (empty && (char ==='i')) {
            var i = new IfThen(this.parent);
            this.addBeforeAndSelect(i);
            return;
        }*/
        if (empty && (char ==='p')) {
            var p = new Print(this.parent);
            this.addBeforeAndSelect(p);
            return;
        }
       /* if (empty && (char ==='r')) {
            var r = new Repeat(this.parent);
            this.addBeforeAndSelect(r);
            return;
        }*/
        if (this.text ==="s" && (char ==='e')) {
            var se = new SetStatement(this.parent);
            this.text = "";
            this.addBeforeAndSelect(se);
            return;
        }
        if (this.text ==="s" && (char ==='w')) {
            throw new Error("Not implemented");
        }
        if (this.text ==="t" && (char ==='h')) {
            var th = new Throw(this.parent);
            this.text = "";
            this.addBeforeAndSelect(th);
            return;
        }
        /*if (this.text ==="t" && (char ==='r')) {
            var tr = new TryCatch(this.parent);
            this.text = "";
            this.addBeforeAndSelect(tr);
            return;
        }*/
        if (empty && (char ==='v')) {
            var m = new Variable(this.parent);
            this.addBeforeAndSelect(m);
            return;
        }
        /*if (empty && (char ==='w')) {
            var w = new While(this.parent);
            this.addBeforeAndSelect(w);
            return;
        }*/
        super.enterText(char);
    }
} 

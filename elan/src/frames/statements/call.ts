import { Identifier } from "../fields/identifier";
import { ArgList } from "../fields/arg-list";
import { Parent } from "../interfaces/parent";
import { AbstractFrame } from "../abstract-frame";

import { Field } from "../interfaces/field";

export class Call extends AbstractFrame {

    isStatement = true;
    proc: Identifier;
    args: ArgList;

    constructor(parent: Parent) {
        super(parent);
        this.proc = new Identifier(this);
        this.proc.setPrompt("procedureName");
        this.args = new ArgList(this);
    }

    getFields(): Field[] {
        return [this.proc, this.args];
    }

    public override selectFirstField(): boolean {
        this.proc.select();
        return true;
    }

    getPrefix(): string {
        return 'call';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword>call </keyword>${this.proc.renderAsHtml()}(${this.args.renderAsHtml()})</top></statement>`;
    }
   
    renderAsSource(): string {
        return `${this.indent()}call ${this.proc.renderAsSource()}(${this.args.renderAsSource()})`;
    }
} 

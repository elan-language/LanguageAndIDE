import { Identifier } from "../fields/identifier";
import { ArgList } from "../fields/arg-list";
import { Parent } from "../interfaces/parent";
import { AbstractFrame } from "../abstract-frame";

import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ProcedureRef } from "../fields/procedureRef";

export class Call extends AbstractFrame {

    isStatement = true;
    proc: ProcedureRef;
    args: ArgList;

    constructor(parent: Parent) {
        super(parent);
        this.proc = new ProcedureRef(this);
        this.proc.setPlaceholder("procedureName");
        this.args = new ArgList(this);
    }
    
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("call ");
        this.proc.parseFrom(source);
        source.remove("(");
        this.args.parseFrom(source);
        source.remove(")");
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.proc, this.args];
    }

    public override selectFirstFieldOrSuitableFrameIfNone(): boolean {
        this.proc.select();
        return true;
    }

    getIdPrefix(): string {
        return 'call';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword>call </keyword>${this.proc.renderAsHtml()}(${this.args.renderAsHtml()})</top></statement>`;
    }
   
    renderAsSource(): string {
        return `${this.indent()}call ${this.proc.renderAsSource()}(${this.args.renderAsSource()})`;
    }
} 

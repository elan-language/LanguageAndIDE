import { ArgListField } from "../fields/arg-list-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ProcedureRef } from "../fields/procedureRef";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";

export class Call extends AbstractFrame implements Statement{
    isStatement = true;
    proc: ProcedureRef;
    args: ArgListField;

    constructor(parent: Parent) {
        super(parent);
        this.proc = new ProcedureRef(this);
        this.proc.setPlaceholder("procedureName");
        this.args = new ArgListField(this);
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

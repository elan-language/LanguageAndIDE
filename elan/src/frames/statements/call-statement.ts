import { ArgListField } from "../fields/arg-list-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ProcRefField } from "../fields/proc-ref-field";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";

export class CallStatement extends AbstractFrame implements Statement{
    isStatement = true;
    proc: ProcRefField;
    args: ArgListField;

    constructor(parent: Parent) {
        super(parent);
        this.proc = new ProcRefField(this);
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

    compile(): string {
        return `${this.indent()}${this.proc.compile()}(${this.args.compile()});`;
    }
} 

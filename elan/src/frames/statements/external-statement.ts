import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import {CodeSource } from "../code-source";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { externalKeyword, intoKeyword } from "../keywords";
import { ArgListField } from "../fields/arg-list-field";
import { ProcedureRef } from "../fields/procedureRef";
import { IntoSelector } from "../fields/into-selector";
import { AssignableField } from "../fields/assignableField";

export class ExternalStatement extends AbstractFrame implements Statement{
    isStatement = true;
    method: ProcedureRef;
    args: ArgListField;
    selectIntoClause: IntoSelector;
    hasInto: boolean = false;
    assignable: AssignableField;

    constructor(parent: Parent) {
        super(parent);
        this.method = new ProcedureRef(this);
        this.method.setPlaceholder("method");
        this.args = new ArgListField(this);
        this.selectIntoClause = new IntoSelector(this);
        this.assignable = new AssignableField(this);
        this.assignable.setPlaceholder("variableName");
    }

    setIntoExtension(to: boolean) {
        this.hasInto = to;
    }

     parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove(`${externalKeyword} `);
        this.method.parseFrom(source);
        source.remove(`(`);
        this.args.parseFrom(source);
        source.remove(`)`);
        var into = ` ${intoKeyword} `;
        if (source.isMatch(into)) {
            this.hasInto = true;
            source.remove(into);
            this.assignable.parseFrom(source);
        }
        source.removeNewLine();
    }
    getFields(): Field[] {
        var fields = [];
        fields.push(this.method);
        fields.push(this.args);
        fields.push(this.hasInto ? this.assignable : this.selectIntoClause);
        return fields;
    } 

    getIdPrefix(): string {
        return 'ext';
    }

    private intoClauseAsHtml() : string {
        return this.hasInto ? ` <keyword>${intoKeyword} </keyword>${this.assignable.renderAsHtml()}`: ` ${this.selectIntoClause.renderAsHtml()}`;
    }

    private intoClauseAsSource() : string {
        return this.hasInto ? ` ${intoKeyword} ${this.assignable.renderAsSource()}`:``;
    }

    private intoClauseAsObjectCode() : string {
        throw new Error("Not implemented");
    }
   
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword>external </keyword>${this.method.renderAsHtml()}(${this.args.renderAsHtml()})${this.intoClauseAsHtml()}</top></statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}external ${this.method.renderAsSource()}(${this.args.renderAsSource()})${this.intoClauseAsSource()}`;
    }
    renderAsObjectCode(): string {
        throw new Error("Not implemented");
    }
} 

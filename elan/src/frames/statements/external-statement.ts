import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import {CodeSource } from "../code-source";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { externalKeyword, intoKeyword } from "../keywords";
import { ArgListField } from "../fields/arg-list-field";
import { ProcedureRef } from "../fields/procedureRef";
import { AssignableField } from "../fields/assignableField";
import { OptionalKeyword } from "../fields/optionalKeyword";

export class ExternalStatement extends AbstractFrame implements Statement{
    isStatement = true;
    method: ProcedureRef;
    args: ArgListField;
    into: OptionalKeyword;
    assignable: AssignableField;

    constructor(parent: Parent) {
        super(parent);
        this.method = new ProcedureRef(this);
        this.args = new ArgListField(this);
        this.into = new OptionalKeyword(this, intoKeyword);
        this.assignable = new AssignableField(this);
        this.assignable.setPlaceholder("variableName");
    }

     parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove(`${externalKeyword} `);
        this.method.parseFrom(source);
        source.remove(`(`);
        this.args.parseFrom(source);
        source.remove(`)`);
        this.into.parseFrom(source);
        if (this.into.keywordExists()) {
            this.assignable.parseFrom(source);
        }
        source.removeNewLine();
    }
    getFields(): Field[] {
        var fields = [];
        fields.push(this.method);
        fields.push(this.args);
        fields.push(this.hasInto() ? this.assignable : this.into);
        return fields;
    } 

    private hasInto(): boolean {
        return this.into.keywordExists();
    }

    getIdPrefix(): string {
        return 'ext';
    }

    private intoClauseAsHtml() : string {
        return this.hasInto() ? ` ${this.into.textAsHtml()} ${this.assignable.renderAsHtml()}`: ` ${this.into.textAsHtml()}`;
    }

    private intoClauseAsSource() : string {
        return this.hasInto() ? ` ${this.into.renderAsSource()} ${this.assignable.renderAsSource()}`:``;
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

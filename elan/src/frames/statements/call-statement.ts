import { ArgListField } from "../fields/arg-list-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ProcRefField } from "../fields/proc-ref-field";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { ProcedureType } from "../../symbols/procedure-type";
import { mustMatchParameters } from "../compile-rules";
import { CsvAsn } from "../syntax-nodes/csv-asn";
import { callKeyword } from "../keywords";
import { VarAsn } from "../syntax-nodes/var-asn";
import { ClassType } from "../../symbols/class-type";
import { Scope } from "../interfaces/scope";
import { SymbolScope } from "../../symbols/symbol";

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

    initialKeywords(): string {
        return callKeyword;
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
        this.compileErrors = [];

        var currentScope : Scope = this;
        var scopeQ = "";

        const varAsn = this.proc.getOrTransformAstNode as VarAsn;

        const qualifier = varAsn.qualifier;
        const id = varAsn.id;

        const classScope = qualifier ? qualifier.symbolType : undefined;
        if (classScope instanceof ClassType) {
            const s = this.resolveSymbol(classScope.className, this);
            // replace scope with class scope
            currentScope = s as unknown as Scope;
        }

        const procSymbol = currentScope.resolveSymbol(this.proc.text, this);

        if (procSymbol?.symbolScope === SymbolScope.stdlib) {
            scopeQ = `_stdlib.`;
        }
        if (procSymbol?.symbolScope === SymbolScope.property) {
            scopeQ = `this.`;
        }

        if (procSymbol?.symbolType instanceof ProcedureType) {
            const argList = this.args.getOrTransformAstNode as CsvAsn;
            const params = argList.items;
            mustMatchParameters(params, procSymbol.symbolType.parametersTypes, this.compileErrors, this.htmlId);
        }

        const q = qualifier ? `${qualifier.compile()}.` : scopeQ;
        
        return `${this.indent()}${q}${id}(${this.args.compile()});`;
    }
} 

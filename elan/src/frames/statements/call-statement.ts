import { ArgListField } from "../fields/arg-list-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ProcRefField } from "../fields/proc-ref-field";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { ProcedureType } from "../../symbols/procedure-type";
import { mustBeKnownSymbol, mustMatchParameters } from "../compile-rules";
import { callKeyword, globalKeyword, libraryKeyword } from "../keywords";
import { ClassType } from "../../symbols/class-type";
import { Scope } from "../interfaces/scope";
import { SymbolScope } from "../../symbols/symbol";
import { Frame } from "../interfaces/frame";
import { FileImpl } from "../file-impl";
import { FixedIdAsn } from "../syntax-nodes/fixed-id-asn";
import { VarAsn } from "../syntax-nodes/var-asn";
import { CsvAsn } from "../syntax-nodes/csv-asn";
import { QualifierAsn } from "../syntax-nodes/qualifier-asn";
import { scopePrefix, updateScopeAndQualifier } from "../syntax-nodes/ast-helpers";

export class CallStatement extends AbstractFrame implements Statement {
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
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword>call </keyword>${this.proc.renderAsHtml()}(${this.args.renderAsHtml()})</top>${this.compileMsgAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}call ${this.proc.renderAsSource()}(${this.args.renderAsSource()})`;
    }

    getGlobalScope(start: Frame | Parent): Scope {
        if (start instanceof FileImpl) {
            return start;
        }
        return this.getGlobalScope(start.getParent());
    }

    compile(): string {
        this.compileErrors = [];

        const varAsn = this.proc.getOrTransformAstNode as VarAsn;
        const id = varAsn.id;

        var [qualifier, currentScope] = updateScopeAndQualifier(varAsn.qualifier as QualifierAsn | undefined, this);

        const procSymbol = currentScope.resolveSymbol(id, this);

        mustBeKnownSymbol(procSymbol!, this.compileErrors, this.htmlId);

        if (procSymbol?.symbolType instanceof ProcedureType) {
            const argList = this.args.getOrTransformAstNode as CsvAsn;
            const params = argList.items;
            mustMatchParameters(params!, procSymbol.symbolType.parametersTypes, this.compileErrors, this.htmlId);
        }

        const q = qualifier ? `${qualifier.compile()}` : scopePrefix(procSymbol?.symbolScope);

        return `${this.indent()}${q}${id}(${this.args.compile()});`;
    }
} 

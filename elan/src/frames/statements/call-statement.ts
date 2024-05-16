import { ArgListField } from "../fields/arg-list-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ProcRefField } from "../fields/proc-ref-field";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { ProcedureType } from "../symbols/procedure-type";
import { mustBeProcedure, mustBeKnownSymbol, mustMatchParameters } from "../compile-rules";
import { callKeyword } from "../keywords";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { Transforms } from "../syntax-nodes/transforms";
import { scopePrefix, updateScopeAndQualifier } from "../symbols/symbol-helpers";
import { AstQualifiedNode } from "../interfaces/ast-qualified-node";

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

    compile(transforms: Transforms): string {
        this.compileErrors = [];

        const astNode = this.proc.getOrTransformAstNode(transforms) as AstQualifiedNode;
        const id = astNode.id;

        var [qualifier, currentScope] = updateScopeAndQualifier(astNode.qualifier, transforms, this);

        const procSymbol = currentScope.resolveSymbol(id, transforms, this);

        mustBeKnownSymbol(procSymbol, this.compileErrors, this.htmlId);
        mustBeProcedure(procSymbol.symbolType(transforms), this.compileErrors, this.htmlId);

        const ps = procSymbol.symbolType(transforms);

        if (ps instanceof ProcedureType) {
            const argList = this.args.getOrTransformAstNode(transforms) as AstCollectionNode;
            const params = argList.items;
            mustMatchParameters(params!, ps.parametersTypes, this.compileErrors, this.htmlId);
        }

        const q = qualifier ? `${qualifier.compile()}` : scopePrefix(procSymbol.symbolScope);

        return `${this.indent()}${q}${id}(${this.args.compile(transforms)});`;
    }
} 

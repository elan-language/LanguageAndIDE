import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { Class } from "../globals/class";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { abstractPropertyKeywords, propertyKeyword } from "../keywords";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";

export class AbstractProperty extends AbstractFrame implements Member, ISymbol {
    isAbstract = true;
    isMember = true;
    name: IdentifierField;
    type: TypeField;
    public private: boolean = false;
    private class: Class;

    constructor(parent: Class) {
        super(parent);
        this.class = parent as Class;
        this.name = new IdentifierField(this);
        this.type = new TypeField(this);
    }
    initialKeywords(): string {
        return abstractPropertyKeywords;
    }
    getFields(): Field[] {
        return [this.name, this.type];
    }

    getIdPrefix(): string {
        return 'prop';
    }
    renderAsHtml(): string {
        return `<property class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>abstract property </keyword>${this.name.renderAsHtml()} ${this.type.renderAsHtml()}${this.compileMsgAsHtml()}</property>`;
    }

    renderAsSource(): string {
        return `${this.indent()}abstract property ${this.name.renderAsSource()} as ${this.type.renderAsSource()}\r\n`;
    }

    compile(transforms: Transforms): string {
        this.compileErrors = [];
        const pName = this.name.compile(transforms);

       
            return `${this.indent()}get ${pName}() {\r
${this.indent()}${this.indent()}return ${this.type.compile(transforms)};\r
${this.indent()}}\r
${this.indent()}set ${pName}(${pName}) {\r
${this.indent()}}\r\n`;
        
    }

    parseFrom(source: CodeSource): void {
        source.remove("abstract property ");
        this.name.parseFrom(source);
        source.remove(" as ");
        this.type.parseFrom(source);
    }

    public initCode() {
        return `["${this.name.renderAsSource()}", "${this.type.renderAsSource()}"]`;
    }

    get symbolId() {
        return this.name.renderAsSource();
    }

    symbolType() {
        return this.type.symbolType(transforms());
    }

    get symbolScope(): SymbolScope {
        return SymbolScope.property;
    }
} 

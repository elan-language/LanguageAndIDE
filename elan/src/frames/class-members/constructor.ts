import { FrameWithStatements } from "../frame-with-statements";
import { ParamList } from "../fields/param-list";
import { Member } from "../interfaces/member";
import { Class } from "../globals/class";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { AbstractSelector } from "../abstract-selector";
import { Collapsible } from "../interfaces/collapsible";
import { ISymbol } from "../../symbols/symbol";
import { Frame } from "../interfaces/frame";

export class Constructor extends FrameWithStatements implements Member {
    isConstructor = true;
    isMember = true;
    public params: ParamList ;
    private class: Class;

    constructor(parent: Class) {
        super(parent);
        this.class = parent as Class;
        this.movable = false;
        this.params = new ParamList(this);
    }

    deleteIfPermissible(): void {}; //Does nothing as constructor cannot be deleted

    getFields(): Field[] {
        return [this.params];
    }

    getIdPrefix(): string {
        return 'constructor';
    }
    public renderAsHtml(): string {
        return `<constructor class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>constructor</keyword>(${this.params.renderAsHtml()})</top>
${this.renderChildrenAsHtml()}
<keyword>end constructor</keyword>
</constructor>`;
    }
    public renderAsSource(): string {
        return `${this.indent()}constructor(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end constructor\r
`;
    }

    public compile(): string {
        return `${this.indent()}constructor(${this.params.compile()}) {\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}}\r
`;
    }
    
    parseTop(source: CodeSource): void {
        source.removeIndent();
        source.remove("constructor(");
        this.params.parseFrom(source);
        source.remove(")");
    }
    parseBottom(source: CodeSource): boolean {
        return this.parseStandardEnding(source, "end constructor");
    }
    canInsertBefore(): boolean {
        return false;
    }

    resolveSymbol(id: string, initialScope : Frame): ISymbol {
        return this.params.resolveSymbol(id, this) ?? this.getParent().resolveSymbol(id, this);
    }
}
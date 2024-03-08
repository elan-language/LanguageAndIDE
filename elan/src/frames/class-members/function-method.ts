import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { Class } from "../globals/class";
import { Function } from "../globals/function";
import { singleIndent } from "../helpers";
import { Member } from "../interfaces/member";

export class FunctionMethod extends Function implements Member {
    isGlobal: boolean = false;
    isMember: boolean = true;
    private class: Class;

    constructor(parent: Class) {
        super(parent);
        this.class = parent as Class;
    }  
    public override indent(): string {
        return singleIndent();
    }
    public override renderAsSource() : string {
        return `${this.indent()}function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) as ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end function\r
`;
    }
    parseTop(source: CodeSource): void {
        source.removeIndent();
        super.parseTop(source);
    }
    parseBottom(source: CodeSource): boolean {
        return super.parseBottom(source);
    }
    insertSelector(after: boolean): void {
        this.class.insertMemberSelector(after, this);
    }
}
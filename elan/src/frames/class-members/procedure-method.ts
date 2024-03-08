import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { Class } from "../globals/class";
import { Procedure } from "../globals/procedure";
import { singleIndent } from "../helpers";
import { Member } from "../interfaces/member";

export class ProcedureMethod extends Procedure implements Member {
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
        return `${this.indent()}procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end procedure\r
`;
    }
    parseTop(source: CodeSource): void {
        source.removeIndent();
        return super.parseTop(source);
    }
    parseBottom(source: CodeSource): boolean {
        return super.parseBottom(source);
    }
    insertPeerSelector(after: boolean): void {
        this.class.insertMemberSelector(after, this);
    }
}
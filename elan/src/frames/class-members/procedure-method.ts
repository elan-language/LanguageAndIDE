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
${this.renderStatementsAsSource()}\r
${this.indent()}end procedure\r
`;
    }
    parseTopOfFrame(source: CodeSource): void {
        source.removeIndent();
        return super.parseTopOfFrame(source);
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        return super.parseBottomOfFrame(source);
    }
    getSelectorToInsertAboveBelow(): AbstractSelector {
        return this.class.newMemberSelector();
    }
}
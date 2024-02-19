import { CodeSource } from "../code-source";
import { Class } from "../globals/class";
import { Procedure } from "../globals/procedure";
import { singleIndent } from "../helpers";
import { Member } from "../interfaces/member";

export class ProcedureMethod extends Procedure implements Member {
    isGlobal: boolean = false;
    isMember: boolean = true;

    constructor(parent: Class) {
        super(parent);
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
        source.removeIndent();
        return super.parseBottomOfFrame(source);
    }
}
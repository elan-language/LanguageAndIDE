import { Procedure } from "../globals/procedure";
import { singleIndent } from "../helpers";
import { Member } from "./member";

export class ProcedureMethod extends Procedure implements Member {
    isMember: boolean = true;

    public override indent(): string {
        return singleIndent();
    }

    public override renderAsSource() : string {
        return `${this.indent()}procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderStatementsAsSource()}\r
${this.indent()}end procedure\r
`;
    }
}
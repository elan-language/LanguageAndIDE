import { Function } from "../globals/function";
import { singleIndent } from "../helpers";
import { Member } from "./member";

export class FunctionMethod extends Function implements Member {
    isMember: boolean = true;
    
    public override indent(): string {
        return singleIndent();
    }

    public override renderAsSource() : string {
        return `${this.indent()}function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) as ${this.returnType.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
${this.indent()}end function\r
`;
    }
}
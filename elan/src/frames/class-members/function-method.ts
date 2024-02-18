import { CodeSource } from "../code-source";
import { Class } from "../globals/class";
import { Function } from "../globals/function";
import { singleIndent } from "../helpers";
import { Member } from "../interfaces/member";

export class FunctionMethod extends Function implements Member {
    isMember: boolean = true;

    constructor(parent: Class) {
        super(parent);
    }  
    public override indent(): string {
        return singleIndent();
    }
    public override renderAsSource() : string {
        return `${this.indent()}function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) as ${this.returnType.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
${this.indent()}end function\r
`;
    }
    parseTopOfFrame(source: CodeSource): void {
        throw new Error("Method not implemented.");
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        throw new Error("Method not implemented.");
    }
}
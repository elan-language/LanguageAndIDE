import { Function } from "../globals/function";
import { singleIndent } from "../helpers";

export class FunctionMethod extends Function {

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
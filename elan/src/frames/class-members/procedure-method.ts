import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { CodeSource } from "../code-source";
import { Class } from "../globals/class";
import { ProcedureFrame } from "../globals/procedure-frame";
import { singleIndent } from "../helpers";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";

export class ProcedureMethod extends ProcedureFrame implements Member {
    isMember: boolean = true;
    private class: Class;

    constructor(parent: Class) {
        super(parent);
        this.class = parent as Class;
    }

    public override indent(): string {
        return singleIndent();
    }
    public override renderAsSource(): string {
        return `${this.indent()}procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end procedure\r
`;
    }
    public override compile(): string {
        this.compileErrors = [];
        return `${this.indent()}${this.name.compile()}(${this.params.compile()}) {\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}}\r
`;
    }
    parseTop(source: CodeSource): void {
        source.removeIndent();
        return super.parseTop(source);
    }
    parseBottom(source: CodeSource): boolean {
        return super.parseBottom(source);
    }

    resolveSymbol(id: string | undefined, initialScope: Frame): ISymbol {
        if (this.name.text === id) {
            return this as ISymbol;
        }

        return super.resolveSymbol(id, initialScope);
    }

    get symbolId() {
        return this.name.renderAsSource();
    }

    symbolScope = SymbolScope.property;
}
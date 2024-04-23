import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { end } from "../../test/testHelpers";
import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { Class } from "../globals/class";
import { FunctionFrame } from "../globals/function-frame";
import { singleIndent } from "../helpers";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { endKeyword, functionKeyword,  returnKeyword } from "../keywords";

export class FunctionMethod extends FunctionFrame implements Member {
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
        return `${this.indent()}${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${ returnKeyword} ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${functionKeyword}\r
`;
    }
    public override compile() : string {
        return `${this.indent()}${this.name.compile()}(${this.params.compile()}) {\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}}\r
`;
    }
    parseTop(source: CodeSource): void {
        source.removeIndent();
        super.parseTop(source);
    }
    parseBottom(source: CodeSource): boolean {
        return super.parseBottom(source);
    }

    resolveSymbol(id: string, initialScope : Frame): ISymbol {
        if (this.name.text === id){
            return {
                symbolId : id,
                symbolType : this.returnType.symbolType,
                symbolScope : SymbolScope.member
            } as ISymbol;
        }

        return super.resolveSymbol(id, initialScope);
    }

    get symbolId() {
        return this.name.renderAsSource();
    }

    get symbolType() {
        return this.returnType.symbolType;
    }

    get symbolScope(): SymbolScope {
        return SymbolScope.property;
    }
}
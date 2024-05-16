import { ISymbol } from "../../symbols/symbol";
import { SymbolScope } from "../../symbols/symbol-scope";
import { CodeSource } from "../code-source";
import { Class } from "../globals/class";
import { FunctionFrame } from "../globals/function-frame";
import { singleIndent } from "../helpers";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { endKeyword, functionKeyword, returnKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class FunctionMethod extends FunctionFrame implements Member {
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
        return `${this.indent()}${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${returnKeyword} ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${functionKeyword}\r
`;
    }
    public override compile(transforms : Transforms): string {
        this.compileErrors = [];
        return `${this.indent()}${this.name.compile(transforms)}(${this.params.compile(transforms)}) {\r
${this.compileStatements(transforms)}\r
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

    resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ISymbol {
        if (this.name.text === id) {
            return this as ISymbol;
        }

        return super.resolveSymbol(id, transforms, initialScope);
    }

    symbolScope = SymbolScope.property;
}
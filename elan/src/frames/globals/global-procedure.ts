import { Parent } from "../interfaces/parent";
import { ProcedureFrame } from "./procedure-frame";
import {GlobalFrame as GlobalFrame} from "../interfaces/global-frame";
import { SymbolScope } from "../../symbols/symbol";

export class GlobalProcedure extends ProcedureFrame implements GlobalFrame {
    isGlobal = true;

    constructor(parent: Parent) {
        super(parent);
    } 

    indent(): string {
        return "";
    }

    public renderAsSource(): string {
        return `procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
end procedure\r
`;
    }

    public compile(): string {
        this.compileErrors = [];
        return `function ${this.name.compile()}(${this.params.compile()}) {\r
${this.renderStatementsAsObjectCode()}\r
}\r
`;
    }
    
    symbolScope = SymbolScope.program;
}
import { Parent } from "../interfaces/parent";
import { ProcedureFrame } from "./procedure-frame";
import {GlobalFrame as GlobalFrame} from "../interfaces/global-frame";
import { SymbolScope } from "../../symbols/symbol";
import { Transforms } from "../syntax-nodes/transforms";

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

    public compile(transforms : Transforms): string {
        this.compileErrors = [];
        return `function ${this.name.compile(transforms)}(${this.params.compile(transforms)}) {\r
${this.compileStatements(transforms)}\r
}\r
`;
    }
    
    symbolScope = SymbolScope.program;
}
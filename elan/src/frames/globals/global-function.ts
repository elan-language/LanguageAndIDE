
import { Parent } from "../interfaces/parent";
import {GlobalFrame } from "../interfaces/global-frame";
import { FunctionFrame } from "./function-frame";
import { functionKeyword, returnKeyword, endKeyword } from "../keywords";
import { mustNotBeArray, mustBeCompatibleType } from "../compile-rules";
import { CsvAsn } from "../syntax-nodes/csv-asn";
import { ISymbol } from "../../symbols/symbol";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { Frame } from "../interfaces/frame";

export class GlobalFunction extends FunctionFrame implements GlobalFrame {
    isGlobal = true;

    constructor(parent: Parent) {
        super(parent);
    } 

    indent(): string {
        return "";
    }

    public renderAsSource(): string {
        return `${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${returnKeyword} ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${endKeyword} ${functionKeyword}\r
`;
    }

    public compile(): string {
        this.compileErrors = [];
        const paramList = this.params.getOrTransformAstNode as CsvAsn;
        const parameters = paramList.items.map(i => i.symbolType);

        for (const p of parameters) {
            mustNotBeArray(p, this.compileErrors, this.htmlId);
        }

        const returnStatement = this.getReturnStatement().expr.getOrTransformAstNode;
        const tt = returnStatement?.symbolType;
        mustBeCompatibleType(this.returnType?.symbolType, tt!, this.compileErrors, returnStatement!.fieldId);

        return `function ${this.name.compile()}(${this.params.compile()}) {\r
${this.renderChildrenAsObjectCode()}\r
}\r
`;
    }

}
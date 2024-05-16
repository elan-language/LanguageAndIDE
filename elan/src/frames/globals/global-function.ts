import { Parent } from "../interfaces/parent";
import {GlobalFrame } from "../interfaces/global-frame";
import { FunctionFrame } from "./function-frame";
import { functionKeyword, returnKeyword, endKeyword } from "../keywords";
import { mustNotBeArray, mustBeCompatibleType } from "../compile-rules";
import { Transforms } from "../syntax-nodes/transforms";
import { AstCollectionNode } from "../interfaces/ast-collection-node";

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

    public compile(transforms : Transforms): string {
        this.compileErrors = [];
        const paramList = this.params.getOrTransformAstNode(transforms) as AstCollectionNode;
        const parameters = paramList.items.map(i => i.symbolType());

        for (const p of parameters) {
            mustNotBeArray(p, this.compileErrors, this.htmlId);
        }

        const returnStatement = this.getReturnStatement().expr.getOrTransformAstNode(transforms);
        const tt = returnStatement?.symbolType();
        mustBeCompatibleType(this.returnType?.symbolType(transforms), tt!, this.compileErrors, returnStatement!.fieldId);

        return `function ${this.name.compile(transforms)}(${this.params.compile(transforms)}) {\r
${this.compileChildren(transforms)}\r
}\r
`;
    }

}
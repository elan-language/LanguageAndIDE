import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";

import { CSV } from "../parse-nodes/csv";
import { ParamDefNode } from "../parse-nodes/param-def-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { transform, transformMany } from "../syntax-nodes/ast-visitor";
import { CsvAsn } from "../syntax-nodes/csv-asn";
import { ParamDefAsn } from "../syntax-nodes/param-def-asn";
import { AbstractField } from "./abstract-field";

export class ParamList extends AbstractField {
    isParseByNodes = true;
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("parameter definitions");
        this.useHtmlTags = true;
        this.setOptional(true);
    }

    getIdPrefix(): string {
        return 'params';
    }
    public contentAsSource() : string {
        if (this.text) {
         return this.text;
        } else {
            return "";
        }
    }    
    initialiseRoot(): ParseNode {
        this.astNode = undefined; 
        this.rootNode = new CSV(() => new ParamDefNode(), 0);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) =
        (source: CodeSource) => source.readToNonMatchingCloseBracket();


    resolveSymbol(id: string, initialScope: Frame): ISymbol | undefined {

        const ast = this.getOrTransformAstNode as CsvAsn;

        if (ast) {
            for (const n of ast.items as ParamDefAsn[]) {
                if (n.id === id) {
                    return {
                        symbolId: id,
                        symbolType: n.symbolType,
                        symbolScope: SymbolScope.parameter
                    };
                }
            }
        }

        return undefined;
    }
}
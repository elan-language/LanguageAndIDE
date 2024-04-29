import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { ISymbolType } from "../../symbols/symbol-type";
import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { CSV } from "../parse-nodes/csv";
import { ParamDefNode } from "../parse-nodes/param-def-node";
import { ParseNode } from "../parse-nodes/parse-node";
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
        this.help = `Zero or more parameter definitions comma-separated. Each parameter definition consists of a parameter name followed by the 'as' keyword and a Type. A parameter name follows the same rules as for a variable name - starting with a lower-case letter.`;
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

    get symbolTypes() : ISymbolType[] {
        const ast = this.getOrTransformAstNode as CsvAsn;
        return ast ? ast.items.map(i => i.symbolType!) : [];
    }

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
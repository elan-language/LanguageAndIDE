import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { defaultKeyword } from "../keywords";
import { Alternatives } from "../parse-nodes/alternatives";
import { ExprNode } from "../parse-nodes/expr-node";
import { KeywordNode } from "../parse-nodes/keyword-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { transform } from "../syntax-nodes/ast-visitor";
import { AbstractField } from "./abstract-field";

export class ReturnExprField extends AbstractField {
    isParseByNodes = true;

    constructor(holder: Frame) {
        super(holder);
    }

    getIdPrefix(): string {
        return 'expr';
    }
    initialiseRoot(): ParseNode {
        var expr = () => new ExprNode();
        var def = () => new KeywordNode(defaultKeyword);
        var alt = new Alternatives([def, expr]);
        this.rootNode = alt;
        return this.rootNode;
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readToEndOfLine();

    renderAsObjectCode(): string {
        if (this.rootNode){
            const ast = transform(this.rootNode, this.getHolder() as unknown as Scope); // TODO fix type
            return ast?.renderAsObjectCode() ?? super.renderAsObjectCode();
        }

        return super.renderAsObjectCode();
    }
}

import { UnknownType } from "../../symbols/unknown-type";

import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { transform } from "../syntax-nodes/ast-visitor";
import { AbstractField } from "./abstract-field";

export class ExpressionField extends AbstractField {
    isParseByNodes = true;

    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value or expression");
    }
    getIdPrefix(): string {
        return 'expr';
    }
    initialiseRoot(): ParseNode {
        this.rootNode = new ExprNode();
        return this.rootNode;
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readToEndOfLine();

    renderAsObjectCode(): string {
        if (this.rootNode && this.rootNode.status === ParseStatus.valid){
            this.astNode = transform(this.rootNode, this.getHolder() as unknown as Scope); // TODO fix type
            return this.astNode?.renderAsObjectCode() ?? super.renderAsObjectCode();
        }

        return super.renderAsObjectCode();
    }

    get symbolType() {
        if (this.astNode) {
            return this.astNode.symbolType;
        }
        return UnknownType.Instance;
    }
}

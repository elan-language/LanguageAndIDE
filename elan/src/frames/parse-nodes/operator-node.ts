import { escapeAngleBrackets } from "../helpers";
import { POWER } from "../symbols";
import { SymbolNode } from "./symbol-node";


export class OperatorNode extends SymbolNode {
    constructor(operator: string) {
        super(operator);
    }

    renderAsHtml(): string {
        return escapeAngleBrackets(this.renderAsSource());
    }

    renderAsSource() : string {
        return `${this.fixedText}`;
    }

    override renderAsObjectCode(): string {
        switch (this.fixedText) {
            case POWER: return "**";
            default:
                return this.fixedText;
        }
    }
}

import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { UnknownType } from "../../symbols/unknown-type";
import { isHasSymbolType } from "../../symbols/symbolHelpers";
import { Field } from "../interfaces/field";
import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export class OptionalNode extends AbstractParseNode implements IHasSymbolType {
    elementConstructor: () => ParseNode;
    matchedNode?: ParseNode;

    constructor(elementConstructor: () => ParseNode) {
        super();
        this.elementConstructor = elementConstructor;
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var option = this.elementConstructor();
            option.parseText(text);
            if (option.status === ParseStatus.valid || (option.status === ParseStatus.incomplete && option.remainingText.trim() === "")) {
                this.updateFrom(option);
                this.matchedNode = option;
            } else {
                this.status = ParseStatus.valid;
                this.remainingText = text;
            }
        } else {
            this.status = ParseStatus.valid;
        }
    }
    renderAsHtml(): string {
        return this.matchedNode ? this.matchedNode.renderAsHtml() : "";
    }
    renderAsSource(): string {
        return this.matchedNode ? this.matchedNode.renderAsSource() : "";
    }

    getCompletion(): string {
        return this.matchedNode? this.matchedNode.getCompletion() : super.getCompletion();
    }

    get symbolType() {
        if (isHasSymbolType(this.matchedNode)) {
            return this.matchedNode.symbolType;
        }

        return UnknownType.Instance;
    }
}
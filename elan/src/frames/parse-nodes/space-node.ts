import { Regexes } from "../fields/regexes";
import { CodeStatus } from "../code-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { Space } from "./parse-node-helpers";

export class SpaceNode extends AbstractParseNode {
    type: Space;

    constructor(type: Space) {
        super();
        this.type = type;
    }

    parseText(text: string): void {
        if (text.length === 0) {
            if (this.type === Space.required) {
                this.status = CodeStatus.empty;
            } else {
                this.status = CodeStatus.valid;
            }
        } else {
            this.remainingText = text;
            var matches = text.match(Regexes.leadingSpaceNotNL);
            if (matches !== null && matches.length > 0) {
                this.remainingText = text.replace(matches[0], "");
                    this.status = CodeStatus.valid ;
            } else {
                this.status = this.type ===  Space.required ? CodeStatus.invalid : CodeStatus.valid;
            }      
        } 
    }

    renderAsHtml(): string {
       return this.renderAsSource();
    }

    renderAsSource(): string {
        return this.type === Space.ignored || this.status === CodeStatus.empty ? "" : " ";
    }
        
    getCompletionAsHtml() : string {
        return this.status === CodeStatus.empty && this.type === Space.required ? " " : "";
    }

    compile(): string { 
        return this.type === Space.ignored ? "" : " "; 
    }
}
import { Statement } from "../statements/statement";
import { Frame } from "../frame";
import { Text } from "./text";
import { singleIndent } from "../helpers";

export class SelectStatement extends Text implements Statement {  
    isStatement = true;

    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("statement");
    }

    getPrefix(): string {
        return 'statementSelect';
    }

    renderAsHtml(): string {
        return `<statement>${super.renderAsHtml()}</statement>`;
    }

    indent(): string {
        return this.getParent()?.indent() + singleIndent();
    }

    renderAsSource(): string {
        return `${this.indent()}`;
    }
} 

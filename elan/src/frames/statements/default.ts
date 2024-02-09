import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { FrameWithStatements } from "../frame-with-statements";
import { StatementSelector } from "./statement-selector";

export class Default extends FrameWithStatements {
    isStatement = true;

    constructor(parent: Parent) {
        super(parent);
    }

    getFields(): Field[] {
        return [];
    }
    
    getIdPrefix(): string {
        return 'default';
    }

    public override selectFirstField(): boolean {
        return false;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>default </keyword></top>
${this.renderStatementsAsHtml()}
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}default
${this.renderStatementsAsSource()}`;
    }
} 

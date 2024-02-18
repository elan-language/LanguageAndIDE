import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../code-source";

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
    parseTopOfFrame(source: CodeSource): void {
        //Can Default and case have a common super-class, as much is in common
        throw new Error("Method not implemented.");
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        throw new Error("Method not implemented.");
    }
} 

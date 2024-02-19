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
        return `${this.indent()}default\r
${this.renderStatementsAsSource()}`;
    }
    parseTopOfFrame(source: CodeSource): void {
        source.remove("default");
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        return source.isMatch("end switch");
    }
} 

import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { MultiLineStatement } from "./multi-line-statement";
import { singleIndent } from "../helpers";

export class Default extends MultiLineStatement {
    constructor(parent: Parent) {
        super(parent);
    }
    getFields(): Field[] {
        return [];
    }   
    getIdPrefix(): string {
        return 'default';
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

    renderAsObjectCode(): string {
        return `${this.indent()}default:\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}${singleIndent()}break;`;
    }

    parseTopOfFrame(source: CodeSource): void {
        source.remove("default");
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        return source.isMatch("end switch");
    }
    canInsertAfter(): boolean {
        return false;
    }
} 

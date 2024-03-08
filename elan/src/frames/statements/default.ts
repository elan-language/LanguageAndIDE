import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { MultiLineStatement } from "./multi-line-statement";

export class Default extends MultiLineStatement {
    constructor(parent: Parent) {
        super(parent);
        this.movable = false;
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
${this.renderChildrenAsHtml()}
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}default\r
${this.renderChildrenAsSource()}`;
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

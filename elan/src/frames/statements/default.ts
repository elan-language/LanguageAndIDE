import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { singleIndent } from "../helpers";

export class Default extends FrameWithStatements implements Statement {
    isStatement = true;
    constructor(parent: Parent) {
        super(parent);
        this.movable = false;
    }
    deleteIfPermissible(): void {}; //Does nothing as default cannot be deleted

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
    compile(): string {
        return `${this.indent()}default:\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}${singleIndent()}break;`;
    }
    
    parseTop(source: CodeSource): void {
        source.remove("default");
    }
    parseBottom(source: CodeSource): boolean {
        source.removeIndent();
        return source.isMatch("end switch");
    }
    canInsertAfter(): boolean {
        return false;
    }
} 

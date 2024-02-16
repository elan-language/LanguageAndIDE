import { CodeSource } from "../code-source";
import { Regexes } from "../fields/regexes";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";

export class MainFrame extends FrameWithStatements {
    isGlobal = true;
    
    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
    }

    getFields(): Field[] {
        return []; //no direct fields
    }

    getIdPrefix(): string {
        return 'main';
    }

    public renderAsHtml() : string {
        return `<main class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>main</keyword></top>
${this.renderStatementsAsHtml()}
<keyword>end main</keyword>
</main>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource() : string {
        return `main\r
${this.renderStatementsAsSource()}\r
end main\r
`;
    }

    parseTopLine(source: CodeSource) {
        source.remove("main");
    }
    
    parseEndOfStatements(source: CodeSource): boolean {
        var end = "end main";
        var result = false;
        if (source.isMatch(end)) {
            source.remove(end);
            result = true
        }
        return result;
    }

}
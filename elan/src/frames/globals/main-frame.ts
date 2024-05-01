import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { mainKeyword } from "../keywords";

export class MainFrame extends FrameWithStatements {
    isMain = true;
    isGlobal = true;
    file: File;
    
    constructor(parent: File) {
        super(parent);
        this.file = parent;
    }
    initialKeywords(): string {
        return mainKeyword;
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
${this.renderChildrenAsHtml()}
<keyword>end main</keyword>
</main>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource() : string {
        return `main\r
${this.renderChildrenAsSource()}\r
end main\r
`;
    }

    public compile() : string {
        this.compileErrors = [];
        return `async function main() {\r
${this.renderStatementsAsObjectCode()}\r
}\r
`;
    }
    parseTop(source: CodeSource) {
        source.remove("main");
    }  
    parseBottom(source: CodeSource): boolean {
       return this.parseStandardEnding(source, "end main");
    }
}
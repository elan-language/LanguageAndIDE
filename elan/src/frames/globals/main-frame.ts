import { Global } from "../interfaces/global";
import { FrameWithStatements } from "../frame-with-statements";
import {File} from "../interfaces/file";
import { Field } from "../interfaces/field";

export class MainFrame extends FrameWithStatements implements Global {
    isGlobal = true;
    
    constructor(parent: File) {
        super(parent);
        this.multiline = true;
    }

    getFields(): Field[] {
        return []; //no direct fields
    }

    getPrefix(): string {
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

}
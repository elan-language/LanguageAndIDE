import { Global } from "./global";
import { FrameWithStatements } from "../frame-with-statements";
import { Renderable } from "../frame";
import {Parent} from "../parent";

export class MainFrame extends FrameWithStatements implements Global {
    isGlobal = true;
    
    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
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
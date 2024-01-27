import { Global } from "./global";
import { FrameWithStatements } from "../frame-with-statements";
import { Frame } from "../frame";

export class MainFrame extends FrameWithStatements implements Global {
    getPrefix(): string {
        return 'main';
    }

    constructor(parent: Frame) {
        super(parent);
        this.multiline = true;
    }

    isGlobal = true;

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
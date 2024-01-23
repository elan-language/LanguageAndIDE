import { Global } from "./global";
import { FrameWithStatements } from "../frame-with-statements";

export class MainFrame extends FrameWithStatements implements Global {

    constructor() {
        super();
        this.htmlId = `main${this.nextId()}`;
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
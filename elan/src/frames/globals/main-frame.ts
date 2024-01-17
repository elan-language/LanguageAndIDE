import { Frame } from "../frame";
import { Global } from "./global";
import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { FrameWithStatements } from "../frame-with-statements";


export class MainFrame extends FrameWithStatements implements Global {

    public htmlId : string ="";

    constructor() {
        super();
        this.htmlId = `main${nextId()}`;
    }

    public renderAsHtml() : string {
        return `<main class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>main</keyword>
${this.renderStatementsAsHtml()}
<keyword>end main</keyword>
</main>`;
    }
}
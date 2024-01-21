import { AbstractFrame } from "../abstract-frame";
import { Global } from "./global";

import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { FrameWithStatements } from "../frame-with-statements";


export class MainFrame extends FrameWithStatements implements Global {

    constructor() {
        super();
        this.htmlId = `main${this.nextId()}`;
        this.multiline = true;
    }

    public renderAsHtml() : string {
        return `<main class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>main</keyword></top>
${this.renderStatementsAsHtml()}
<keyword>end main</keyword>
</main>`;
    }
}
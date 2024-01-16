import { Frame } from "./frame";
import { Global } from "./global";
import { nextId } from "./helpers";
import { Statement } from "./statement";


export class MainFrame implements Global {

    private statements: Array<Statement> = new Array<Statement>();
    public htmlId : string ="";
   
    constructor() {
        this.htmlId = `main${nextId()}`;
    }

    public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        const statements = ss.join("\n");
        return `<global id='${this.htmlId}' tabindex="0">
<keyword>main</keyword>
${statements}
<keyword>end main</keyword>
</global>`;
    }

    public addStatement(s : Statement) {
        this.statements.push(s);
    }
}
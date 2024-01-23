import { Function } from "../globals/function";

export class AsString extends Function {

    constructor() {
        super();
    }

    public renderAsHtml(): string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>function </keyword>asString()<keyword> as </keyword><type>String</type></top>
${this.renderStatementsAsHtml()}
<keyword>end function</keyword>
</function>`;
    }

    public renderAsSource(): string {
        return `
function asString() as String
${this.renderStatementsAsSource()}
${this.returnStatement.renderAsSource()}
end function`;
    }
}
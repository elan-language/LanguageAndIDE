import { Function } from "../globals/function";
import { singleIndent } from "../helpers";

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
        return `${singleIndent()}function asString() as String\r
${this.renderStatementsAsSource()}\r
${singleIndent()}end function`;  // No new line as this is always last global before 'end class'
    }
}
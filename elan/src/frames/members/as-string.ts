import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Function } from "../globals/function";

export class AsString extends Function {

    constructor() {
        super();
    }

    public renderAsHtml() : string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>function </keyword>asString()<keyword> as </keyword><type>String</type>
${this.statementsRenderedAsHtml()}
${this.returnStatement.renderAsHtml()}
<keyword>end function</keyword>
</function>`;
    }
}
import { Frame } from "../frame";
import { FunctionMethod } from "./function-method";
import {Parent} from "../parent";

export class AsString extends FunctionMethod {

    constructor(parent: Parent) {
        super(parent);
        this.statements.splice(0,1);
    }

    public renderAsHtml(): string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>function </keyword>asString()<keyword> as </keyword><type>String</type></top>
${this.renderStatementsAsHtml()}
<keyword>end function</keyword>
</function>`;
    }

    public renderAsSource() : string {
        return `${this.indent()}function asString() as String\r
${this.renderStatementsAsSource()}\r
${this.indent()}end function`;// No new line as 'asString' is always last global before 'end class'
    }
}
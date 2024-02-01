import { Statement } from "./statement";
import { ExceptionMessage } from "../text-fields/exception-message";
import { CodeFrame } from "../code-frame";
import { Frame } from "../frame";
import {Parent} from "../parent";
import { TextFieldHolder } from "../TextFieldHolder";

export class Throw extends CodeFrame implements Statement, TextFieldHolder {
    isStatement = true;
    text: ExceptionMessage;

    constructor(parent: Parent) {
        super(parent);
        this.text = new ExceptionMessage(this);
    }
    getPrefix(): string {
        return 'throw';
    }

    public override selectFirstText(): boolean {
        this.text.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>throw </keyword>${this.text.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}throw ${this.text.renderAsSource()}`;
    }
} 

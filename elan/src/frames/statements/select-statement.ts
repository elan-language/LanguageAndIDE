import { Statement } from "../statements/statement";
import { singleIndent } from "../helpers";
import {FrameWithStatements} from "../frame-with-statements";
import {Parent} from "../parent";
import { AbstractFrame } from "../abstract-frame";
import { SelectStatementField } from "../text-fields/select-statement-field";
import { TextFieldHolder } from "../TextFieldHolder";


export class SelectStatement extends AbstractFrame implements Statement, TextFieldHolder {  
    isStatement = true;
    field: SelectStatementField;

    constructor(parent: Parent) {
        super(parent);
        this.field = new SelectStatementField(this);
    }
     getPrefix(): string {
        return 'statementSelect';
    }

    renderAsHtml(): string {
        return `<statement>${this.field.renderAsHtml()}</statement>`;
    }

    indent(): string {
        return this.getParent()?.indent() + singleIndent();
    }

    renderAsSource(): string {
        return `${this.indent()}`;
    }  
} 

import { ExpressionField } from "../fields/expression-field";
import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";

import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Statement } from "../interfaces/statement";
import { printKeyword } from "../keywords";

export class Print extends AbstractFrame implements Statement {
    isStatement = true;  
    expr: ExpressionField;

    constructor(parent: Parent) {
        super(parent);
        this.expr = new ExpressionField(this);
        this.expr.setOptional(true);
        this.expr.setPlaceholder("expression");
    }
    initialKeywords(): string {
        return printKeyword;
    }
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("print");
        this.expr.parseFrom(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.expr];
    }
    getIdPrefix(): string {
        return 'print';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>print </keyword>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}print ${this.expr.renderAsSource()}`;
    }

    compile(): string {
        this.compileErrors = [];
        return `${this.indent()}system.print(_stdlib.asString(${this.expr.compile()}));`;
    }
} 

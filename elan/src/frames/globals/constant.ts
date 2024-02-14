import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { File} from "../interfaces/file";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";

export class Constant extends AbstractFrame {
    isGlobal = true;
    name: Identifier;
    expr: Expression;

    constructor(parent: File) {
        super(parent);
        this.name  = new Identifier(this);
        this.expr = new Expression(this);
        this.expr.setPlaceholder("literal value");
    }

    parseFromSource(source: CodeSource): void {
        source.remove("constant ");
        this.name.parseFromSource(source);
        source.remove(" set to ");
        this.expr.parseFromSource(source);
        //source.removeNewLine();
    }

    getFields(): Field[] {
        return [this.name, this.expr];
    }

    getIdPrefix(): string {
        return 'const';
    }

    public override selectFirstField(): boolean {
        this.name.select();
        return true;
    }

    renderAsHtml(): string {
        return `<constant class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>constant </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</constant>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return `constant ${this.name.renderAsSource()} set to ${this.expr.renderAsSource()}\r
`;
    }
} 

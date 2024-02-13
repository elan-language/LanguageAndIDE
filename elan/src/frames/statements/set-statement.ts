import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import { Parent } from "../interfaces/parent";
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { Parser, ParserFSM, ParserRule, SourceOfCode } from "../parser-fsm";

export class SetStatement extends AbstractFrame implements Parser  {
    isStatement = true;
    name: Identifier;;
    expr: Expression;
    parserFSM: ParserFSM;

    constructor(parent: Parent) {
        super(parent);
        this.name = new Identifier(this);
        this.name.setPlaceholder("variableName");
        this.expr = new Expression(this);
		var r1 = new ParserRule("initial", /^\s*set /, "to", this.name);
		var r2 = new ParserRule("to", /^ to /, "eol", this.expr);;
		var r3 = new ParserRule("eol", /^\n/, ParserFSM.finished, undefined);
        this.parserFSM = new ParserFSM([r1, r2, r3]);
    }
    parseAsMuchAsPoss(source: SourceOfCode): void {
        this.parserFSM.parseAsMuchAsPoss(source);
    }

    getFields(): Field[] {
        return [this.name, this.expr];
    }
    
    getIdPrefix(): string {
        return 'set';
    }

    public override selectFirstField(): boolean {
        this.name.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}set ${this.name.renderAsSource()} to ${this.expr.renderAsSource()}`;
    }
} 

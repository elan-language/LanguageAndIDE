import { Identifier } from "../fields/identifier";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { singleIndent } from "../helpers";
import { MultiLineStatement } from "./multi-line-statement";

export class Catch extends MultiLineStatement {
    variable: Identifier;

    constructor(parent: Parent) {
        super(parent);
        this.variable  = new Identifier(this);
        this.variable.setPlaceholder("variableName");
        this.variable.setText("e");
    }
    getFields(): Field[] {
        return [this.variable];
    }
    
    getIdPrefix(): string {
        return 'catch';
    }
    indent(): string {
        return this.getParent()?.indent()+singleIndent(); 
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>catch </keyword>${this.variable.renderAsHtml()}
${this.renderChildrenAsHtml()}        
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}catch ${this.variable.renderAsSource()}\r
${this.renderChildrenAsSource()}`;;
    }

    parseTopOfFrame(source: CodeSource): void {
        source.remove("catch ");
        this.variable.parseFrom(source);
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        return this.parseStandardEnding(source, "end try");
    }
} 

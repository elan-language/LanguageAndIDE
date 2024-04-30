import { IdentifierField } from "../fields/identifier-field";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { singleIndent } from "../helpers";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { catchKeyword } from "../keywords";

export class Catch extends FrameWithStatements implements Statement {
    isStatement = true;
    variable: IdentifierField;

    constructor(parent: Parent) {
        super(parent);
        this.variable  = new IdentifierField(this);
        this.variable.setPlaceholder("variableName");
        this.variable.setText("e");
    } 

    initialKeywords(): string {
        return catchKeyword;
    }

    delete(): void {}; //Does nothing as catch cannot be deleted

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

    parseTop(source: CodeSource): void {
        source.remove("catch ");
        this.variable.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
        return this.parseStandardEnding(source, "end try");
    }
} 

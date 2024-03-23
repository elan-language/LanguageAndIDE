import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { anythingToNewline } from "./parse-functions";

export class ExpressionField extends AbstractField  {

    node?: ExprNode;  
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value or expression");
    }
    getIdPrefix(): string {
        return 'expr';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return anythingToNewline(input);
    }   

    initialiseRoot(): ParseNode | undefined {
        this.node = new ExprNode();
        return this.node;
    }
    readToDelimeter: ((source: CodeSource) => string) | undefined = (source: CodeSource) => source.readToEndOfLine();

/*     parseCurrentText() : void {
        var status = ParseStatus.invalid;
        this.node = new ExprNode();
        this.node.parseText(this.text);
        if (this.node.remainingText.trim().length === 0) { //i.e. valid or incomplete
            status = this.node.status;
        }
        this.setStatus(status);
    } */

/*     parseFrom(source: CodeSource): void {
        //TODO: generalise this into an implementation for any field that uses ParseNodes
        // c.f. an alternate implementation for using a ParseFunction
        var rol = source.readToEndOfLine();
        this.setText(rol);
        this.parseCurrentText();
        if (this.getStatus() === ParseStatus.valid || this.isOptional()) {
            this.text = this.node!.matchedText;
            rol = rol.substring(this.text.length);
            source.pushBackOntoFrontOfCode(rol);
        } else {
            throw new Error(`Parse ${this.getStatus().toString()} at ${rol}`);
        } 
    } */

    public textAsHtml(): string {
        if (this.selected) {
            return super.textAsHtml();
        }
        else{ 
            return this.node ? this.node.renderAsHtml() : super.textAsHtml();
        } 
    }
}

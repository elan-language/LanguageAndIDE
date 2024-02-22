import { StatementFactory } from "../interfaces/statement-factory";
import { FrameWithStatements } from "../frame-with-statements";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";

export class StatementSelector extends AbstractSelector  {

    constructor(parent: FrameWithStatements) {
        super(parent);
        this.factory = (parent.getFactory());
    }

    //call each for if print repeat set switch throw try var while #";
    defaultOptions: [string, string][] = [
        ["Assert", "assert"],
        ["Call", "call"],
        ["Case", "case"],
        ["Catch", "catch"],
        ["Each", "each"],
        ["Else", "else"],
        ["For", "for"],
        ["IfThen", "if"],
        ["Print", "print"],
        ["Repeat", "repeat"],
        ["SetStatement", "set"],
        ["Switch", "switch"],
        ["Throw", "throw"],
        ["TryCatch", "try"],
        ["Variable", "var"],
        ["While", "while"],
        ["CommentStatement", "#"],
        ["ReturnStatement", "return"]
    ];
    
    addFrame(frameType: string): Frame {
        return this.factory.addFrameBefore(frameType, this);
    }

    validForEditorWithin(frameType: string): boolean {
        if (this.getParent().getIdPrefix() === "test" ) {
            return frameType === "Assert" || frameType === "Call" || frameType === "Var";
        } else if (this.getParent().getIdPrefix() === "switch" ) {
            return frameType === "Case";
        } else if (frameType === "Else" && this.getParent().getIdPrefix() === "if" ) {
            return true;
        } else if ((frameType === "Call" || frameType === "Print") && this.isWithinAFunction(this.getParent()) ) {
            return false;
        } else {
            return frameType !== "Case" && frameType !== "Else" && frameType !== "ReturnStatement";
        }
    }

    private isWithinAFunction(parent: Parent): boolean {
        return parent.getIdPrefix() === 'func' ? true : parent.hasParent() && this.isWithinAFunction(parent.getParent());

    }

    isStatement = true;
    private factory: StatementFactory;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplay()}</statement>`;
    }
} 

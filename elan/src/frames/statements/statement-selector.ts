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
    private assert: [string, string] = ["Assert", "assert"];
    private call: [string, string] = ["Call", "call"];
    private case: [string, string] = ["Case", "case"];
    private catch: [string, string] = ["Catch", "catch"];
    private each: [string, string] = ["Each", "each"];
    private else: [string, string] = ["Else", "else"];
    private for: [string, string] = ["For", "for"];
    private if: [string, string] = ["IfThen", "if"];
    private print: [string, string] = ["Print", "print"];
    private repeat: [string, string] = ["Repeat", "repeat"];
    private set: [string, string] = ["SetStatement", "set"];
    private switch: [string, string] = ["Switch", "switch"];
    private throw: [string, string] = ["Throw", "throw"];
    private try: [string, string] = ["TryCatch", "try"];
    private var: [string, string] = ["Variable", "var"];
    private while: [string, string] = ["While", "while"];
    private comment: [string, string] = ["CommentStatement", "#"];
    private return: [string, string] = ["ReturnStatement", "return"];

    
    //call each for if print repeat set switch throw try var while #";
    defaultOptions: [string, string][] = [this.assert, this.call, this.case, this.catch, this.each, this.else, this.for, 
        this.if, this.print, this.repeat, this.set, this.switch, this.throw, this.try, this.var, this.while, this.comment, this.return];

    addFrame(frameType: string): Frame {
        return this.factory.addFrameBefore(frameType, this);
    }

    validForEditorWithin(frameType: string): boolean {
        if (this.getParent().getIdPrefix() === "test" ) {
            return frameType === "Assert" ||frameType === "Call" || frameType === "Variable";
        } else if (this.getParent().getIdPrefix() === "switch") {
            return frameType === "Case";     
        } else if (frameType === "ReturnStatement" || frameType === "Assert" || frameType === "Case") {
            return false;
        } else if (frameType === "Else" ) {
            return this.getParent().getIdPrefix() === "if" ;
        } else if (frameType === "Print" || frameType === "Call") {
            return !this.isWithinAFunction(this.getParent());
        } else {
            return true;
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

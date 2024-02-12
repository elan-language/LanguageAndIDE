import { StatementFactory } from "../interfaces/statement-factory";
import { FrameWithStatements } from "../frame-with-statements";
import { AbstractSelector } from "../abstract-selector";

export class StatementSelector extends AbstractSelector  {

    constructor(parent: FrameWithStatements) {
        super(parent);
        this.factory = (parent.getFactory());
        this.currentOptions = this.defaultOptions;
    }

    //call each for if print repeat set switch throw try var while #";
    defaultOptions: [string, string][] = [
        ["Call", "call"],
        ["Case", "case"],
        ["Catch", "catch"],
        ["Default", "default"],
        ["Each", "each"],
        ["Else", "else"],
        ["For", "for"],
        ["IfThen", "if"],
        ["Print", "print"],
        ["Repeat", "repeat"],
        ["ReturnStatement", "return"],
        ["SetStatement", "set"],
        ["Switch", "switch"],
        ["Throw", "throw"],
        ["TryCatch", "try"],
        ["Variable", "var"],
        ["While", "while"],
        ["CommentStatement", "#"]
    ];

    addMember(frameType: string, startText: string): void {
        this.factory.addFrameBefore(frameType, this, startText);
    }

    validforContext(frameType: string): boolean {
        return true; //TODO
    }

    isStatement = true;
    private factory: StatementFactory;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplay()}</statement>`;
    }
} 

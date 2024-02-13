import { Member } from "../interfaces/member";
import { singleIndent } from "../helpers";
import { Class } from "../globals/class";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";

export class MemberSelector extends AbstractSelector implements Member  {

    constructor(parent: Parent) {
        super(parent);
    }
   
    defaultOptions: [string, string][] = [
        ["FunctionMethod", "function"],
        ["ProcedureMethod", "procedure"],
        ["Property", "property"]
    ];

    validforContext(frameType: string): boolean {
        return this.getClass().immutable ? frameType !== "FunctionMethod" : true;
    }

    isMember: boolean = true;

    renderAsHtml(): string {
        return `<member class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplay()}</member>`;
    }

    indent(): string {
        return singleIndent();
    }

    getClass(): Class {
        return this.getParent() as Class;
    }

    addFrame(frameType: string): void {
        switch(frameType) {
            case "FunctionMethod": {
                this.getClass().addFunctionMethodBefore(this);
                break;
            }
            case "ProcedureMethod": {
                this.getClass().addProcedureMethodBefore(this);
                break;
            }
            case "Property": {
                this.getClass().addPropertyBefore(this);
                break;
            }
        }
    }
} 

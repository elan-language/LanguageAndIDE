import { Member } from "../interfaces/member";
import { singleIndent } from "../helpers";
import { Class } from "../globals/class";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";

export class MemberSelector extends AbstractSelector implements Member  {

    constructor(parent: Parent) {
        super(parent);
    }
   
    defaultOptions: [string, string][] = [
        ["FunctionMethod", "function"],
        ["ProcedureMethod", "procedure"],
        ["Property", "property"],
        ["PrivateProperty", "private"]
    ];

    validForEditorWithin(frameType: string): boolean {
        if(frameType === "PrivateProperty") {
            return false;
        }
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

    addFrame(frameType: string): Frame {
        switch(frameType) {
            case "FunctionMethod": {
                return this.getClass().addFunctionMethodBefore(this);
            }
            case "ProcedureMethod": {
                return this.getClass().addProcedureMethodBefore(this);
            }
            case "Property": {
                return this.getClass().addPropertyBefore(this);
            }
            case "PrivateProperty": {
                return this.getClass().addPropertyBefore(this);
            }
            default: {
                throw new Error(`${frameType} is not a valid member frame type.`);
            }
        }
    }
} 

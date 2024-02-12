import { Member } from "../interfaces/member";
import { singleIndent } from "../helpers";
import { Class } from "../globals/class";
import { AbstractSelector } from "../abstract-selector";
import { Type } from "../fields/type";
import { Parent } from "../interfaces/parent";


export class MemberSelector extends AbstractSelector implements Member  {

    constructor(parent: Parent) {
        super(parent);
        this.currentOptions = this.defaultOptions;
    }
   
    defaultOptions: [string, string][] = [
        ["FunctionMethod", "function"],
        ["ProcedureMethod", "procedure"],
        ["Property", "property"]
    ];

    validforContext(frameType: string): boolean {
        return true; //TODO
    }

    isMember: boolean = true;

    getHelp(): string {
        return this.text.length > 0 && "pro".startsWith(this.text) ? "procedure property" : "function procedure property";
    }
    renderAsHtml(): string {
        return `<member class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplay()}</member>`;
    }

    indent(): string {
        return singleIndent();
    }

    getClass(): Class {
        return this.getParent() as Class;
    }

    private addMember(type: Type, start: string) : void {
        
        //TODO, use start
    }

    addFrame(frameType: string, startText: string): void {
        //TODO: use startText
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

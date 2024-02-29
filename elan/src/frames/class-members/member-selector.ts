import { Member } from "../interfaces/member";
import { singleIndent } from "../helpers";
import { Class } from "../globals/class";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";

export class MemberSelector extends AbstractSelector implements Member  {
    private class: Class;

    constructor(parent: Parent) {
        super(parent);
        this.class = parent as Class;
    }
   
    defaultOptions: [string, string][] = [
        ["FunctionMethod", "function"],
        ["ProcedureMethod", "procedure"],
        ["Property", "property"],
        ["Comment", "#"],
        ["PrivateProperty", "private"],
        ["AbstractProperty", "abstract property"],
        ["AbstractFunction", "abstract function"],
        ["AbstractProcedure", "abstract procedure"]
    ];

    validForEditorWithin(frameType: string): boolean {
        var result = false;
        if (this.getClass().isAbstract()) {
            if (this.getClass().immutable) {
                result = frameType.startsWith("Abstract") && frameType !== "AbstractProcedure";
            } else {
                result = frameType.startsWith("Abstract");
            }
        } else if (this.getClass().immutable) {
            result = !frameType.startsWith("Abstract") && frameType !== "ProcedureMethod" && frameType !== "PrivateProperty";
        }  else {
            result = !frameType.startsWith("Abstract") && frameType !== "PrivateProperty";
        }
        return result;
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
            case "Comment": {
                return this.getClass().addCommentBefore(this);
            }
            case "PrivateProperty": {
                return this.getClass().addPropertyBefore(this);
            }
            case "AbstractProperty": {
                return this.getClass().addAbstractPropertyBefore(this);
            }
            case "AbstractProcedure": {
                return this.getClass().addAbstractProcedureBefore(this);
            }
            case "AbstractFunction": {
                return this.getClass().addAbstractFunctionBefore(this);
            }
            default: {
                throw new Error(`${frameType} is not a valid member frame type.`);
            }
        }
    }
} 

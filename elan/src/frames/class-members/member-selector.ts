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
   
    //TODO: this could be [() => Member, string] e.g. [() => cls.newComment(), "#"]
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

    //TODO: generic method (common to all selectors) 
    //processNew(frame: Frame)
    //But even this could be pushed up into AbstractSelector if we make it more generic
    //in terms of 'children' rather than specific to Global, Member, Statement

    validForEditorWithin(frameType: string): boolean {
        var result = false;
        if (this.getClass().isAbstract()) {
            if (this.getClass().isImmutable()) {
                result = frameType.startsWith("Abstract") && frameType !== "AbstractProcedure";
            } else {
                result = frameType.startsWith("Abstract");
            }
        } else if (this.getClass().isImmutable()) {
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
        //TODO: refactor to reduce repetition (here and on class):
        //just get the newly-created member from the class, then call the addMemberAndSelectFirstField method here
        //once at the end of the switch. (Same for adding globals into file impl. )
        //N.B StatementSelector and Factory is more efficient.
        //could even eliminate this by making the defaultOptions a dictionary holding the 
        //string label and function (delegating to class) to create the new member.
        var cls = this.class;
        var newMem: Member;
        switch(frameType) {
            case "FunctionMethod": {
                return cls.addFunctionMethodBefore(this);  //change to newMen = cls.newFunctionMethod();
            }
            case "ProcedureMethod": {
                return cls.addProcedureMethodBefore(this);
            }
            case "Property": {
                return cls.addPropertyBefore(this);
            }
            case "Comment": {
                return cls.addCommentBefore(this);
            }
            case "PrivateProperty": {
                return cls.addPropertyBefore(this);
            }
            case "AbstractProperty": {
                return cls.addAbstractPropertyBefore(this);
            }
            case "AbstractProcedure": {
                return cls.addAbstractProcedureBefore(this);
            }
            case "AbstractFunction": {
                return cls.addAbstractFunctionBefore(this);
            }
            default: {
                throw new Error(`${frameType} is not a valid member frame type.`);
            }
        }
    }
} 

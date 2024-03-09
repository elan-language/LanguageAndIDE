import { Member } from "../interfaces/member";
import { singleIndent } from "../helpers";
import { Class } from "../globals/class";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";

export class MemberSelector extends AbstractSelector implements Member  {
    isMember: boolean = true;
    private class: Class;

    constructor(parent: Parent) {
        super(parent);
        this.class = parent as Class;
    }
   
    defaultOptions: [string, (parent: Parent) => Frame][] = [
        ["function", (parent: Parent) => this.class.createFunction()],
        ["procedure", (parent: Parent) => this.class.createProcedure()],
        ["property", (parent: Parent) => this.class.createProperty()],
        ["#", (parent: Parent) => this.class.createComment()],
        ["private", (parent: Parent) => this.class.createProperty()],
        ["abstract property", (parent: Parent) => this.class.createAbstractProperty()],
        ["abstract function", (parent: Parent) => this.class.createAbstractFunction()],
        ["abstract procedure", (parent: Parent) => this.class.createAbstractProcedure()]
    ];

    validForEditorWithin(keyword: string): boolean {
        var result = false;
        if (this.class.isAbstract()) {
            if (this.class.isImmutable()) {
                result = keyword.startsWith("abstract") && keyword !== "abstract procedure";
            } else {
                result = keyword.startsWith("abstract");
            }
        } else if (this.class.isImmutable()) {
            result = !keyword.startsWith("abstract") && keyword !== "procedure" && keyword !== "private";
        }  else {
            result = !keyword.startsWith("abstract") && keyword !== "private";
        }
        return result;
    }

    renderAsHtml(): string {
        return `<member class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplayAsHtml()}</member>`;
    }

    indent(): string {
        return singleIndent();
    }
} 

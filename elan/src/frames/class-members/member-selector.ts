import { Member } from "../interfaces/member";
import { singleIndent } from "../helpers";
import { Class } from "../globals/class";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";
import { functionKeyword, procedureKeyword, propertyKeyword, privateKeyword, abstractKeyword, commentMarker } from "../keywords";

export class MemberSelector extends AbstractSelector implements Member  {
    isMember: boolean = true;
    private class: Class;

    constructor(parent: Parent) {
        super(parent);
        this.class = parent as Class;
    }

    private abstractProp = abstractKeyword + " " + propertyKeyword;
    private abstractProc = abstractKeyword + " " + procedureKeyword;
    private abstractFunc = abstractKeyword + " " + functionKeyword;
   
    defaultOptions: [string, (parent: Parent) => Frame][] = [
        [functionKeyword, (parent: Parent) => this.class.createFunction()],
        [procedureKeyword, (parent: Parent) => this.class.createProcedure()],
        [propertyKeyword, (parent: Parent) => this.class.createProperty()],
        [commentMarker, (parent: Parent) => this.class.createComment()],
        [privateKeyword, (parent: Parent) => this.class.createProperty()],
        [this.abstractProp, (parent: Parent) => this.class.createAbstractProperty()],
        [this.abstractFunc, (parent: Parent) => this.class.createAbstractFunction()],
        [this.abstractProc, (parent: Parent) => this.class.createAbstractProcedure()]
    ];

    validForEditorWithin(keyword: string): boolean {
        var result = false;
        if (this.class.isAbstract()) {
            if (this.class.isImmutable()) {
                result = keyword.startsWith(abstractKeyword) && keyword !== "abstract procedure";
            } else {
                result = keyword.startsWith(abstractKeyword);
            }
        } else if (this.class.isImmutable()) {
            result = !keyword.startsWith(abstractKeyword) && keyword !== procedureKeyword && keyword !== privateKeyword;
        }  else {
            result = !keyword.startsWith(abstractKeyword) && keyword !== privateKeyword;
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

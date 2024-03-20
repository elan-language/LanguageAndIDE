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
   
    getDefaultOptions(): [string, (parent: Parent) => Frame][] {
        var options:  [string, (parent: Parent) => Frame][] = [
        [functionKeyword, (parent: Parent) => this.class.createFunction()],
        [procedureKeyword, (parent: Parent) => this.class.createProcedure()],
        [propertyKeyword, (parent: Parent) => this.class.createProperty()],
        [privateKeyword, (parent: Parent) => this.class.createProperty()],
        ["abstract function", (parent: Parent) => this.class.createAbstractFunction()],
        ["abstract procedure", (parent: Parent) => this.class.createAbstractProcedure()],
        ["abstract property", (parent: Parent) => this.class.createAbstractProperty()],
        [commentMarker, (parent: Parent) => this.class.createComment()],
        ];
        return options;
    }

    profileAllows(keyword: string): boolean {
        return  this.profile.class_members.includes(keyword);
    }

    validForEditorWithin(keyword: string): boolean {
        var result = false;
        if (this.class.isAbstract()) {
            if (this.class.isImmutable()) {
                result = keyword.startsWith(abstractKeyword) && keyword !== this.abstractProc;
            } else {
                result = keyword.startsWith(abstractKeyword) || keyword === commentMarker;
            }
        } else if (this.class.isImmutable()) {
            result = !keyword.startsWith(abstractKeyword) && keyword !== procedureKeyword && keyword !== privateKeyword;
        }  else {
            result = !keyword.startsWith(abstractKeyword) && keyword !== privateKeyword; //private is for use by parser only
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

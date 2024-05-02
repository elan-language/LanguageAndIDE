import { Member } from "../interfaces/member";
import { singleIndent } from "../helpers";
import { Class } from "../globals/class";
import { AbstractSelector } from "../abstract-selector";
import { Parent } from "../interfaces/parent";
import { Frame } from "../interfaces/frame";
import { functionKeyword, procedureKeyword, propertyKeyword, privateKeyword, abstractKeyword, commentMarker, abstractPropertyKeywords, abstractProcedureKeywords, abstractFunctionKeywords } from "../keywords";

export class MemberSelector extends AbstractSelector implements Member  {
    isMember: boolean = true;
    private class: Class;

    constructor(parent: Parent) {
        super(parent);
        this.class = parent as Class;
    }
 
    getDefaultOptions(): [string, (parent: Parent) => Frame][] {
        var options:  [string, (parent: Parent) => Frame][] = [
        [functionKeyword, (parent: Parent) => this.class.createFunction()],
        [procedureKeyword, (parent: Parent) => this.class.createProcedure()],
        [propertyKeyword, (parent: Parent) => this.class.createProperty()],
        [privateKeyword, (parent: Parent) => this.class.createProperty()],
        [abstractFunctionKeywords, (parent: Parent) => this.class.createAbstractFunction()],
        [abstractProcedureKeywords, (parent: Parent) => this.class.createAbstractProcedure()],
        [abstractPropertyKeywords, (parent: Parent) => this.class.createAbstractProperty()],
        [commentMarker, (parent: Parent) => this.class.createComment()],
        ];
        return options;
    }

    profileAllows(keyword: string): boolean {
        return  this.profile.class_members.includes(keyword);
    }

    validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
        var result = false;
        if (this.class.isAbstract()) {
            if (this.class.isImmutable()) {
                result = keyword.startsWith(abstractKeyword) && keyword !== abstractProcedureKeywords  || keyword === commentMarker;
            } else {
                result = keyword.startsWith(abstractKeyword) || keyword === commentMarker;
            }
        } else if (this.class.isImmutable()) {
            result = !keyword.startsWith(abstractKeyword) && keyword !== procedureKeyword;
        }  else {
            result = !keyword.startsWith(abstractKeyword) && (keyword !== privateKeyword || !userEntry); //private 
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

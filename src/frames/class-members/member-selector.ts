import { AbstractSelector } from "../abstract-selector";
import { ClassFrame } from "../globals/class-frame";
import { singleIndent } from "../helpers";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import {
  abstractFunctionKeywords,
  abstractKeyword,
  abstractProcedureKeywords,
  abstractPropertyKeywords,
  commentMarker,
  functionKeyword,
  privateFunctionKeywords,
  privateKeyword,
  privateProcedureKeywords,
  privatePropertyKeywords,
  procedureKeyword,
  propertyKeyword,
} from "../keywords";

export class MemberSelector extends AbstractSelector implements Member {
  isMember: boolean = true;
  private class: ClassFrame;

  constructor(parent: Parent) {
    super(parent);
    this.class = parent as ClassFrame;
  }

  defaultOptions(): [string, (parent: Parent) => Frame][] {
    const options: [string, (parent: Parent) => Frame][] = [
      [functionKeyword, (parent: Parent) => this.class.createFunction()],
      [procedureKeyword, (parent: Parent) => this.class.createProcedure()],
      [propertyKeyword, (parent: Parent) => this.class.createProperty()],
      [abstractFunctionKeywords, (parent: Parent) => this.class.createAbstractFunction()],
      [abstractProcedureKeywords, (parent: Parent) => this.class.createAbstractProcedure()],
      [abstractPropertyKeywords, (parent: Parent) => this.class.createAbstractProperty()],
      [privateFunctionKeywords, (parent: Parent) => this.class.createFunction(true)],
      [privateProcedureKeywords, (parent: Parent) => this.class.createProcedure(true)],
      [privatePropertyKeywords, (parent: Parent) => this.class.createProperty(true)],
      [commentMarker, (parent: Parent) => this.class.createComment()],
    ];
    return options;
  }

  profileAllows(keyword: string): boolean {
    return this.profile.class_members.includes(keyword);
  }

  validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
    let result = false;
    if (this.class.isAbstract()) {
      if (this.class.isImmutable()) {
        result =
          (keyword.startsWith(abstractKeyword) ||
            keyword.startsWith(privateKeyword) ||
            keyword === commentMarker) &&
          !keyword.includes(procedureKeyword);
      } else {
        result =
          keyword.startsWith(abstractKeyword) ||
          keyword.startsWith(privateKeyword) ||
          keyword === commentMarker;
      }
    } else if (this.class.isImmutable()) {
      result = !keyword.startsWith(abstractKeyword) && !keyword.includes(procedureKeyword);
    } else {
      result = !keyword.startsWith(abstractKeyword);
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

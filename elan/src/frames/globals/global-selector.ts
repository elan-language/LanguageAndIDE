import { File } from "../interfaces/file";
import { AbstractSelector } from "../abstract-selector";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import {
  commentMarker,
  abstractKeyword,
  classKeyword,
  constantKeyword,
  enumKeyword,
  functionKeyword,
  immutableKeyword,
  mainKeyword,
  procedureKeyword,
  testKeyword,
} from "../keywords";
import { GlobalFrame } from "../interfaces/global-frame";

export class GlobalSelector extends AbstractSelector implements GlobalFrame {
  isGlobal = true;
  file: File;

  constructor(parent: File) {
    super(parent);
    this.file = parent;
  }

  defaultOptions(): [string, (parent: Parent) => Frame][] {
    return [
      [mainKeyword, (parent: Parent) => this.file.createMain()],
      [procedureKeyword, (parent: Parent) => this.file.createProcedure()],
      [functionKeyword, (parent: Parent) => this.file.createFunction()],
      [classKeyword, (parent: Parent) => this.file.createClass()],
      [constantKeyword, (parent: Parent) => this.file.createConstant()],
      [enumKeyword, (parent: Parent) => this.file.createEnum()],
      [testKeyword, (parent: Parent) => this.file.createTest()],
      [commentMarker, (parent: Parent) => this.file.createGlobalComment()],
      [abstractKeyword, (parent: Parent) => this.file.createClass()],
      [immutableKeyword, (parent: Parent) => this.file.createClass()],
    ];
  }

  profileAllows(keyword: string): boolean {
    return this.profile.globals.includes(keyword);
  }

  validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
    let result = false;
    if (keyword === mainKeyword) {
      result = !this.file.containsMain();
    } else if (keyword === abstractKeyword || keyword === immutableKeyword) {
      //Those options available for parsing code from file only
      result = !userEntry;
    } else {
      result = true;
    }
    return result;
  }

  renderAsHtml(): string {
    return `<global class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplayAsHtml()}</global>`;
  }

  indent(): string {
    return "";
  }
}

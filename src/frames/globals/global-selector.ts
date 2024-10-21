import { AbstractSelector } from "../abstract-selector";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { GlobalFrame } from "../interfaces/global-frame";
import { Parent } from "../interfaces/parent";
import {
  abstractClassKeywords,
  abstractImmutableKeywords,
  classKeyword,
  commentMarker,
  constantKeyword,
  enumKeyword,
  functionKeyword,
  immutableKeyword,
  mainKeyword,
  procedureKeyword,
  recordKeyword,
  testKeyword,
} from "../keywords";
import { ParseStatus } from "../status-enums";

export class GlobalSelector extends AbstractSelector implements GlobalFrame {
  isGlobal = true;
  file: File;

  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.setParseStatus(ParseStatus.default);
  }

  defaultOptions(): [string, (parent: Parent) => Frame][] {
    return [
      [mainKeyword, (parent: Parent) => this.file.createMain()],
      [procedureKeyword, (parent: Parent) => this.file.createProcedure()],
      [functionKeyword, (parent: Parent) => this.file.createFunction()],
      [constantKeyword, (parent: Parent) => this.file.createConstant()],
      [testKeyword, (parent: Parent) => this.file.createTest()],
      [enumKeyword, (parent: Parent) => this.file.createEnum()],
      [classKeyword, (parent: Parent) => this.file.createClass(false, false)],
      [abstractClassKeywords, (parent: Parent) => this.file.createClass(true, false)],
      [abstractImmutableKeywords, (parent: Parent) => this.file.createClass(true, true)],
      [immutableKeyword, (parent: Parent) => this.file.createClass(false, true)],
      [recordKeyword, (parent: Parent) => this.file.createRecord()],
      [commentMarker, (parent: Parent) => this.file.createGlobalComment()],
    ];
  }

  profileAllows(keyword: string): boolean {
    return this.profile.globals.includes(keyword);
  }

  validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
    let result = false;
    if (keyword === mainKeyword) {
      result = !this.file.containsMain();
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

  override canBePastedIn(frame: Frame): boolean {
    if ("isGlobal" in frame) {
      return this.optionsMatchingUserInput(frame.initialKeywords()).length === 1;
    } else {
      return false;
    }
  }
}

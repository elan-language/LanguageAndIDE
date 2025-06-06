import { AbstractSelector } from "../abstract-selector";
import { isGlobal } from "../frame-helpers";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { GlobalFrame } from "../interfaces/global-frame";
import { Parent } from "../interfaces/parent";
import {
  abstractKeyword,
  classKeyword,
  commentMarker,
  constantKeyword,
  enumKeyword,
  functionKeyword,
  ignoreKeyword,
  interfaceKeyword,
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

  override helpId(): string {
    return "GlobalInstructions";
  }

  defaultOptions(): [string, (parent: Parent) => Frame][] {
    return [
      [mainKeyword, (_parent: Parent) => this.file.createMain()],
      [procedureKeyword, (_parent: Parent) => this.file.createProcedure()],
      [functionKeyword, (_parent: Parent) => this.file.createFunction()],
      [testKeyword, (_parent: Parent) => this.file.createTest()],
      [constantKeyword, (_parent: Parent) => this.file.createConstant()],
      [enumKeyword, (_parent: Parent) => this.file.createEnum()],
      [recordKeyword, (_parent: Parent) => this.file.createRecord()],
      [classKeyword, (_parent: Parent) => this.file.createConcreteClass()],
      [abstractKeyword, (_parent: Parent) => this.file.createAbstractClass()],
      [interfaceKeyword, (_parent: Parent) => this.file.createInterface()],
      [commentMarker, (_parent: Parent) => this.file.createGlobalComment()],
      [ignoreKeyword, (_parent: Parent) => this.file.createTest()],
    ];
  }

  profileAllows(keyword: string): boolean {
    return this.profile.globals.includes(keyword);
  }

  validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
    let result = false;
    if (keyword === mainKeyword && userEntry) {
      result = !this.file.containsMain();
    } else {
      result = true;
    }
    return result;
  }

  renderAsHtml(): string {
    return `<el-global class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.textToDisplayAsHtml()}</el-global>`;
  }

  indent(): string {
    return "";
  }

  override canBePastedIn(frame: Frame): boolean {
    if (isGlobal(frame)) {
      return this.optionsMatchingUserInput(frame.initialKeywords()).length === 1;
    } else {
      return false;
    }
  }
}

import {
  abstractKeyword,
  classKeyword,
  commentMarker,
  constantKeyword,
  enumKeyword,
  functionKeyword,
  interfaceKeyword,
  mainKeyword,
  procedureKeyword,
  recordKeyword,
  testKeyword,
} from "../../../compiler/elan-keywords";
import { AbstractSelector } from "../abstract-selector";
import { isGlobal } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { Frame } from "../frame-interfaces/frame";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
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
      [classKeyword, (_parent: Parent) => this.file.createConcreteClass()],
      [abstractKeyword, (_parent: Parent) => this.file.createAbstractClass()],
      [interfaceKeyword, (_parent: Parent) => this.file.createInterface()],
      ["comment", (_parent: Parent) => this.file.createGlobalComment()],
      [commentMarker, (_parent: Parent) => this.file.createGlobalComment()],
    ];
  }

  profileAllows(keyword: string): boolean {
    return keyword !== commentMarker && keyword !== recordKeyword;
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

  outerHtmlTag: string = "el-global";

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

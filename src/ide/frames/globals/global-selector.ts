import {
  abstractKeyword,
  classKeyword,
  constantKeyword,
  enumKeyword,
  functionKeyword,
  interfaceKeyword,
  mainKeyword,
  procedureKeyword,
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

  defaultOptions(): [string, string, (parent: Parent) => Frame][] {
    return [
      [mainKeyword, "<b>m</b>ain", (_parent: Parent) => this.file.createMain()],
      [functionKeyword, "<b>f</b>unction", (_parent: Parent) => this.file.createFunction()],
      [testKeyword, "<b>t</b>est", (_parent: Parent) => this.file.createTest()],
      [procedureKeyword, "<b>p</b>rocedure", (_parent: Parent) => this.file.createProcedure()],
      [constantKeyword, "constant", (_parent: Parent) => this.file.createConstant()],
      [enumKeyword, "<b>e</b>num", (_parent: Parent) => this.file.createEnum()],
      [classKeyword, "class", (_parent: Parent) => this.file.createConcreteClass()],
      [
        abstractKeyword,
        "<b>a</b>bstract class",
        (_parent: Parent) => this.file.createAbstractClass(),
      ],
      [interfaceKeyword, "<b>i</b>nterface", (_parent: Parent) => this.file.createInterface()],
      [
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        (_parent: Parent) => this.file.createGlobalComment(),
      ],
    ];
  }

  profileAllows(keyword: string): boolean {
    return this.profile.globals.includes(keyword) || keyword === this.getCommentMarker();
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

import {
  abstractKeyword,
  classKeyword,
  constantKeyword,
  enumKeyword,
  functionKeyword,
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

  defaultOptions(): [string, string, string, (parent: Parent) => Frame, boolean][] {
    return [
      [mainKeyword, "m", "<b>m</b>ain routine", (_parent: Parent) => this.file.createMain(), true],
      [
        functionKeyword,
        "f",
        "<b>f</b>unction",
        (_parent: Parent) => this.file.createFunction(),
        true,
      ],
      [testKeyword, "t", "<b>t</b>est", (_parent: Parent) => this.file.createTest(), true],
      [
        procedureKeyword,
        "p",
        "<b>p</b>rocedure",
        (_parent: Parent) => this.file.createProcedure(),
        true,
      ],
      [
        constantKeyword,
        "k",
        "<b>k</b> constant",
        (_parent: Parent) => this.file.createConstant(),
        true,
      ],
      [enumKeyword, "e", "<b>e</b>num", (_parent: Parent) => this.file.createEnum(), true],
      [
        classKeyword,
        "c",
        "<b>c</b>oncrete class",
        (_parent: Parent) => this.file.createConcreteClass(),
        true,
      ],
      [
        abstractKeyword,
        "a",
        "<b>a</b>bstract class",
        (_parent: Parent) => this.file.createAbstractClass(),
        true,
      ],
      [
        this.getCommentMarker(),
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        (_parent: Parent) => this.file.createComment(),
        true,
      ],
    ];
  }

  paradigmAllows(_keyword: string): boolean {
    return true;
  }

  validWithinCurrentContext(keyword: string, userEntry: boolean): boolean {
    let result = true;
    // First apply universal instruction-specific rules
    if (keyword === mainKeyword && userEntry) {
      result = !this.file.containsMain();
    } else if (this.getParadigm().isProcedural() && userEntry) {
      result = keyword !== classKeyword && keyword !== abstractKeyword;
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

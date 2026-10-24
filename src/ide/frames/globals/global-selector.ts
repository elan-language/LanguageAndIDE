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
import { Frame } from "../frame-interfaces/frame";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
import { File } from "../frame-interfaces/file";

export class GlobalSelector extends AbstractSelector implements GlobalFrame {
  isGlobal = true;
  private file: File; // TODO get rid of this
  constructor(parent: Parent) {
    super(parent);
    this.file = parent.getFile();
  }

  override helpId(): string {
    return "GlobalInstructions";
  }

  defaultOptions(): [string, string, string, (parent: Parent) => Frame][] {
    return [
      [
        mainKeyword,
        "m",
        "<b>m</b>ain routine",
        (parent: Parent) => this.frameFactory.createMain(parent),
      ],
      [
        functionKeyword,
        "f",
        "<b>f</b>unction",
        (parent: Parent) => this.frameFactory.createFunction(parent),
      ],
      [testKeyword, "t", "<b>t</b>est", (parent: Parent) => this.frameFactory.createTest(parent)],
      [
        procedureKeyword,
        "p",
        "<b>p</b>rocedure",
        (parent: Parent) => this.frameFactory.createProcedure(parent),
      ],
      [
        constantKeyword,
        "k",
        "<b>k</b> constant",
        (parent: Parent) => this.frameFactory.createConstant(parent),
      ],
      [enumKeyword, "e", "<b>e</b>num", (parent: Parent) => this.frameFactory.createEnum(parent)],
      [
        classKeyword,
        "c",
        "<b>c</b>oncrete class",
        (parent: Parent) => this.frameFactory.createConcreteClass(parent),
      ],
      [
        abstractKeyword,
        "a",
        "<b>a</b>bstract class",
        (parent: Parent) => this.frameFactory.createAbstractClass(parent),
      ],
      [
        this.getCommentMarker(),
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        (parent: Parent) => this.frameFactory.createComment(parent),
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

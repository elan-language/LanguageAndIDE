import { AbstractSelector } from "../abstract-selector";
import { isGlobal } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { Frame } from "../frame-interfaces/frame";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
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

  defaultOptions(): [FrameType, string, string, (parent: Parent) => Frame, boolean][] {
    return [
      [
        FrameType.mainRoutine,
        "m",
        "<b>m</b>ain routine",
        (_parent: Parent) => this.file.createMain(),
        true,
      ],
      [
        FrameType.globalFunction,
        "f",
        "<b>f</b>unction",
        (_parent: Parent) => this.file.createFunction(),
        true,
      ],
      [FrameType.test, "t", "<b>t</b>est", (_parent: Parent) => this.file.createTest(), true],
      [
        FrameType.globalProcedure,
        "p",
        "<b>p</b>rocedure",
        (_parent: Parent) => this.file.createProcedure(),
        true,
      ],
      [
        FrameType.constant,
        "k",
        "<b>k</b> constant",
        (_parent: Parent) => this.file.createConstant(),
        true,
      ],
      [FrameType.enum, "e", "<b>e</b>num", (_parent: Parent) => this.file.createEnum(), true],
      [
        FrameType.concreteClass,
        "c",
        "<b>c</b>oncrete class",
        (_parent: Parent) => this.file.createConcreteClass(),
        true,
      ],
      [
        FrameType.abstractClass,
        "a",
        "<b>a</b>bstract class",
        (_parent: Parent) => this.file.createAbstractClass(),
        true,
      ],
      [
        FrameType.commentFrame,
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        (_parent: Parent) => this.file.createComment(),
        true,
      ],
    ];
  }

  validWithinCurrentContext(type: FrameType, userEntry: boolean): boolean {
    let result = true;
    if (type === FrameType.mainRoutine && userEntry) {
      result = !this.file.containsMain();
    } else if (this.getParadigm().isProcedural() && userEntry) {
      result = type !== FrameType.abstractClass && type !== FrameType.concreteClass;
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

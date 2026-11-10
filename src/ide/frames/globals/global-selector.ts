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

  defaultOptions(): [FrameType, string, string, boolean][] {
    return [
      [FrameType.mainRoutine, "m", "<b>m</b>ain routine", true],
      [FrameType.globalFunction, "f", "<b>f</b>unction", true],
      [FrameType.test, "t", "<b>t</b>est", true],
      [FrameType.globalProcedure, "p", "<b>p</b>rocedure", true],
      [FrameType.constant, "k", "<b>k</b> constant", true],
      [FrameType.enum, "e", "<b>e</b>num", true],
      [FrameType.concreteClass, "c", "<b>c</b>oncrete class", true],
      [FrameType.abstractClass, "a", "<b>a</b>bstract class", true],
      [
        FrameType.commentFrame,
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
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

  createFrame(type: FrameType, _parent: Parent): Frame {
    return this.file.createGlobalFrame(type);
  }
}

import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";

export class MainRoutine extends FrameWithStatements implements GlobalFrame {
  frameType: FrameType = FrameType.mainRoutine;
  isMain = true;
  isGlobal = true;
  file: File;
  constructor(parent: File) {
    super(parent);
    this.file = parent;
  }

  helpId(): string {
    return "main";
  }

  getFields(): Field[] {
    return []; //no direct fields
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_main`;
  }

  get symbolId() {
    return "__main";
  }

  override outerHtmlTag: string = "el-main";

  indent(): string {
    return "";
  }
}

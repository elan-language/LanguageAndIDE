import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
import { FunctionFrame } from "./function-frame";
import { File } from "../frame-interfaces/file";
import { FrameType } from "../frame-type";

export class GlobalFunction extends FunctionFrame implements GlobalFrame {
  frameType: FrameType = FrameType.globalFunction;
  isGlobal = true;
  file: File;
  constructor(parent: Parent) {
    super(parent);
    this.file = parent as File;
  }

  indent(): string {
    return "";
  }

  helpId(): string {
    return "function";
  }
}

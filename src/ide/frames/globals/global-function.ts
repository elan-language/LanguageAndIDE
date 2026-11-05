import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
import { FunctionFrame } from "./function-frame";
import { File } from "../frame-interfaces/file";

export class GlobalFunction extends FunctionFrame implements GlobalFrame {
  isGlobal = true;
  file: File;
  constructor(parent: Parent) {
    super(parent);
    this.file = parent as File;
  }

  indent(): string {
    return "";
  }
}

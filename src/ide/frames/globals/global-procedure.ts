import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
import { ProcedureFrame } from "./procedure-frame";

export class GlobalProcedure extends ProcedureFrame implements GlobalFrame {
  isGlobal = true;
  constructor(parent: Parent) {
    super(parent);
  }

  indent(): string {
    return "";
  }
}

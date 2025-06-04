import { GlobalFrame } from "../interfaces/global-frame";
import { Parent } from "../interfaces/parent";
import { ProcedureFrame } from "./procedure-frame";

export class GlobalProcedure extends ProcedureFrame implements GlobalFrame {
  isGlobal = true;
  hrefForFrameHelp: string = "LangRef.html#procedure";

  constructor(parent: Parent) {
    super(parent);
  }

  indent(): string {
    return "";
  }

  public renderAsSource(): string {
    return `procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
end procedure\r
`;
  }
}

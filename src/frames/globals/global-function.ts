import { GlobalFrame } from "../interfaces/global-frame";
import { Parent } from "../interfaces/parent";
import { endKeyword, functionKeyword, returnsKeyword } from "../keywords";
import { FunctionFrame } from "./function-frame";

export class GlobalFunction extends FunctionFrame implements GlobalFrame {
  isGlobal = true;
  constructor(parent: Parent) {
    super(parent);
  }

  indent(): string {
    return "";
  }

  public renderAsSource(): string {
    return `${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${returnsKeyword} ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${endKeyword} ${functionKeyword}\r
`;
  }
}

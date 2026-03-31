import { endKeyword, functionKeyword, returnsKeyword } from "../../../compiler/elan-keywords";
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

  public renderAsElanSource(): string {
    return `${this.sourceAnnotations()}${functionKeyword} ${this.name.renderAsElanSource()}(${this.params.renderAsElanSource()}) ${returnsKeyword} ${this.returnType.renderAsElanSource()}\r
${this.renderChildrenAsElanSource()}\r
${endKeyword} ${functionKeyword}\r
`;
  }
}

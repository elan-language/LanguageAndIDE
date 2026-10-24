import { endKeyword, functionKeyword, returnsKeyword } from "../../../compiler/elan-keywords";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
import { FunctionFrame } from "./function-frame";
import { File } from "../frame-interfaces/file";
import { AbstractSelector } from "../abstract-selector";
import { StatementSelector } from "../statements/statement-selector";

export class GlobalFunction extends FunctionFrame implements GlobalFrame {
  isGlobal = true;
  file: File;
  constructor(parent: Parent) {
    super(parent);
    this.file = parent.getFile();
  }

  newChildSelector(): AbstractSelector {
    return new StatementSelector(this);
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

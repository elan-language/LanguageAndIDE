import { defKeyword, procedureAnnotation } from "../../../compiler/keywords";
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

  override annotation(): string {
    return `${procedureAnnotation} `;
  }
  public renderAsSource(): string {
    return `${this.sourceAnnotations()}${defKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) -> None: ${this.annotationAsSource()}\r
${this.renderChildrenAsSource()}\r

`;
  }
}

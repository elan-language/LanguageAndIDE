import { defKeyword, functionAnnotation } from "../../../compiler/keywords";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
import { FunctionFrame } from "./function-frame";

export class GlobalFunction extends FunctionFrame implements GlobalFrame {
  isGlobal = true;
  constructor(parent: Parent) {
    super(parent);
  }

  indent(): string {
    return "";
  }

  override annotation(): string {
    return `${functionAnnotation} `;
  }
  public renderAsSource(): string {
    return `${this.sourceAnnotations()}${defKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) -> ${this.returnType.renderAsSource()}: ${this.annotationAsSource()}\r
${this.renderChildrenAsSource()}\r

`;
  }
}

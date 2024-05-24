import { Parent } from "../interfaces/parent";
import { GlobalFrame } from "../interfaces/global-frame";
import { FunctionFrame } from "./function-frame";
import { functionKeyword, returnKeyword, endKeyword } from "../keywords";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { Transforms } from "../syntax-nodes/transforms";

export class GlobalFunction extends FunctionFrame implements GlobalFrame {
  isGlobal = true;

  constructor(parent: Parent) {
    super(parent);
  }

  indent(): string {
    return "";
  }

  public renderAsSource(): string {
    return `${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${returnKeyword} ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${endKeyword} ${functionKeyword}\r
`;
  }

  public compile(transforms: Transforms): string {
    return `function ${super.compile(transforms)}\r
}
`;
  }
}

import { Parent } from "../interfaces/parent";
import { ProcedureFrame } from "./procedure-frame";
import { GlobalFrame as GlobalFrame } from "../interfaces/global-frame";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../symbols/symbol-scope";

export class GlobalProcedure extends ProcedureFrame implements GlobalFrame {
  isGlobal = true;

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

  public compile(transforms: Transforms): string {
    return `async function ${super.compile(transforms)}\r
}
`;
  }

  symbolScope = SymbolScope.program;
}

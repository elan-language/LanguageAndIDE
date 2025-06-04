import { GlobalFrame } from "../interfaces/global-frame";
import { Parent } from "../interfaces/parent";
import { Transforms } from "../interfaces/transforms";
import { SymbolScope } from "../symbols/symbol-scope";
import { ProcedureFrame } from "./procedure-frame";

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
    this.compileErrors = [];
    const name = this.name.compile(transforms);
    return `async function ${super.compile(transforms)}\r
}
global["${name}"] = ${name};
`;
  }

  symbolScope = SymbolScope.program;
}

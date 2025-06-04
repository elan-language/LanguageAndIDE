import {
  mustBeAssignableType,
  mustBeKnownSymbolType,
  mustBeUniqueNameInScope,
} from "../compile-rules";
import { GlobalFrame } from "../interfaces/global-frame";
import { Parent } from "../interfaces/parent";
import { Transforms } from "../interfaces/transforms";
import { endKeyword, functionKeyword, returnsKeyword } from "../keywords";
import { getGlobalScope } from "../symbols/symbol-helpers";
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

  public compile(transforms: Transforms): string {
    this.compileErrors = [];
    const name = this.name.compile(transforms);
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms,
      this.compileErrors,
      this.htmlId,
    );

    this.returnType.compile(transforms);

    const rt = this.symbolType(transforms).returnType;

    mustBeKnownSymbolType(rt, this.returnType.renderAsSource(), this.compileErrors, this.htmlId);

    const returnStatement = this.getReturnStatement().expr.getOrTransformAstNode(transforms);
    const rst = returnStatement.symbolType();

    mustBeAssignableType(rt, rst, this.compileErrors, this.htmlId);

    return `async function ${super.compile(transforms)}\r
}
global["${name}"] = ${name};
`;
  }
}

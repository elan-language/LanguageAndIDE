import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { ConstantFrameAsn } from "./globals/constant-asn";
import { EnumFrameAsn } from "./globals/enum-asn";
import { MainFrameAsn } from "./globals/main-asn";
import { TestFrameAsn } from "./globals/test-asn";

export class FileAsn extends AbstractAstNode implements AstNode {
  constructor(
    private children: AstNode[],
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  hasTests: boolean = false;

  symbolType(): SymbolType {
    throw new Error("Method not implemented.");
  }

  compileGlobals(): string {
    let result = "";
    if (this.children.length > 0) {
      const ss: Array<string> = [];
      for (const frame of this.children.filter((g) => g instanceof EnumFrameAsn)) {
        ss.push(frame.compile());
      }

      const constants = this.children.filter((g) => g instanceof ConstantFrameAsn);

      if (constants.length > 0) {
        ss.push("const global = new class {");
        for (const frame of constants) {
          ss.push(`  ${frame.compile()}`);
        }
        ss.push("};");
      } else {
        ss.push("const global = new class {};");
      }

      for (const frame of this.children.filter(
        (g) => !(g instanceof EnumFrameAsn || g instanceof ConstantFrameAsn),
      )) {
        ss.push(frame.compile());
      }

      if (!this.children.some((g) => g instanceof MainFrameAsn)) {
        const emptyMain = new MainFrameAsn([], this.fieldId, this.scope);
        ss.push(emptyMain.compile());
      }

      result = ss.join("\r\n");

      this.hasTests = this.children.some((g) => g instanceof TestFrameAsn);
    }
    return result;
  }

  compile(): string {
    const stdlib = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {`;
    return `${stdlib}\n${this.compileGlobals()}return [main, _tests];}`;
  }

  aggregateCompileErrors(): CompileError[] {
    throw new Error("Method not implemented.");
  }
}

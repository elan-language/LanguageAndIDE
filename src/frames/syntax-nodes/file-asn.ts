import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { elanSymbols } from "../symbols/elan-symbols";
import { isSymbol, symbolMatches } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { ConstantFrameAsn } from "./globals/constant-asn";
import { EnumFrameAsn } from "./globals/enum-asn";
import { MainFrameAsn } from "./globals/main-asn";
import { TestFrameAsn } from "./globals/test-asn";

export class FileAsn extends AbstractAstNode implements AstNode, Scope {
  constructor(private scope: Scope) {
    super();
  }

  getParentScope(): Scope {
    return this.scope;
  }

  symbolMatches(id: string, all: boolean): ElanSymbol[] {
    const languageMatches = symbolMatches(id, all, elanSymbols);
    const libMatches = this.scope.symbolMatches(id, all, this);
    const globalSymbols = this.children.filter((c) => isSymbol(c)) as ElanSymbol[];
    const matches = symbolMatches(id, all, globalSymbols);

    return languageMatches.concat(matches).concat(libMatches);
  }

  fieldId: string = "";

  children: AstNode[] = [];

  hasTests: boolean = false;

  symbolType(): SymbolType {
    return UnknownType.Instance;
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
        const emptyMain = new MainFrameAsn(this.fieldId, this.scope);
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

  resolveSymbol(id: string, transforms: Transforms, _initialScope: Scope): ElanSymbol {
    //unknown because of typescript quirk
    const globalSymbols = (this.children.filter((c) => isSymbol(c)) as ElanSymbol[]).concat(
      elanSymbols,
    );
    const matches = globalSymbols.filter((s) => s.symbolId === id);

    if (matches.length === 1) {
      return matches[0];
    }
    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return this.scope.resolveSymbol(id, transforms, this);
  }
}

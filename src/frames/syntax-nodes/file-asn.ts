import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { RootAstNode } from "../interfaces/root-ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { elanSymbols } from "../symbols/elan-symbols";
import { isSymbol, symbolMatches } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { ConstantAsn } from "./globals/constant-asn";
import { EnumAsn } from "./globals/enum-asn";
import { MainAsn } from "./globals/main-asn";
import { TestAsn } from "./globals/test-asn";

export class FileAsn extends AbstractAstNode implements RootAstNode, Scope {
  isFile = true;

  constructor(private scope: Scope) {
    super();
  }

  get libraryScope() {
    return this.scope;
  }

  compileErrorMap = new Map<string, CompileError[]>();

  addCompileError(error: CompileError) {
    if (this.compileErrorMap.has(error.locationId)) {
      this.compileErrorMap.get(error.locationId)?.push(error);
    } else {
      this.compileErrorMap.set(error.locationId, [error]);
    }
  }

  addCompileErrors(errors: CompileError[]) {
    for (const error of errors) {
      this.addCompileError(error);
    }
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
      for (const frame of this.children.filter((g) => g instanceof EnumAsn)) {
        ss.push(frame.compile());
      }

      const constants = this.children.filter((g) => g instanceof ConstantAsn);

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
        (g) => !(g instanceof EnumAsn || g instanceof ConstantAsn),
      )) {
        ss.push(frame.compile());
      }

      if (!this.children.some((g) => g instanceof MainAsn)) {
        const emptyMain = new MainAsn(this.fieldId, this.scope);
        ss.push(emptyMain.compile());
      }

      result = ss.join("\r\n");

      this.hasTests = this.children.some((g) => g instanceof TestAsn);
    }
    return result;
  }

  compile(): string {
    const stdlib = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {`;
    return `${stdlib}\n${this.compileGlobals()}return [main, _tests];}`;
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

import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler/compiler-interfaces/elan-symbol";
import { CompileMode, RootAstNode } from "../../compiler/compiler-interfaces/root-ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { Semver } from "../../compiler/compiler-interfaces/semver";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { DuplicateSymbol } from "../../compiler/symbols/duplicate-symbol";
import { elanSymbols } from "../../compiler/symbols/elan-symbols";
import { NullScope } from "../../compiler/symbols/null-scope";
import { isSymbol, symbolMatches } from "../../compiler/symbols/symbol-helpers";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import { BreakpointEvent } from "../../frames/status-enums";
import { CompileError } from "../compile-error";
import { AbstractAstNode } from "./abstract-ast-node";
import { FrameAsn } from "./frame-asn";
import { ConstantAsn } from "./globals/constant-asn";
import { EnumAsn } from "./globals/enum-asn";
import { MainAsn } from "./globals/main-asn";
import { TestAsn } from "./globals/test-asn";

export class FileAsn extends AbstractAstNode implements RootAstNode, Scope {
  isFile = true;
  private _nextId: number = 0;
  private mode: CompileMode = CompileMode.inprocess;
  private base: string | undefined;

  compileErrorMap = new Map<string, CompileError[]>();
  scopeMap = new Map<string, Scope>();

  constructor(
    private scope: Scope,
    private version: Semver,
  ) {
    super();
  }

  getScopeById(id: string): Scope {
    if (this.scopeMap.has(id)) {
      return this.scopeMap.get(id)!;
    }
    return NullScope.Instance;
  }

  setScopeById(id: string, scope: Scope) {
    this.scopeMap.set(id, scope);
  }

  setCompileOptions(mode: CompileMode, base: string | undefined): void {
    this.mode = mode;
    this.base = base;
  }

  getAllCompileErrors(): CompileError[] {
    let all: CompileError[] = [];

    for (const e of this.compileErrorMap.values()) {
      all = all.concat(e);
    }

    return all;
  }

  getNextId() {
    return this._nextId++;
  }

  getCompileErrorsFor(fieldId: string): CompileError[] {
    if (this.compileErrorMap.has(fieldId)) {
      return this.compileErrorMap.get(fieldId)!;
    }
    return [];
  }

  get libraryScope() {
    return this.scope;
  }

  getVersion(): Semver {
    return this.version;
  }

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
      const emptyMain = new MainAsn(this.fieldId, this);
      ss.push(emptyMain.compile());
    }

    result = ss.join("\r\n");

    this.hasTests = this.children.some((g) => g instanceof TestAsn);

    return result;
  }

  updateBreakpoints(event: BreakpointEvent) {
    for (const frame of this.children.filter((f) => f instanceof FrameAsn)) {
      frame.updateBreakpoints(event);
    }
  }

  compileAsTestWorker(base: string): string {
    this.updateBreakpoints(BreakpointEvent.disable);
    const onmsg = `onmessage = async (e) => {
    if (e.data.type === "start") {
      try {
        const [main, tests] = await program();
        const outcomes = await system.runTests(tests);
        postMessage({type : "test", value : outcomes});
      }
      catch (e) {
        postMessage({type : "status", status : "error", error : e});
      }
    }
  };`;

    const stdlib = `import { StdLib } from "${base}/elan-api.js"; let system; let _stdlib; let _tests = []; async function program() { _stdlib = new StdLib(); system = _stdlib.system; system.stdlib = _stdlib  `;
    return `${stdlib}\n${this.compileGlobals()}return [main, _tests];}\n${onmsg}`;
  }

  compileAsWorker(base: string, debugMode: boolean, standalone: boolean): string {
    this.updateBreakpoints(debugMode ? BreakpointEvent.activate : BreakpointEvent.disable);
    const onmsg = `addEventListener("message", async (e) => {
  if (e.data.type === "start") {
    try {
      const [main, tests] = await program();
      await main();
      postMessage({type : "status", status : "finished"});
    }
    catch (e) {
      postMessage({type : "status", status : "error", error : e});
    }
  }
  if (e.data.type === "pause") {
    __pause = true;
  }
  });`;

    const imp = standalone ? "" : `import { StdLib } from "${base}/elan-api.js"; `;
    const stdlib = `${imp}let system; let _stdlib; let _tests = []; let __pause = false; async function program() { _stdlib = new StdLib(); system = _stdlib.system; system.stdlib = _stdlib  `;
    return `${stdlib}\n${this.compileGlobals()}return [main, _tests];}\n${onmsg}`;
  }

  compile(): string {
    if (this.mode === CompileMode.inprocess) {
      const stdlib = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {`;
      return `${stdlib}\n${this.compileGlobals()}return [main, _tests];}`;
    }
    if (this.mode === CompileMode.worker) {
      return this.compileAsWorker(this.base!, false, false);
    }
    if (this.mode === CompileMode.debugWorker) {
      return this.compileAsWorker(this.base!, true, false);
    }
    if (this.mode === CompileMode.standaloneWorker) {
      return this.compileAsWorker(this.base!, false, true);
    }
    if (this.mode === CompileMode.testWorker) {
      return this.compileAsTestWorker(this.base!);
    }

    return "";
  }

  resolveSymbol(id: string, _initialScope: Scope): ElanSymbol {
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

    return this.scope.resolveSymbol(id, this);
  }
}

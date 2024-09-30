import { AbstractSelector } from "./abstract-selector";
import { CompileError } from "./compile-error";
import { AstNode } from "./interfaces/ast-node";
import { AstTypeNode } from "./interfaces/ast-type-node";
import { Class } from "./interfaces/class";
import { Collapsible } from "./interfaces/collapsible";
import { ElanSymbol } from "./interfaces/elan-symbol";
import { Field } from "./interfaces/field";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { GlobalFrame } from "./interfaces/global-frame";
import { Member } from "./interfaces/member";
import { Parent } from "./interfaces/parent";
import { Scope } from "./interfaces/scope";
import { Selectable } from "./interfaces/selectable";
import { SymbolType } from "./interfaces/symbol-type";
import { CompileStatus, DisplayStatus, ParseStatus, RunStatus, TestStatus } from "./status-enums";
import { ArrayType } from "./symbols/array-list-type";
import { DeconstructedListType } from "./symbols/deconstructed-list-type";
import { DeconstructedTupleType } from "./symbols/deconstructed-tuple-type";
import { ListType } from "./symbols/list-type";
import { TupleType } from "./symbols/tuple-type";

export function isCollapsible(f?: Selectable): f is Collapsible {
  return !!f && "isCollapsible" in f;
}

export function isFile(f?: Scope): f is File {
  return !!f && "isFile" in f;
}

export function isClass(f?: ElanSymbol | Scope): f is Class {
  return !!f && "isClass" in f;
}

export function isFrame(f?: Selectable | Scope): f is Frame {
  return !!f && "isFrame" in f;
}

export function isFrameWithStatements(f?: Selectable | Parent): f is Parent {
  return !!f && "isFrameWithStatements" in f;
}

export function isParent(f?: Selectable | Parent): f is Parent {
  return !!f && "isParent" in f;
}

export function isMember(f?: Scope | Member | ElanSymbol): f is Member {
  return !!f && "isMember" in f;
}

export function isFunction(f?: Scope | Member | ElanSymbol): f is Member {
  return !!f && "isFunction" in f;
}

export function isConstructor(f?: Scope | Member): f is Member {
  return !!f && "isConstructor" in f;
}

export function isSelector(f?: Selectable): f is AbstractSelector {
  return !!f && "isSelector" in f;
}

export function isGlobal(f?: Selectable | GlobalFrame): f is GlobalFrame {
  return !!f && "isGlobal" in f;
}

export function isScope(f?: ElanSymbol | Scope): f is Scope {
  return !!f && "resolveSymbol" in f && "getParentScope" in f;
}

export function isAstType(f?: AstNode): f is AstTypeNode {
  return !!f && "compileToEmptyObjectCode" in f;
}

export function singleIndent() {
  return "  ";
}

export function expandCollapseAll(file: File) {
  const map = file.getMap();
  const collapsible = [...map.values()]
    .filter((s) => isCollapsible(s))
    .map((s) => s as Collapsible);
  const firstCollapsibleGlobal = collapsible.filter((s) => isGlobal(s))[0];
  let collapse = true;
  if (firstCollapsibleGlobal && firstCollapsibleGlobal.isCollapsed()) {
    collapse = false;
  }
  for (const c of collapsible) {
    if (collapse) {
      c.collapse();
    } else {
      c.expand();
    }
  }
  const globals = [...map.values()].filter((s) => isGlobal(s));
  const selectedGlobals = globals.filter((s) => s.isSelected());
  if (selectedGlobals.length === 0) {
    file.getFirstChild().select(true, false);
  }
}
export function escapeAngleBrackets(str: string): string {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function helper_compileMsgAsHtml(loc: Frame | Field): string {
  let msg = "";
  const first = loc.compileErrors[0];
  const n = loc.compileErrors.length;
  if (n > 0) {
    const highest = loc.compileErrors.reduce(
      (prev, curr) => (curr.priority < prev.priority ? curr : prev),
      first,
    );
    msg = highest.message;
  }
  let cls = "";
  const compile = helper_compileStatusAsDisplayStatus(loc.readCompileStatus());
  if (compile === DisplayStatus.error || compile === DisplayStatus.warning) {
    cls = DisplayStatus[compile];
  }
  const toDisplay = escapeAngleBrackets(msg);
  return cls === "" ? "<msg></msg>" : ` <msg class="${cls}">${toDisplay}</msg>`;
}

export function helper_deriveCompileStatusFromErrors(errors: CompileError[]): CompileStatus {
  let result = CompileStatus.error;
  if (errors.length === 0) {
    result = CompileStatus.ok;
  } else {
    result = errors.some((e) => !e.unknownType) ? CompileStatus.error : CompileStatus.unknownSymbol;
  }
  return result;
}

export function helper_CompileOrParseAsDisplayStatus(loc: Frame | Field): DisplayStatus {
  let status = helper_parseStatusAsDisplayStatus(loc.readParseStatus());
  if (status === DisplayStatus.ok) {
    const compile = helper_compileStatusAsDisplayStatus(loc.readCompileStatus());
    if (compile !== DisplayStatus.default) {
      // Implies that the compiler has not been run
      status = compile;
    }
  }
  return status;
}

export function helper_parseStatusAsDisplayStatus(ps: ParseStatus): DisplayStatus {
  let overall = DisplayStatus.default;
  if (ps === ParseStatus.valid) {
    overall = DisplayStatus.ok;
  } else if (ps === ParseStatus.incomplete) {
    overall = DisplayStatus.warning;
  } else if (ps === ParseStatus.invalid) {
    overall = DisplayStatus.error;
  }
  return overall;
}

export function helper_compileStatusAsDisplayStatus(cs: CompileStatus): DisplayStatus {
  let overall = DisplayStatus.default;
  if (cs === CompileStatus.ok) {
    overall = DisplayStatus.ok;
  } else if (cs === CompileStatus.unknownSymbol) {
    overall = DisplayStatus.warning;
  } else if (cs === CompileStatus.error) {
    overall = DisplayStatus.error;
  }
  return overall;
}

export function helper_testStatusAsDisplayStatus(ts: TestStatus): DisplayStatus {
  let overall = DisplayStatus.default;
  if (ts === TestStatus.pass) {
    overall = DisplayStatus.ok;
  } else if (ts === TestStatus.pending) {
    overall = DisplayStatus.warning;
  } else if (ts === TestStatus.fail || ts === TestStatus.error) {
    overall = DisplayStatus.error;
  }
  return overall;
}

export function helper_runStatusAsDisplayStatus(rs: RunStatus): DisplayStatus {
  let overall = DisplayStatus.default;
  if (rs === RunStatus.running) {
    overall = DisplayStatus.ok;
  } else if (rs === RunStatus.paused) {
    overall = DisplayStatus.warning;
  } else if (rs === RunStatus.error) {
    overall = DisplayStatus.error;
  }
  return overall;
}

export function isInsideFunctionOrConstructor(parent: Parent): boolean {
  if (isFunction(parent)) {
    return true;
  }
  if (isConstructor(parent)) {
    return true;
  }
  if (isFile(parent)) {
    return false;
  }
  return isInsideFunctionOrConstructor(parent.getParent());
}

export function mapSymbolType(ids: string[], st: SymbolType) {
  if (ids.length > 1 && st instanceof TupleType) {
    return new DeconstructedTupleType(ids, st.ofTypes);
  }
  if (ids.length === 2 && (st instanceof ArrayType || st instanceof ListType)) {
    return new DeconstructedListType(ids[0], ids[1], st.ofType, st);
  }

  return st;
}

export function mapIds(ids: string[]) {
  return ids.length > 1 ? `[${ids.join(", ")}]` : ids[0];
}

import { AbstractSelector } from "./abstract-selector";
import { CompileError, Severity } from "./compile-error";
import { MainFrame } from "./globals/main-frame";
import { AstNode } from "./interfaces/ast-node";
import { AstTypeNode } from "./interfaces/ast-type-node";
import { Class } from "./interfaces/class";
import { Collapsible } from "./interfaces/collapsible";
import { editorEvent } from "./interfaces/editor-event";
import { ElanSymbol } from "./interfaces/elan-symbol";
import { Field } from "./interfaces/field";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { GlobalFrame } from "./interfaces/global-frame";
import { Member } from "./interfaces/member";
import { Parent } from "./interfaces/parent";
import { PossiblyPrivateMember } from "./interfaces/possibly-private-member";
import { Scope } from "./interfaces/scope";
import { Selectable } from "./interfaces/selectable";
import { Statement } from "./interfaces/statement";
import { SymbolType } from "./interfaces/symbol-type";
import { isRecord } from "./interfaces/type-options";
import { ReturnStatement } from "./statements/return-statement";
import { CompileStatus, DisplayColour, ParseStatus, RunStatus, TestStatus } from "./status-enums";
import { ClassType } from "./symbols/class-type";
import { DeconstructedListType } from "./symbols/deconstructed-list-type";
import { DeconstructedRecordType } from "./symbols/deconstructed-record-type";
import { DeconstructedTupleType } from "./symbols/deconstructed-tuple-type";
import { TupleType } from "./symbols/tuple-type";

export function isCollapsible(f?: Selectable): f is Collapsible {
  return !!f && "isCollapsible" in f;
}

export function isFile(f?: Scope): f is File {
  return !!f && "isFile" in f;
}

export function isMain(f?: Scope): f is MainFrame {
  return !!f && "isMain" in f;
}

export function isClass(f?: ElanSymbol | Scope): f is Class {
  return !!f && "isClass" in f;
}

export function isGenericClass(f?: ElanSymbol | Scope): f is Class {
  return isClass(f) && f.ofTypes?.length > 0;
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

export function isConstant(f?: Scope | ElanSymbol): f is ElanSymbol {
  return !!f && "isConstant" in f;
}

export function isFunction(f?: Scope | Member | ElanSymbol): f is Member {
  return !!f && "isFunction" in f;
}

export function isProcedure(f?: Scope | Member | ElanSymbol): f is Member {
  return !!f && "isProcedure" in f;
}

export function isLet(f?: ElanSymbol | Statement): f is Statement {
  return !!f && "isLet" in f;
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

export function isReturnStatement(f?: Scope): f is ReturnStatement {
  return !!f && "isReturnStatement" in f;
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
export function escapeHtmlChars(str: string): string {
  return str.replaceAll(/&/g, "&amp;").replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;");
}

export function escapeHtmlInclSpaces(str: string): string {
  return escapeHtmlChars(str).replaceAll(/\s/g, "&nbsp;");
}

export function helper_pastePopUp(loc: Frame | Field): string {
  let popup = "";
  if (isFrame(loc) && loc.pasteError) {
    popup = `<div class="context-menu"><div>${loc.pasteError}</div></div>`;
    loc.pasteError = "";
  }
  return popup;
}

export function helper_compileMsgAsHtml(loc: Frame | Field): string {
  let msg = "";
  let link = "";
  const first = loc.compileErrors[0];
  const n = loc.compileErrors.length;
  if (n > 0) {
    const highest = loc.compileErrors.reduce(
      (prev, curr) => (curr.priority < prev.priority ? curr : prev),
      first,
    );
    msg = highest.message;
    link = highest.link ?? "";
  }
  let cls = "";
  const compile = helper_compileStatusAsDisplayStatus(loc.readCompileStatus());
  if (compile === DisplayColour.error || compile === DisplayColour.warning) {
    cls = DisplayColour[compile];
  }
  if (link) {
    cls = cls + " error-link";
  }

  const popUp = helper_pastePopUp(loc);

  const toDisplay = escapeHtmlChars(msg);
  const href = link ? ` data-href="${link}"` : "";
  return cls === ""
    ? `<el-msg></el-msg>${popUp}`
    : ` <el-msg class="${cls}"${href}>${toDisplay}</el-msg>${popUp}`;
}

export function helper_compileMsgAsHtmlNew(file: File, loc: Frame | Field): string {
  let msg = "";
  let link = "";
  const compileErrors = file.getAst(false)?.getCompileErrorsFor(loc.getHtmlId()) ?? [];
  const n = compileErrors.length;
  if (n > 0) {
    const first = compileErrors[0];
    const highest = compileErrors.reduce(
      (prev, curr) => (curr.priority < prev.priority ? curr : prev),
      first,
    );
    msg = highest.message;
    link = highest.link ?? "";
  }
  let cls = "";
  const compile = helper_compileStatusAsDisplayStatus(loc.readCompileStatus());
  if (compile === DisplayColour.error || compile === DisplayColour.warning) {
    cls = DisplayColour[compile];
  }
  if (link) {
    cls = cls + " error-link";
  }

  const popUp = helper_pastePopUp(loc);

  const toDisplay = escapeHtmlChars(msg);
  const href = link ? ` data-href="${link}"` : "";
  return cls === ""
    ? `<el-msg></el-msg>${popUp}`
    : ` <el-msg class="${cls}"${href}>${toDisplay}</el-msg>${popUp}`;
}

export function helper_deriveCompileStatusFromErrors(errors: CompileError[]): CompileStatus {
  let result = CompileStatus.error;
  if (errors.length === 0) {
    result = CompileStatus.ok;
  } else {
    result = errors.some((e) => e.severity === Severity.error)
      ? CompileStatus.error
      : CompileStatus.unknown_symbol;
  }
  return result;
}

export function helper_CompileOrParseAsDisplayStatus(loc: Frame | Field): DisplayColour {
  let status = helper_parseStatusAsDisplayStatus(loc.readParseStatus());
  if (status === DisplayColour.ok) {
    const compile = helper_compileStatusAsDisplayStatus(loc.readCompileStatus());
    if (compile !== DisplayColour.none) {
      // Implies that the compiler has not been run
      status = compile;
    }
  }
  return status;
}

export function helper_parseStatusAsDisplayStatus(ps: ParseStatus): DisplayColour {
  let overall = DisplayColour.none;
  if (ps === ParseStatus.valid) {
    overall = DisplayColour.ok;
  } else if (ps === ParseStatus.incomplete) {
    overall = DisplayColour.warning;
  } else if (ps === ParseStatus.invalid) {
    overall = DisplayColour.error;
  }
  return overall;
}

export function helper_compileStatusAsDisplayStatus(cs: CompileStatus): DisplayColour {
  let overall = DisplayColour.none;
  if (cs === CompileStatus.ok) {
    overall = DisplayColour.ok;
  } else if (cs === CompileStatus.unknown_symbol) {
    overall = DisplayColour.warning;
  } else if (cs === CompileStatus.error) {
    overall = DisplayColour.error;
  }
  return overall;
}

export function helper_testStatusAsDisplayStatus(ts: TestStatus): DisplayColour {
  let overall = DisplayColour.none;
  if (ts === TestStatus.pass) {
    overall = DisplayColour.ok;
  } else if (ts === TestStatus.running || ts === TestStatus.ignored) {
    overall = DisplayColour.warning;
  } else if (ts === TestStatus.fail || ts === TestStatus.error) {
    overall = DisplayColour.error;
  }
  return overall;
}

export function helper_runStatusAsDisplayStatus(rs: RunStatus): DisplayColour {
  let overall = DisplayColour.none;
  if (rs === RunStatus.running) {
    overall = DisplayColour.ok;
  } else if (rs === RunStatus.paused) {
    overall = DisplayColour.warning;
  } else if (rs === RunStatus.error) {
    overall = DisplayColour.error;
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

export function isInsideFunction(parent: Parent): boolean {
  if (isFunction(parent)) {
    return true;
  }
  if (isFile(parent)) {
    return false;
  }
  return isInsideFunction(parent.getParent());
}

export function mapSymbolType(ids: string[], st: SymbolType) {
  if (ids.length > 1 && st instanceof TupleType) {
    return new DeconstructedTupleType(ids, st.ofTypes);
  }

  if (ids.length > 1 && st instanceof ClassType && isRecord(st.typeOptions)) {
    return new DeconstructedRecordType(ids, st.scope as Class);
  }

  if (ids.length === 2 && st instanceof ClassType && st.typeOptions.isIterable) {
    return new DeconstructedListType(ids[0], ids[1], st.ofTypes[0], st);
  }

  return st;
}

export function mapIds(ids: string[]) {
  return ids.length > 1 ? `[${ids.join(", ")}]` : ids[0];
}

export function currentParameterIndex(text: string) {
  if (text) {
    if (text.includes(",")) {
      const parameters = text.split(",");
      const count = parameters.length - 1;
      const startedInput = !!parameters[count].trim();
      return startedInput ? count + 1 : count;
    }

    return 1;
  }

  return 0;
}

export function processTogglePrivate(member: Member, e: editorEvent): boolean {
  let result = false;
  if (e.key === "p" && e.modKey.control) {
    member.private = !member.private;
    result = true;
  }
  return result;
}

export function addPrivateToggleToContextMenu(
  member: PossiblyPrivateMember,
  menu: Map<string, [string, (() => void) | undefined, string]>,
) {
  if (member.private) {
    menu.set("makePublic", ["make public (Ctrl-p)", member.makePublic, ""]);
  } else {
    menu.set("makePrivate", ["make private (Ctrl-p)", member.makePrivate, ""]);
  }
}

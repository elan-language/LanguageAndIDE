import { CompileError, Severity } from "../../compiler/compile-error";
import { TestStatus } from "../../compiler/test-status";
import { AbstractSelector } from "./abstract-selector";
import { Collapsible } from "./frame-interfaces/collapsible";
import { Comment } from "./frame-interfaces/comment";
import { Field } from "./frame-interfaces/field";
import { File } from "./frame-interfaces/file";
import { Frame } from "./frame-interfaces/frame";
import { GlobalFrame } from "./frame-interfaces/global-frame";
import { MemberFrame } from "./frame-interfaces/member-frame";
import { Parent } from "./frame-interfaces/parent";
import { PossiblyPrivateMember } from "./frame-interfaces/possibly-private-member";
import { Selectable } from "./frame-interfaces/selectable";
import { Statement } from "./frame-interfaces/statement";
import { MainFrame } from "./globals/main-frame";
import { ReturnStatement } from "./statements/return-statement";
import { CompileStatus, DisplayColour, ParseStatus, RunStatus } from "./status-enums";

export function isCollapsible(f?: Selectable): f is Collapsible {
  return !!f && "isCollapsible" in f;
}

export function isFile(f?: Parent | File): f is File {
  return !!f && "isFile" in f;
}

export function isMain(f?: Frame): f is MainFrame {
  return !!f && "isMain" in f;
}

export function isFrame(f?: Selectable | Parent): f is Frame {
  return !!f && "isFrame" in f;
}

export function isFrameWithStatements(f?: Selectable | Parent): f is Parent {
  return !!f && "isFrameWithStatements" in f;
}

export function isParent(f?: Selectable | Parent): f is Parent {
  return !!f && "isParent" in f;
}

export function isMember(f?: MemberFrame): f is MemberFrame {
  return !!f && "isMember" in f;
}

export function isFunction(f?: MemberFrame | Parent): f is MemberFrame {
  return !!f && "isFunction" in f;
}

export function isProcedure(f?: MemberFrame): f is MemberFrame {
  return !!f && "isProcedure" in f;
}

export function isLet(f?: Statement): f is Statement {
  return !!f && "isLet" in f;
}

export function isConstructor(f?: Frame | MemberFrame | Parent): f is MemberFrame {
  return !!f && "isConstructor" in f;
}

export function isSelector(f?: Selectable): f is AbstractSelector {
  return !!f && "isSelector" in f;
}

export function isGlobal(f?: Selectable | GlobalFrame): f is GlobalFrame {
  return !!f && "isGlobal" in f;
}

export function isReturnStatement(f?: Frame): f is ReturnStatement {
  return !!f && "isReturnStatement" in f;
}

export function isComment(f?: Frame | Comment): f is Comment {
  return !!f && "isDirective" in f;
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

export function renderBackslashNasABreak(str: string): string {
  return escapeHtmlChars(str).replaceAll(/\\n/g, "<br>");
}

export function helper_pastePopUp(loc: Frame | Field): string {
  let popup = "";
  if (isFrame(loc) && loc.pasteError) {
    popup = `<div class="context-menu"><div>${loc.pasteError}</div></div>`;
    loc.pasteError = "";
  }
  return popup;
}

export function helper_compileMsgAsHtmlNew(file: File, loc: Frame | Field): string {
  let msg = "";
  let link = "";
  let help = "";

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
    const active = loc.helpActive ? ` class="active"` : "";
    loc.helpActive = false;
    help = `<el-help title="Click to open Help for this error"><a href="documentation/${link}" target="help-iframe" tabindex="-1"${active}>?</a></el-help>`;
  }

  const popUp = helper_pastePopUp(loc);

  const toDisplay = escapeHtmlChars(msg);

  return cls === ""
    ? `<el-msg></el-msg>${popUp}`
    : ` <el-msg class="${cls}">${toDisplay}${help}</el-msg>${popUp}`;
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

export function addPrivateToggleToContextMenu(
  member: PossiblyPrivateMember,
  menu: Map<string, [string, (() => void) | undefined]>,
) {
  if (member.private) {
    menu.set("makePublic", ["make public (Ctrl-p)", member.makePublic]);
  } else {
    menu.set("makePrivate", ["make private (Ctrl-p)", member.makePrivate]);
  }
}

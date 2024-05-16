import { Member } from "./interfaces/member";
import { Field } from "./interfaces/field";
import { Collapsible } from "./interfaces/collapsible";
import { Parent } from "./interfaces/parent";
import { Frame } from "./interfaces/frame";
import { File } from "./interfaces/file";
import { MainFrame } from "./globals/main-frame";
import { AbstractSelector } from "./abstract-selector";
import { CompileStatus, OverallStatus, ParseStatus, RunStatus, TestStatus } from "./status-enums";
import { CompileError } from "./compile-error";
import { GlobalFrame } from "./interfaces/global-frame";
import { Class } from "./interfaces/class";
import { Scope } from "./interfaces/scope";

export function isCollapsible(f?: any): f is Collapsible {
    return !!f && 'isCollapsible' in f;
}

export function isFile(f?: any): f is File {
    return !!f && 'isFile' in f;
}

export function isClass(f?: any): f is Class {
    return !!f && 'isClass' in f;
}

export function isMain(f?: any): f is MainFrame {
    return !!f && 'isMain' in f;
}

export function isFrame(f?: any): f is Frame {
    return !!f && 'isFrame' in f;
}

export function isParent(f?: any): f is Parent {
    return !!f && 'isParent' in f;
}

export function isMember(f?: any): f is Member {
    return !!f && 'isMember' in f;
} 

export function isField(f?: any): f is Field {
    return !!f && 'isField' in f;
} 

export function isSelector(f?: any): f is AbstractSelector {
    return !!f && 'isSelector' in f;
} 

export function isGlobal(f?: any): f is GlobalFrame {
    return !!f && 'isGlobal' in f;
} 

export function isScope(f?: any): f is Scope {
    return !!f && 'resolveSymbol' in f;
} 


export function singleIndent() {
    return "  ";
}

export function expandCollapseAll(file: File) {
    var map = file.getMap();
    var collapsible = [...map.values()].filter(s => isCollapsible(s)).map(s => s as Collapsible);
    var firstCollapsibleGlobal = collapsible.filter(s => isGlobal(s) )[0]; 
    var collapse = true;
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
    var globals = [...map.values()].filter(s => isGlobal(s));
    var selectedGlobals = globals.filter(s => s.isSelected());
    if (selectedGlobals.length === 0) {
        file.getFirstChild().select(true, false);
    }
}
export function escapeAngleBrackets(str: string) : string {
    return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function helper_compileMsgAsHtml(loc: Frame | Field ): string {

    /*  To display multiple messages use:
            var msg = loc.compileErrors.length > 1 ?
                loc.compileErrors.reduce((prev, cur) => prev.concat(cur.message)+ "; ", "")
                : loc.compileErrors.length > 0 ?
                    loc.compileErrors[0].message
                    : ""; */
    /* To display first message only use: */
    var msg =  loc.compileErrors.length > 0 ? loc.compileErrors[0].message : "";               
    var cls = "";
    var compile = helper_compileStatusAsOverallStatus(loc.getCompileStatus());
    if (compile !== OverallStatus.ok) {
        cls = OverallStatus[compile];
    }
    return cls === "" ? "<msg></msg>" : ` <msg class="${cls}">${msg}</msg>`;
}

export function helper_getCompileStatus(errors: CompileError[] ) : CompileStatus {
    var result = CompileStatus.error;
    if (errors.length === 0) {
        result = CompileStatus.ok;
    } else {
        result = errors.some(e => !e.unknownType) ? CompileStatus.error : CompileStatus.unknownSymbol;
    }
    return result;
}

export function helper_CompileOrParseStatus(loc: Frame | Field): OverallStatus {
    var status: OverallStatus = OverallStatus.error;
    var parse = helper_parseStatusAsOverallStatus(loc.getParseStatus());
    if (parse !== OverallStatus.ok) {
        status = parse;
    } else {
        status = helper_compileStatusAsOverallStatus(loc.getCompileStatus());
    }
    return status;
}

export function helper_parseStatusAsOverallStatus(ps: ParseStatus) {
    var overall = OverallStatus.default;
    if (ps === ParseStatus.valid) {
        overall = OverallStatus.ok;
    } else if (ps === ParseStatus.incomplete) {
        overall = OverallStatus.warning;
    }else if (ps === ParseStatus.invalid) {
        overall = OverallStatus.error;
    }
    return overall;
}

export function helper_compileStatusAsOverallStatus(cs: CompileStatus) {
    var overall = OverallStatus.default;
    if (cs === CompileStatus.ok) {
        overall = OverallStatus.ok;
    } else if (cs === CompileStatus.unknownSymbol) {
        overall = OverallStatus.warning;
    } else if (cs === CompileStatus.error) {
        overall = OverallStatus.error;
    }
    return overall;
}

export function helper_testStatusAsOverallStatus(ts: TestStatus) {
    var overall = OverallStatus.default;
    if (ts === TestStatus.pass) {
        overall = OverallStatus.ok;
    } else if (ts === TestStatus.pending) {
        overall = OverallStatus.warning;
    } else if (ts === TestStatus.fail) {
        overall = OverallStatus.error;
    }
    return overall;
}

export function helper_runStatusAsOverallStatus(rs: RunStatus) {
    var overall = OverallStatus.default;
    if (rs === RunStatus.running) {
        overall = OverallStatus.ok;
    } else if (rs === RunStatus.paused) {
        overall = OverallStatus.warning;
    } else if (rs === RunStatus.error) {
        overall = OverallStatus.error;
    }
    return overall;
}
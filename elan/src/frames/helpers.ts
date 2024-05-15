import { Member } from "./interfaces/member";
import { Field } from "./interfaces/field";
import { Collapsible } from "./interfaces/collapsible";
import { Parent } from "./interfaces/parent";
import { Frame } from "./interfaces/frame";
import { File } from "./interfaces/file";
import { MainFrame } from "./globals/main-frame";
import { AbstractSelector } from "./abstract-selector";
import { Selectable } from "./interfaces/selectable";
import { AbstractParseNode } from "./parse-nodes/abstract-parse-node";
import { CompileStatus, OverallStatus, ParseStatus } from "./status-enums";
import { CompileError } from "./compile-error";
import { GlobalFrame } from "./interfaces/global-frame";
import { TestFrame } from "./globals/test-frame";

export function isCollapsible(f?: any): f is Collapsible {
    return !!f && 'isCollapsible' in f;
}

export function isFile(f?: any): f is File {
    return !!f && 'isFile' in f;
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
    if (loc.getCompileStatus() === CompileStatus.error ) {
      cls = OverallStatus[OverallStatus.error];
    } else if (loc.getCompileStatus() === CompileStatus.unknownSymbol ){
      cls = OverallStatus[OverallStatus.warning];
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

export function helper_overallStatus(loc: Frame | Field): string {
    var result = "";
    var parse = loc.getParseStatus();
    var compile = loc.getCompileStatus();
    if (parse === ParseStatus.invalid || compile === CompileStatus.error ) {
        result = "invalid"; //TODO: specified as literals as we might change these 
    } else if (parse === ParseStatus.incomplete || compile === CompileStatus.unknownSymbol ) {
        result = "incomplete";
    } else if (parse === ParseStatus.valid && compile === CompileStatus.ok ) {
        result = "valid";
    } else if (parse === ParseStatus.empty) {
        result = "empty";
    }
    return result;
}
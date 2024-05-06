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

export function singleIndent() {
    return "  ";
}

export function expandCollapseAll(map: Map<string, Selectable>) {
    for (const f of map.values()) {
        if (isCollapsible(f)) {
           f.expandCollapse();
        }
    }
}
export function escapeAngleBrackets(str: string) : string {
    return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function helper_compileMsgAsHtml(loc: Frame | Field ): string {
    var msg = loc.compileErrors.reduce((prev, cur) => prev.concat(cur.message), "");
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
import { allKeywords } from "../keywords";
import { ParseStatus } from "../parse-status";
import { Regexes } from "./regexes";

export function anythingToNewline(input: [ParseStatus, string]): [ParseStatus, string] {
    return genericRegEx(input, `^${Regexes.anythingToNewLine}`);
}

function genericRegEx(input: [ParseStatus, string], regxString: string): [ParseStatus, string] {
    var result = input;
    var regx = new RegExp(regxString);
    if (isMatchRegEx(input[1], regx)) {
        result = [ParseStatus.valid, removeRegEx(input[1], regx)];
    } else {
        result = [ParseStatus.invalid, input[1]];
    }
    return result;
}

function isMatchRegEx(code: string, regEx: RegExp): boolean {
    var matches = code.match(regEx);
    return matches !== null && matches.length > 0;
}

function removeRegEx(code: string, regx: RegExp): string {
    if (!isMatchRegEx(code, regx)) {
        throw new Error(`Code does not match ${regx}`);
    } else {
        return code.replace(code.match(regx)![0], "");
    }
}

export function identifier(input: [ParseStatus, string]): [ParseStatus, string] {
    return genericRegEx(input, `^${Regexes.identifier}`);
}

export function optional(input: [ParseStatus, string], func: (input: [ParseStatus, string]) => [ParseStatus, string]): [ParseStatus, string] {
    var result = input;
    if (input[0] >= ParseStatus.valid) {
        var result = func(input);
        if (result[0] === ParseStatus.invalid) {
            result = [input[0], result[1]];
        }
    }
    return result;
}

export function genericString(input: [ParseStatus, string], match: string): [ParseStatus, string] {
    var result = input;
    if (match.length === 0) {
        throw new Error("Cannot specify empty string as the match");
    }
    var [_, code] = input;
    if (code.length ===0) {
        result = [ParseStatus.invalid, code];
    } else if (code.startsWith(match)) {
        result = [ParseStatus.valid, code.substring(match.length)];
    } else if (match.startsWith(code)) {
        result = [ParseStatus.incomplete, ""];
    } else {
        result = [ParseStatus.invalid, code];
    }
    return result;
}

export function simpleType(input: [ParseStatus, string]): [ParseStatus, string] {
    return genericRegEx(input, `^${Regexes.simpleType}`);
}
